const electron = require('electron');
const path = require('path');
const fs = require('fs');

const { desktopCapturer, ipcRenderer: ipc , screen } = electron;

function getMainSource(desktopCapturer, screen, done) {
  const options = { types: ['screen'], thumbNailSize: screen.getPrimaryDisplay().workAreaSize };
  desktopCapturer.getSources(options, (err, sources) => {
    if (err) return console.log('Cannot capture screen', err);

    const isMainSource = source => ['Entire screen', 'Screen 1'].includes(source.name);
    done(sources.filter(isMainSource)[0]);
  });
}

function onCapture(evt, targetDir) {
  getMainSource(desktopCapturer, screen, source => {
    const png = source.thumbnail.toPng();
    const filePath = path.join(targetDir, new Date + '.png');
    writeScreenshot(png, filePath);
  });
}

function writeScreenshot(png, filePath) {
  fs.writeFile(filePath, png, err => {
    if (err) return console.error('Failed to write screen: ', err);
  })
}

ipc.on('capture', onCapture);