// TODO: Include packages needed for this application
import inquirer from "inquirer";
import path from "path";
import fs from "fs";
import {
  licenses,
  getLicenseByName,
  getSublicenseByName,
  createLicenseBadge,
} from "./utils/licenses.js";
import generateMarkdown from "./utils/generateMarkdown.js";

const loadJSON = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
let pkg = loadJSON("./package.json");

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
    default: pkg.name !== "" ? pkg.name : path.basename(path.resolve()),
  },
  {
    type: "input",
    name: "description",
    message: "Enter a description:",
  },
  {
    type: "input",
    name: "installation",
    message: "Enter the installation instructions:",
    default: "npm init",
  },
  {
    type: "list",
    name: "license",
    message: "Select the license:",
    choices: licenses.map((l) => l.name),
  },
  {
    type: "list",
    name: "specificLicense",
    message: "Select the specific license:",
    when: ({ license }) => "sublicenses" in getLicenseByName(license),
    choices: ({ license }) =>
      getLicenseByName(license).sublicenses.map((l) => l.name),
  },
  {
    type: "confirm",
    name: "canContribute",
    message: "Are contributions allowed?",
  },
  {
    type: "input",
    name: "contribute",
    message: "Enter the contribution instructions:",
    when: ({ canContribute }) => canContribute,
  },
  {
    type: "input",
    name: "tests",
    message: "Enter the testing instructions:",
    default: pkg.scripts.test,
  },
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub username:",
    default: () => {
      let url = pkg.url.toLowerCase();
      if (url.includes("github.com")) {
        if (url.slice(-1) === "/") url = url.slice(0, -1);
        return url.slice(0, url.lastIndexOf("/"));
      } else return undefined;
    },
  },
  {
    type: "input",
    name: "email",
    message: "Enter your email address:",
    default: pkg.email,
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then(
      ({
        title,
        description,
        installation,
        license,
        sublicense,
        canContribute,
        tests,
        github,
        email,
      }) => {
        let licenseBadge = createLicenseBadge(
          sublicense
            ? getSublicenseByName(license, sublicense)
            : getLicenseByName(license)
        );
      }
    );
}

console.log(licenses.length);

// Function call to initialize app
init();
