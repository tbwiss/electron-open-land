const electron = require('electron');
const path = require('path');

const { app, Tray, Menu } = electron;

app.on('ready', _ => {
  const tray = new Tray(path.join('src', 'handShake.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Wow',
      click: _ => console.log('wow')
    },
    {
      label: 'Amazing',
      click: _ => console.log('Amazing')
    },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip('A great app');
});