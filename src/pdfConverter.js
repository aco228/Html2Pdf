const fs = require("fs");
const {properties} = require('./properties');

const convertToPdf = (window) => {
  return new Promise((resolve, reject) => {
    writeToPdf(window, resolve, reject);
  });
};

const writeToPdf = (window, resolve, reject) => {
  const tempNum = 4;
  const options = {
    marginsType: properties.marginsType.value,
    scaleFactor: properties.scaleFactor.value,
    pageSize: properties.pageSize.value,
    printBackground: properties.printBackground.value,
    printSelectionOnly: properties.printSelectionOnly.value,
    landscape: properties.landscape.value,
  };

  window.webContents.printToPDF(options).then((data) => {
    fs.writeFile(properties.savePath.value, data, (err) => {
      if (err) {
        console.error(err)
        reject(err);
      } else {
        console.log(`Pdf created at location = ${properties.savePath.value}`);
        resolve();
      }
    })
  });
};


module.exports = convertToPdf;
