const bcrypt = require("bcrypt");
const saltRounds = 10;

const password = "hello-world";
console.log("Password before hashing " + password);

//hashing
var hashedPassword = bcrypt.hashSync(password, saltRounds);
console.log("Password after hashing " + hashedPassword);

//verifying
var result = bcrypt.compareSync(password, hashedPassword);
result ? console.log("User verified") : console.log("User not verified");
