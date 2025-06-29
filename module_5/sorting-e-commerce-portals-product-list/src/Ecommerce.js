//import all the require modules
const fs = require('fs');
const readline = require('readline');
const lodash = require('lodash');
const path = require('path');

//This method will read the file it takes two parameters first the fileName 
//and second the callback
const readFileContents = (fileName, cb) => {
  try {
    if (!fs.existsSync(fileName)) {
      return cb('Encountered error while reading file contents..!');
    }

    const fileContents = [];
    const input = fs.createReadStream(fileName);

    const rl = readline.createInterface({
      input,
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      const product = {};
      if (!line.trim()) return; // skip empty lines
      const values = line.split(',').map(v => v.trim());
      fileContents.push(values);

    });

    rl.on('close', () => {
      fileContents.pop()
      console.log("fileContents count: " + fileContents.length);
      return cb(null, fileContents);
    });

    rl.on('error', (err) => {
      return cb('Encountered error while reading file contents..!');
    });

  } catch (error) {
    return cb('Encountered error while reading file contents..!');
  }
};

const readFileContents_Initial = (fileName, cb) => {
  try {
    if (!fs.existsSync(fileName)) {
      return cb('Encountered error while reading file contents..!');
    }

    const fileContents = [];
    const input = fs.createReadStream(fileName);

    const rl = readline.createInterface({
      input,
      crlfDelay: Infinity
    });

    let headers = [];
    rl.on('line', (line) => {
      if (!line.trim()) return; // skip empty lines

      if (!headers.length) {
        //console.log('First line: ' + line);
        headers = line.split(',').map(h => h.trim());
      } else {
        //console.log('Body: ' + line);
        const values = line.split(',').map(v => v.trim());

        // Skip if malformed row
        if (values.length !== headers.length) return;

        const product = {};
        headers.forEach((header, i) => {
          product[header] = values[i];
        });

        // Normalize fields. This will affect the test expectations
        product.retail_price = parseFloat(product.retail_price) || 0;
        product.product_rating =
          product.product_rating === 'No rating available'
            ? '0'
            : product.product_rating;

        // Note: Keep product_rating as string for consistency with test expectations
        fileContents.push(product);
      }
    });

    rl.on('close', () => {
      return cb(null, fileContents);
    });

    rl.on('error', (err) => {
      return cb('Encountered error while reading file contents..!');
    });

  } catch (error) {
    return cb('Encountered error while reading file contents..!');
  }
};

//This method will sortDataonprice it will take two parameters one is fileContent
//second the callback
const sortDataOnPrice = (fileContents, cb) => {
  try {
      const sortedData = lodash.sortBy(fileContents, item => parseFloat(item.retail_price) || 0);
      writeSortedDataToFile('sortedPrice.txt', sortedData, (err) => {
        if (err) return cb(err);
        cb(null, sortedData);
      });
    } catch (err) {
      cb('Error while sorting data on price.');
    }
}

//This method will sortDataonRating 
const sortDataOnRating = (fileContents, cb) => {
  try {
      const ratedData = lodash.compact(fileContents.map(product => {
        const rating = parseFloat(product.product_rating);
        if (!isNaN(rating) && rating > 0) {
          return { ...product, product_rating: rating };
        }
        return null;
      }));
  
      const sortedData = lodash.reverse(lodash.sortBy(ratedData, ['product_rating']))
                                .map(item => ({
                                  ...item,
                                  product_rating: item.product_rating.toString()
                                }));

      writeSortedDataToFile('sortedOnRating.txt', sortedData, (err) => {
        if (err) return cb(err);
        cb(null, sortedData);
      });
    } catch (err) {
      cb('Error while sorting data on rating.');
    }
}

//This method will write the sortedData in the output file
const writeSortedDataToFile = (outputFileName, sortedData, cb) => {
 try {
     const outputPath = path.join(__dirname, outputFileName);
     const lines = sortedData.map(item => {
        return JSON.stringify({
          ...item,
          product_rating: item.product_rating.toString()
        });
      });

     fs.writeFile(outputPath, lines.join('\n'), 'utf8', (err) => {
       if (err) return cb('Error writing sorted data to file.');
       cb(null, `Successfully wrote to ${outputFileName}`);
     });
   } catch (error) {
     cb('Exception occurred while writing sorted data.');
   }
}





module.exports = {
    readFileContents,
    sortDataOnPrice,
    sortDataOnRating,
  
}