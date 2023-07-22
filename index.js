// TODO: Include packages needed for this application
import inquirer from "inquirer";
import questions from "./utils/questions";
import {
  getLicenseByName,
  getSublicenseByName,
  createLicenseBadge,
} from "./utils/licenses.js";
import generateMarkdown from "./utils/generateMarkdown.js";

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

// Function call to initialize app
init();
