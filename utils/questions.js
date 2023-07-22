import path from "path";
import { loadJSON } from "./common.js";
import {
  getLicenseByName,
  getLicenseNames,
  getSublicenseNames,
} from "./utils/licenses.js";

const nodePackage = loadJSON("./package.json");

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
    default:
      nodePackage.name !== ""
        ? nodePackage.name
        : path.basename(path.resolve()),
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
    choices: getLicenseNames(),
  },
  {
    type: "list",
    name: "specificLicense",
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
    name: "contribute",
    message: "Enter the contribution instructions:",
    when: ({ canContribute }) => canContribute,
  },
  {
    type: "input",
    name: "tests",
    message: "Enter the testing instructions:",
    default: nodePackage.scripts.test,
  },
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub username:",
    default: () => {
      let url = nodePackage.url.toLowerCase();
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
    default: nodePackage.email,
  },
];

export default questions;
