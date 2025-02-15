const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 获取文件的哈希值
async function getFileHash(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const input = fs.createReadStream(filePath);

        input.on('data', chunk => {
            hash.update(chunk);
        });

        input.on('end', () => {
            resolve(hash.digest('hex'));
        });

        input.on('error', err => {
            reject(err);
        });
    });
}

// 比较文件哈希
async function compareFileHashes(file1, file2) {
    const hash1 = await getFileHash(file1);
    const hash2 = await getFileHash(file2);
    return hash1 === hash2;
}

// 下载文件并保存
async function downloadAndCheck(url, filePath) {
    const writer = fs.createWriteStream(filePath);
    const response = await axios.get(url, { responseType: 'stream' });

    response.data.pipe(writer);
    await new Promise(resolve => writer.on('finish', resolve));

    console.log(`Downloaded: ${url}`);
}

// 下载并比较文件哈希
async function downloadPackageIfNeeded(url, outputDir) {
    const fileName = path.basename(url);
    const outputPath = path.join(outputDir, fileName);

    if (fs.existsSync(outputPath)) {
        console.log(`File ${fileName} already exists. Checking hash...`);

        const existingFileHash = await getFileHash(outputPath);
        const newFileHash = await getFileHash(url);  // 从 URL 下载并计算哈希

        if (existingFileHash === newFileHash) {
            console.log(`File ${fileName} is identical. Skipping download.`);
            return;
        }
    }

    await downloadAndCheck(url, outputPath);
}
