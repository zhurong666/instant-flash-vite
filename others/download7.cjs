const fs = require('fs');
const path = require('path');
const axios = require('axios');
const pLimit = require('p-limit').default;

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
    if (packagePath === '') continue;
    const resolvedUrl = packageData.resolved;
    if (resolvedUrl) {
        packagesToDownload.push(resolvedUrl);
    }
}

console.log('Packages to download:', packagesToDownload);
console.log('Number of packages:', packagesToDownload.length);

const outputDir = path.join(__dirname, 'downloaded-packages');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const limit = pLimit(8);

async function downloadPackage(url, outputDir) {
    //如果不同的包有相同的文件名，考虑在下载文件时为文件名添加版本号或其他标识符来避免覆盖。
    //const fileName = `${packageName}-${packageVersion}-${path.basename(url)}`;

    const fileName = path.basename(url);
    const outputPath = path.join(outputDir, fileName);

    // 检查文件是否已存在并且文件大小是否一致
    if (fs.existsSync(outputPath)) {
        const stats = fs.statSync(outputPath);  // 获取文件大小
        console.log(`Package ${fileName} already exists. Skipping download.`);
        return true;  // 可以根据文件大小判断是否跳过
    }

    try {
        console.log(`Downloading from ${url}...`);
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(outputPath, response.data);
        console.log(`Downloaded ${fileName} to ${outputPath}`);
        return true;
    } catch (error) {
        console.error(`Error downloading ${url}: ${error.message}`);
        return false;
    }
}

async function downloadPackages(urls, outputDir) {
    const downloadPromises = urls.map(url => limit(() => downloadPackage(url, outputDir)));

    try {
        const results = await Promise.all(downloadPromises);
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
