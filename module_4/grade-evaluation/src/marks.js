// Define a function to calculate the total marks and return a promise 
const calculateTotalMarks = (math,english,science,social,language) =>{
    return new Promise((resolve,reject)=>{
        // Check for undefined/null inputs
        if (
            math == null || english == null || science == null ||
            social == null || language == null
        ) {
            reject('Null values for marks');
        } else {
            const total = math + english + science + social + language;
            resolve(total);
        }
        }) 
}
// Define a function to calculate average marks and return a promise
const calculateAverageMarks = (totalMarks) =>{
    return new Promise((resolve,reject)=>{
    if (typeof totalMarks !== 'number') {
            reject('Invalid total marks');
        } else {
            const average = totalMarks / 5;
            resolve(average);
        }
    }) 
}
// Define a function to calculate grade and return a promise
const calculateGrade = (averageMarks)=>{
    return new Promise((resolve,reject)=>{
       if (typeof averageMarks !== 'number') {
            reject('Invalid average marks');
        } else if (averageMarks >= 95) {
            resolve('A+');
        } else if (averageMarks >= 85) {
            resolve('A');
        } else if (averageMarks >= 70) {
            resolve('B');
        } else if (averageMarks >= 60) {
            resolve('C');
        } else if (averageMarks >= 50) {
            resolve('E');
        } else {
            resolve('F');
        }
    })   
}

module.exports = {
    calculateAverageMarks,calculateGrade,calculateTotalMarks
}
