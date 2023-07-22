// TODO: Include packages needed for this application
import inquirer from "inquirer";
import path from "path";
import { licenses, getLicense } from "./utils/licenses.js";

/**
 * 1. Title
 * 2. Description
 * 3. Table of Contents
 * 4. Installation
 * 5. Usage License
 * 6. Contributing
 * 7. Tests
 * 8. Questions
 */
const questions = [
  {
    type: "input",
    name: "title",
    message: "Enter the title of the project",
    default: path.basename(path.resolve()),
  },
  {
    type: "input",
    name: "description",
    message: "Enter a description of this project",
  },
  {
    type: "input",
    name: "installation",
    message: "What are the installation instructions?",
    default: "npm init",
  },
  {
    type: "list",
    name: "license",
    message: "What license is this project using?",
    choices: licenses.map((l) => l.name),
  },
  {
    type: "list",
    name: "specificLicense",
    message: "What license is this project using?",
    choices: ({ license }) =>
      getLicense(license).sublicenses.map((l) => l.name),
    when: ({ license }) => {
      let licenseObj = getLicense(license);
      return licenseObj && "sublicenses" in licenseObj;
    },
  },
  {
    type: "confirm",
    name: "canContribute",
    message: "Are others allowed to contribute to this project?",
  },
  {
    type: "input",
    name: "contribute",
    message: "What are the directions for contributing to this project",
    when: ({ canContribute }) => canContribute,
  },
  {
    type: "input",
    name: "tests",
    message: "What are the testing instructions?",
  },
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((answers) => {
    console.log(answers);
  });
}

// Function call to initialize app
init();
