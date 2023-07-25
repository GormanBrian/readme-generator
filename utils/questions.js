import path from "path";
import * as EmailValidator from "email-validator";
import { loadJSON } from "./common.js";
import {
  getLicenseByName,
  getLicenseNames,
  getSublicenseNames,
} from "./licenses.js";

// Load package.json to populate default answers
const packageJSON = loadJSON("../package.json");

/**
 * Checks if the URL property in package.json is a GitHub URL and extracts the username
 * @returns {(string | undefined)} Valid GitHub username or undefined
 */
const validateGithubProfile = (link) => {
  let url = link.toLowerCase();
  if (url.includes("github.com")) {
    if (url.slice(-1) === "/") url = url.slice(0, -1);
    url = url.slice(0, url.lastIndexOf("/"));
    return url.slice(url.lastIndexOf("/") + 1);
  } else return undefined;
};

/**
 * Inquirer questions
 */
const questions = [
  {
    type: "input",
    name: "title",
    message: "Enter the title of the project",
    default:
      packageJSON.name !== ""
        ? packageJSON.name
        : path.basename(path.resolve()),
  },
  {
    type: "confirm",
    name: "description",
    message: "Enter a description?",
  },
  //
  {
    type: "input",
    name: "motivation",
    message: "What was your motivation?",
    when: ({ description }) => description,
  },
  {
    type: "input",
    name: "reason",
    message: "Why did you build this project?",
    when: ({ description }) => description,
  },
  {
    type: "input",
    name: "problem",
    message: "What problem does it solve?",
    when: ({ description }) => description,
  },
  {
    type: "input",
    name: "lesson",
    message: "What did you learn?",
    when: ({ description }) => description,
  },
  //
  {
    type: "input",
    name: "installation",
    message: "Enter the installation instructions:",
    default: "npm i",
  },
  {
    type: "input",
    name: "usage",
    message: "Enter the usage instructions:",
  },
  {
    type: "list",
    name: "license",
    message: "Select the license:",
    choices: getLicenseNames(),
  },
  {
    type: "list",
    name: "sublicense",
    message: "Select the specific license:",
    when: ({ license }) => "sublicenses" in getLicenseByName(license),
    choices: ({ license }) => getSublicenseNames(license),
  },
  {
    type: "confirm",
    name: "canContribute",
    message: "Are contributions allowed?",
  },
  {
    type: "input",
    name: "contribution",
    message: "Enter the contribution instructions:",
    when: ({ canContribute }) => canContribute,
  },
  {
    type: "input",
    name: "tests",
    message: "Enter the testing instructions:",
    default: packageJSON.scripts.test,
  },
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub username:",
    default: () => validateGithubProfile(packageJSON.url),
  },
  {
    type: "input",
    name: "email",
    message: "Enter your email address:",
    default: () =>
      EmailValidator.validate(packageJSON.email)
        ? packageJSON.email
        : undefined,
    validate: (email) =>
      EmailValidator.validate(email)
        ? true
        : "Please enter a valid email address",
  },
  {
    type: "input",
    name: "contact",
    message: "Enter instructions for contacting you:",
    default: "Email me with questions or create a pull request.",
  },
];

export default questions;
