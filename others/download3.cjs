// 同一时间都下载，可能不是最好的方案
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const axios = require('axios');  // 使用 axios 进行 HTTP 请求
const { promisify } = require('util');
const download = promisify(require('download'));  // 使用 download 库进行文件下载

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

// 下载 npm 包并保存到指定目录
async function downloadPackage(url, outputDir) {
    const fileName = path.basename(url);  // 获取文件名
    const outputPath = path.join(outputDir, fileName);  // 拼接保存的完整路径

    // 如果文件已经存在，就跳过
    if (fs.existsSync(outputPath)) {
        console.log(`Package ${fileName} already exists. Skipping download.`);
        return;
    }

    try {
        console.log(`Downloading from ${url}...`);
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(outputPath, response.data);  // 保存文件
        console.log(`Downloaded ${fileName} to ${outputPath}`);
    } catch (error) {
        console.error(`Error downloading ${url}:`, error.message);
        throw error;  // 抛出错误
    }
}

// 创建目标目录
async function downloadPackages(urls, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // 使用 Promise.all 实现并发下载
    const downloadPromises = urls.map(url => downloadPackage(url, outputDir));

    try {
        await Promise.all(downloadPromises);  // 等待所有下载完成
        console.log('All packages downloaded successfully.');
    } catch (error) {
        console.error('Error downloading packages:', error.message);
    }
}

// 指定下载包的保存目录
const outputDir = path.join(__dirname, 'downloaded-packages');
downloadPackages(packagesToDownload, outputDir);
