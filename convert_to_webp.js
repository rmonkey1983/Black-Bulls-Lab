const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, 'public');
const srcDir = path.join(__dirname, 'src');

function findImages(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findImages(filePath, fileList);
        } else if (/\.(png|jpe?g)$/i.test(file)) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const images = findImages(publicDir);
const convertedImages = [];

console.log(`Found ${images.length} images to convert.`);

for (const img of images) {
    const ext = path.extname(img);
    const webpPath = img.replace(new RegExp(`${ext}$`), '.webp');
    console.log(`Converting ${img} to ${webpPath}...`);
    try {
        // Skip if already converted (.webp exists for this run)
        if (!fs.existsSync(webpPath)) {
            execSync(`npx -y cwebp-bin "${img}" -o "${webpPath}"`, { stdio: 'ignore' });
        }
        convertedImages.push({ oldExt: ext, imgPath: img, webpPath });
        // remove old image
        fs.unlinkSync(img);
    } catch (e) {
        console.error(`Failed to convert ${img}`);
    }
}

function findSrcFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findSrcFiles(filePath, fileList);
        } else if (/\.(ts|tsx|css)$/i.test(file)) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const srcFiles = findSrcFiles(srcDir);
if (fs.existsSync(path.join(publicDir, 'sw.js'))) {
    srcFiles.push(path.join(publicDir, 'sw.js'));
}

console.log(`Updating ${srcFiles.length} source files...`);
let updatedFiles = 0;

for (const file of srcFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanges = false;
    for (const { imgPath } of convertedImages) {
        const relativePath = imgPath.split('/public')[1]; 
        if (!relativePath) continue;
        
        const webpRel = relativePath.replace(/\.(png|jpe?g)$/i, '.webp');
        const basename = path.basename(relativePath);
        const webpBasename = path.basename(webpRel);
        
        if (content.includes(basename)) {
            content = content.split(basename).join(webpBasename);
            hasChanges = true;
        }
    }
    if (hasChanges) {
        fs.writeFileSync(file, content, 'utf8');
        updatedFiles++;
    }
}
console.log(`Updated ${updatedFiles} files!`);
