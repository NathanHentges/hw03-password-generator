// categories
const chars = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numeric: "1234567890",
  special: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
}

function generatePassword() {
  var pass = "";
  var passLength = 0;
  var groupSelected = {
    lower: false,
    upper: false,
    numeric: false,
    special: false
  }
  var selections = "";

  // get password length
  do {
    passLength = prompt("Enter your password length, between 8 and 128 characters");
  } while (isNaN(passLength) || passLength < 8 || passLength > 128);
  
  // select categories
  groupSelected.lower = confirm("I want lowercase letters");
  groupSelected.upper = confirm("I want uppercase letters");
  groupSelected.numeric = confirm("I want numbers");
  groupSelected.special = confirm("I want special characters");

  // combine chosen categories into single string to pick randomly from
  var numGroups = 0;
  for (const group in groupSelected) {
    if (groupSelected[group]) {
      numGroups++;
      selections += chars[group];
    }
  }

  //if no groups were chosen, abort
  if (numGroups === 0) {
    return "ERROR: Choose at least one category for your password...";
  }

  // start picking random characters
  // to ensure at least one character from each category, I make password
  //    the (given length - num groups), then at the end I insert one from each group
  for (let i = 0; i < (passLength - numGroups); i++) {
    let randIndex = Math.floor((Math.random() * selections.length));
    pass += selections[randIndex];
  }
  
  // put in one of each group
  for (const group in groupSelected) {
    if (groupSelected[group]) {
      let groupString = chars[group];
      let randIndex = Math.floor((Math.random() * groupString.length));

      // insert in random spot so it's not at the end each time
      let randInsert = Math.floor((Math.random() * pass.length));
      pass = pass.slice(0,randInsert) + groupString[randIndex] + pass.slice(randInsert);
    }
  }

  return pass;
}






// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
