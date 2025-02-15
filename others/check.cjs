const fs = require('fs');
const path = require('path');

// 读取 package-lock.json
const packageLockPath = path.join(__dirname, 'package-lock.json');
const packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf-8'));

// 确保 packages 存在并是对象
const packages = packageLock.packages;
if (!packages || typeof packages !== 'object') {
    console.error('No packages found in package-lock.json');
    process.exit(1); // 退出程序
}

// 存储文件名和对应的 URL
const fileNames = {};
const duplicates = [];

// 遍历所有的包，获取 resolved 字段中的下载地址
for (const [packagePath, packageData] of Object.entries(packages)) {
    if (packagePath === '') continue;  // 过滤掉根包

    const resolvedUrl = packageData.resolved;
    if (resolvedUrl) {
        const fileName = path.basename(resolvedUrl);  // 提取文件名
        if (fileNames[fileName]) {
            // 如果文件名已存在，则为重复文件
            duplicates.push({ fileName, urls: [fileNames[fileName], resolvedUrl] });
        } else {
            // 存储文件名和对应的 URL
            fileNames[fileName] = resolvedUrl;
        }
    }
}

// 输出重复的文件名和它们对应的 URL
if (duplicates.length > 0) {
    console.log('Duplicate file names found:');
    duplicates.forEach(duplicate => {
        console.log(`File name: ${duplicate.fileName}`);
        duplicate.urls.forEach(url => {
            console.log(`  - ${url}`);
        });
    });
} else {
    console.log('No duplicate file names found.');
}
