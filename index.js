import inquirer from "inquirer";
import questions from "./utils/questions.js";
import { writeToFile } from "./utils/common.js";
import generateMarkdown from "./utils/generateMarkdown.js";

/**
 * Run the application
 */
inquirer
  .prompt(questions)
  .then((answers) =>
    writeToFile("output/README.md", generateMarkdown(answers))
  );
