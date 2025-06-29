//import all the modules require
const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');

//Use try and catch to handle the error where ever required
//return the callback with appropriate data where ever require in all the methods

//More userdefined methods can be written if required to write the logical stuff

//This method will take two parameters first the fileName
//and second a callback 
//read file data line by line using readLine
//create array and push all data inside the array


const readFileContentsLineByLine = (fileName, cb) => {
  try{
    let fileContents = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(fileName),
      output: process.stdout,
      terminal: false
    });
    rl.on('line', (line) => {
      if (line.trim()) {
        fileContents.push(line.trim());
      }
    });

    rl.on('close', () => cb(null, fileContents));
    rl.on('error', (err) => cb(`Error reading file line by line: ${err.message}`));
  } catch (error) {
    cb(`Unexpected error: ${error.message}`);
  }
}

//This method will take two parameters first the filecontent
//and second the callback 
//use map to filter the data 
//Filter all the records for female candidates given region as southwest.

const filterFemaleCandidates = (fileContents, cb) => {
  let filteredData ;
  try {
    const header = fileContents[0];
    const dataLines = fileContents.slice(1); // Skip header

     filteredData = _.compact(dataLines.map(line => {
      const parts = line.split(',').map(p => p.trim().toLowerCase());
      if (parts.length >= 6 && parts[1] === 'female' && parts[5] === 'southwest') {
        return line;
      }
      return null;
    }));

    cb(null, filteredData); // No outer error
  } catch (error) {
    cb(`Error filtering female candidates: ${error.message}`);
  }
  
}

//This method will write filtered data in the output file
const writeFilteredDataToFile = (outputFileName, filteredData, cb) => {
    try {
    fs.writeFile(outputFileName, filteredData.join('\n'), 'utf8', (err) => {
      if (err) {
        cb(`Error writing to file: ${err.message}`);
      } else {
        cb(null, `Data written to ${outputFileName}`);
      }
    });
  } catch (error) {
    cb(`Unexpected error writing file: ${error.message}`);
  }
}


//This method will read the file content using Streams
//create array and push all the data from file to it
const readFileContentsUsingStream = (fileName, cb) => {
   try {
    let fileContents = [];
    let leftover = ''; // buffer for partial line

    fs.createReadStream(fileName)
      .on('data', (chunk) => {
        // Convert chunk to string and prepend leftover from previous chunk
        const data = leftover + chunk.toString();
        const lines = data.split('\n');

        // All except last element are complete lines
        leftover = lines.pop();

        // Push complete lines into the array (trimmed)
        lines.forEach(line => {
          if (line.trim()) fileContents.push(line.trim());
        });
      })
      .on('end', () => {
        // Push leftover if not empty
        if (leftover.trim()) {
          fileContents.push(leftover.trim());
        }
        // Remove header line
        if (fileContents.length > 0) {
          fileContents.shift();
        }
        cb(null, fileContents);
      })
      .on('error', (err) => {
        //cb(`Error reading file using stream: ${err.message}`);
        console.log("Error while reading contents of file using streams, ERROR::", err);
        cb("Encountered error while reading file contents using streams..!");
      });
  } catch (error) {
    cb(`Unexpected error: ${error.message}`);
  }
}

//This method will filetDatewithNoChildren it will take two parameters
//first the fileContent and second the callback
//use map if required to filter the data

const filterDataWithNoChildren = (fileContents, cb) => {
  let filteredData ;
  try {
    const header = fileContents[0];
    const dataLines = fileContents.slice(1); // Skip header

     filteredData = _.compact(dataLines.map(line => {
      const parts = line.split(',').map(p => p.trim());
      if (parseInt(parts[3], 10) === 0) {
        return line;
      }
      return null;
    }));

    cb(null, [header, ...filteredData]); // Include header
  } catch (error) {
    cb(`Error filtering data with no children: ${error.message}`);
  }

}




module.exports = {
  readFileContentsLineByLine,
  filterFemaleCandidates,
  readFileContentsUsingStream,
 }
