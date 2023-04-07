const Path = require('path');
const Fs = require('fs')

const AssestPath = Path.resolve(__dirname, '../public/download')
const DownloadDir = Path.resolve(__dirname, "../.next/server/pages/api/download")
const DownloadAsset = Path.resolve(DownloadDir, 'assets')

const downloads = Fs.readdirSync(AssestPath)

console.log(downloads)
console.log(Path.resolve(__dirname, '.'))

if (!downloads.length) {
    process.exit()
}

if (!Fs.existsSync(DownloadDir)) {
    process.exit()
}

if (!Fs.existsSync(DownloadAsset)) {
    Fs.mkdirSync(Path.resolve(DownloadDir, 'assets'))
}

downloads.forEach(file => {
    const filePath = Path.resolve(AssestPath, file);
    const destPath = Path.resolve(DownloadAsset, file);

    Fs.copyFileSync(filePath, destPath)
})
