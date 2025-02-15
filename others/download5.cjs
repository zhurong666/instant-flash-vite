const fs = require('fs');
const path = require('path');
const axios = require('axios');
const pLimit = require('p-limit').default;  // 使用 .default 获取 pLimit 函数

// 读取 package-lock.json
const packageLockPath = path.join(__dirname, 'package-lock.json');
const packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf-8'));

// 确保 packages 存在并是对象
const packages = packageLock.packages;
if (!packages || typeof packages !== 'object') {
    console.error('No packages found in package-lock.json');
    process.exit(1); // 退出程序
}

const packagesToDownload = [];

// 遍历所有的包，获取 resolved 字段中的下载地址
for (const [packagePath, packageData] of Object.entries(packages)) {
    // 过滤掉根包（即空字符串路径）
    if (packagePath === '') continue;

    // 获取 resolved 字段的值，作为下载地址
    const resolvedUrl = packageData.resolved;
    if (resolvedUrl) {
        packagesToDownload.push(resolvedUrl);
    }
}

// 打印所有需要下载的包 URL
console.log('Packages to download:', packagesToDownload);
console.log('Number of packages:', packagesToDownload.length);

// 创建下载目录
const outputDir = path.join(__dirname, 'downloaded-packages');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 限制并发数量，最多 8 个
const limit = pLimit(8);

// 下载单个包
async function downloadPackage(url, outputDir) {
    const fileName = path.basename(url);  // 获取文件名
    const outputPath = path.join(outputDir, fileName);  // 拼接保存的完整路径

    // 如果文件已经存在，就跳过（但是可以添加条件，检查文件完整性）
    if (fs.existsSync(outputPath)) {
        console.log(`Package ${fileName} already exists. Skipping download.`);
        return true;  // 返回 true 代表此文件已存在
    }

    try {
        console.log(`Downloading from ${url}...`);
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(outputPath, response.data);  // 保存文件
        console.log(`Downloaded ${fileName} to ${outputPath}`);
        return true;
    } catch (error) {
        console.error(`Error downloading ${url}: ${error.message}`);
        return false;  // 返回 false 表示下载失败
    }
}

// 下载多个包
async function downloadPackages(urls, outputDir) {
    const downloadPromises = urls.map(url => limit(() => downloadPackage(url, outputDir)));  // 限制并发

    try {
        const results = await Promise.all(downloadPromises);  // 等待所有下载完成

        // 检查哪些文件下载成功
        const successfulDownloads = results.filter(result => result === true).length;
        const failedDownloads = results.filter(result => result === false).length;

        console.log(`Successfully downloaded ${successfulDownloads} packages.`);
        if (failedDownloads > 0) {
            console.log(`Failed to download ${failedDownloads} packages.`);
        }

        console.log('All download attempts finished.');
    } catch (error) {
        console.error('Error downloading packages:', error.message);
    }
}

downloadPackages(packagesToDownload, outputDir);
