
//import all the require module
const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');
const path = require('path');

//Write try and catch and handle the exceptions where ever require
//return the callback with appropriate values in the methods 

//More userdefined methods can be written if required to write the logical stuff

////This method will read the file content the first parameter is filename and 
//second is a callback
 //create array name it as  fileContents
const readFileContents = (fileName, cb) => {
  try {
    const fileContents = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(fileName),
      crlfDelay: Infinity,
    });

    let headers = [];

    rl.on('line', (line) => {
      const values = line.split(',');

      if (headers.length === 0) {
        headers = values.map(h => h.trim());
      } else {
        const row = {};
        headers.forEach((key, index) => {
          row[key] = values[index]?.trim();
        });
        fileContents.push(row);
      }
    });

    rl.on('close', () => {
      cb(null, fileContents);
    });

    rl.on('error', (err) => {
      cb(err, null);
    });

  } catch (error) {
    cb(error, null);
  }
}

// Use Lodash to filter the data this method will take first parameter
//as fileContents and second parameter as a callback
const filterData = (fileContents, cb) => {
  try {
    let filteredData = _.filter(fileContents, { payment_method: 'credit' });
    cb(null, filteredData);
  } catch (err) {
    cb(err, null);
  }
}

//This method will writeFile data to output.txt file
//it is taking parameters are filteredData and a callback
//filteredata will be given by the filterData method
const writeFilteredDataToFile = (filteredData, cb) => {
 try {
    const outputPath = path.join(__dirname, '..', 'output.txt');
    const writeStream = fs.createWriteStream(outputPath);
    const parsedData = typeof filteredData === 'string' ? JSON.parse(filteredData) : filteredData;
    parsedData.forEach((record) => {
      writeStream.write(JSON.stringify(record) + '\n');
    });

    writeStream.end(() => {
      cb(null, "Successfully wrote filtered data to output.txt file..!");
    });

    writeStream.on('error', (err) => {
      cb(err, null);
    });

  } catch (err) {
    cb(err, null);
  }
    
}


module.exports = {
  readFileContents,
  filterData,
  writeFilteredDataToFile
}
