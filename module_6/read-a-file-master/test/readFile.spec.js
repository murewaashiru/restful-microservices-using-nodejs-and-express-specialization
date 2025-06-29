const { expect } = require("chai");

const readFile = require("../src/readFile");

describe("Testing read file methods", function () {
  it("Testing reading file and converting file contents to upper case with valid file", function (done) {
    // this.timeout(5000); // 🔧 Increase timeout to 5 seconds
    readFile.readAndConvertFileContents(
      "./resources/input.txt",
      (err, results) => {
        let expectedResult = [
          "JENNY",
          "JONATHAN",
          "HARRY",
          "JONNY",
          "SAMATHA",
          "MICHAEL",
          "ROBERT",
          "DAVID",
          "SMITH",
          "GARCIA",
          "WILLIAM",
          "THOMAS",
          "DANIEL",
          "MATTHEW",
          "ANTHONY",
        ];

        expect(err).to.equal(null);
        expect(results).to.be.deep.equal(expectedResult);
        done(err);
        // try {
        //   expect(err).to.equal(null);
        //   expect(results).to.deep.equal(expectedResult);
        //   done(); // ✅ Call done without error
        // } catch (e) {
        //   done(e); // ✅ Call done with error on failure
        // }
      }
    );
  });

  it("Testing reading file and converting file contents to upper case with invalid file", function (done) {
    readFile.readAndConvertFileContents("./testfile", (err, results) => {
      expect(err).to.not.equal(null);
      expect(err).to.equal("Encountered error while reading file contents..!");
      done(null);
    });
  });
});
