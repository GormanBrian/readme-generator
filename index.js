import inquirer from "inquirer";
import questions from "./utils/questions.js";
import { writeToFile } from "./utils/common.js";
import generateMarkdown from "./utils/generateMarkdown.js";

/**
 * Initialize the application
 */
const init = () =>
  inquirer
    .prompt(questions)
    .then((answers) => writeToFile("README.md", generateMarkdown(answers)));

init();
