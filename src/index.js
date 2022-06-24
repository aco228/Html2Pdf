const { app, BrowserWindow } = require('electron');
const convertToPdf = require('./pdfConverter');
const {getArgumentOrDefault} = require('./arguments');
const {printHelpDescriptions, properties} = require('./properties');
const errorCodes = require("./errorCodes");

if (getArgumentOrDefault('help', false, 'boolean')) {
  printHelpDescriptions();
  process.exit(errorCodes.success.code);
}

const createWindow = async () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  });

  window.webContents.once('did-finish-load', async () => {
    console.log('Page is loaded');
    await convertToPdf(window);
    process.exit(errorCodes.success.code);
  });

  //`C:\\Users\\Lenovo\\Documents\\Projects\\GitHub\\InvoiceGenerator\\Data\\templates\\inv3\\index.html`
  console.log('Loading file at location = ', properties.localHtml.value);
  await window.loadFile(properties.localHtml.value);
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow()
  }
});

