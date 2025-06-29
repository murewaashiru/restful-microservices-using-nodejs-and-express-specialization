const employeeList = [
  {
    id: "1",
    employeeName: "nameofemp",
    employeeSalary: 50000,
    employeeAge: 42,
    dateOfJoining: "2006-06-30T00:00:00.000Z",
    profileImage: "image_url"
  },
  {
    id: "2",
    employeeName: "nameofemp2",
    employeeSalary: 35000,
    employeeAge: 52,
    dateOfJoining: "2003-09-15T00:00:00.000Z",
    profileImage: "image_url"
  },
  {
    id: "3",
    employeeName: "nameofemp3",
    employeeSalary: 60000,
    employeeAge: 58,
    dateOfJoining: "2004-11-06T00:00:00.000Z",
    profileImage: "image_url"
  },
  {
    id: "4",
    employeeName: "nameofemp4",
    employeeSalary: 5000,
    employeeAge: 50,
    dateOfJoining: "2005-03-17T00:00:00.000Z",
    profileImage: "image_url"
  },
  {
    id: "5",
    employeeName: "nameofemp5",
    employeeSalary: 50000,
    employeeAge: 36,
    dateOfJoining: "2010-07-07T00:00:00.000Z",
    profileImage: "image_url"
  }
]

// Promise method to fetch employee count above 50 years of age
const getEmployeeOverFiftyPromise = (employeeData) => new Promise((resolve, reject) => {
  if (!employeeData || employeeData.length === 0) {
    reject("Empty Array");
  } else {
    const count = employeeData.filter(emp => emp.employeeAge > 50).length;
    resolve(count);
  }
})

// Async method to fetch employee count above 50 years of age
const getEmployeeOverFifty = async (employeeData) => {
  if (!employeeData || employeeData.length === 0) {
    throw "Empty Array";
  }
  const count = employeeData.filter(emp => emp.employeeAge > 50).length;
  return count;
};

// Promise method to return number of days since joining for each employee
const getTotalNoOfDaysSinceJoiningPromise = (employeeData) => new Promise((resolve, reject) => {
  if (!employeeData || employeeData.length === 0) {
    reject("Empty Array");
  } else {
    const today = new Date();
    const daysArray = employeeData.map(emp => {
      const joinDate = new Date(emp.dateOfJoining);
      const diffTime = today.getTime() - joinDate.getTime();
      return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
    });
    resolve(daysArray);
  }
  }
)

// Async method to return number of days since joining for each employee
const getTotalNoOfDaysSinceJoining = async (employeeData) => {
  if (!employeeData || employeeData.length === 0) {
    throw "Empty Array";
  }

  const today = new Date();

  return employeeData.map(emp => {
    const joinDate = new Date(emp.dateOfJoining);
    const diffTime = today - joinDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  });
};

// getTotalNoOfDaysSinceJoining(employeeList).then(res => console.log(res));
module.exports = { getEmployeeOverFifty, getTotalNoOfDaysSinceJoining }