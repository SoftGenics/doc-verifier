import "../config/database/mongo.js";

import Admin from "../src/models/admin.js";
import College from "../src/models/college.js";
import Document from "../src/models/document.js";
import Company from "../src/models/company.js";
import Employee from "../src/models/company/employee.js";
import User from "../src/models/user.js";
import Certificate from "../src/models/certificate.js";

const clearDatabase = async () => {
  await Admin.deleteMany({});
  await Admin.collection.dropIndexes();
  await College.deleteMany({});
  await College.collection.dropIndexes();
  await Company.deleteMany({});
  await Company.collection.dropIndexes();
  await Document.deleteMany({});
  await Document.collection.dropIndexes();
  await User.deleteMany({});
  await User.collection.dropIndexes();
  await Employee.deleteMany({});
  await Employee.collection.dropIndexes();
  await Certificate.deleteMany({});
  await Certificate.collection.dropIndexes();
  return "Data cleared successfully";
};


clearDatabase().then((data) => {
  console.log(data);
  process.exit(0);
}).catch((err) =>{
  console.log(err);
  process.exit(-1);
});
