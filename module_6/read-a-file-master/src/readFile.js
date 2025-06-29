const fs = require("fs");
// import the lodash library
const lodash = require("lodash");

// Read the file data and return the data in the resolved Promise
const read = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        reject("Encountered error while reading file contents..!");
      } else {
        const words = data.split(",").filter(line => line.trim().length > 0);
        resolve(words);
      }
    });
  });
};
// Define a function to Convert the file content to upper case and return the result in the resolved Promise
const convertToUpperCase = (fileContents) => {
  return new Promise((resolve, reject) => {
    try {
      const upperCaseData = fileContents.map(line => line.toUpperCase());
      resolve(upperCaseData);
    } catch (error) {
      reject("Error while converting contents to upper case..!");
    }
  });
};

// Define a function to read and convert the file contents, use the then and catch blocks here
const readAndConvertFileContents = (fileName, cb) => {
  read(fileName)
    .then((contents) => {
      return convertToUpperCase(contents);
    })
    .then((upperCasedContents) => {
      cb(null, upperCasedContents);
    })
    .catch((err) => {
      cb(err, null); // Ensure callback is invoked on error
    });
};

module.exports = {
  readAndConvertFileContents,
};
