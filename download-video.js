const fs = require('fs');
const https = require('https');
const path = require('path');

const fileUrl = "https://videos.pexels.com/video-files/2061386/2061386-uhd_2560_1440_30fps.mp4";
const outputPath = path.join(__dirname, 'public', 'mailing-list-bg.mp4');

const file = fs.createWriteStream(outputPath);

https.get(fileUrl, (response) => {
    if (response.statusCode !== 200) {
        console.error(`Failed to download: ${response.statusCode}`);
        return;
    }
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('Download completed.');
    });
}).on('error', (err) => {
    fs.unlink(outputPath, () => { }); // Delete the file async. (But we don't check for this)
    console.error(`Error: ${err.message}`);
});
