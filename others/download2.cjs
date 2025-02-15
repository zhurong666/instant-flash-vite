const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

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
console.log('number:', packagesToDownload.length);

// 下载 npm 包并保存到指定目录
function downloadPackages(urls, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    urls.forEach(url => {
        console.log(`Downloading from ${url}...`);
        const fileName = path.basename(url);  // 获取文件名
        const outputPath = path.join(outputDir, fileName);  // 拼接保存的完整路径

        // 使用 curl -L 跟随重定向下载包
        execSync(`curl -L -o ${outputPath} ${url}`, { stdio: 'inherit' }); // 或者使用 wget
    });
}

// 指定下载包的保存目录
const outputDir = path.join(__dirname, 'downloaded-packages');
downloadPackages(packagesToDownload, outputDir);
