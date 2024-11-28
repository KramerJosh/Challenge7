// TODO: Include packages needed for this application
import { error } from "console";
import fs, { write } from "fs";
import inquirer from "inquirer";

// TODO: Create an array of questions for user input

const questions = [
  {
    type: "input",
    message: "what is the title of the your project?",
    name: "title",
  },
  {
    type: "input",
    message: "please enter a short description of the project",
    name: "description",
  },
  {
    type: "input",
    message: "please enter installation instructions.",
    name: "installation",
  },
  {
    type: "list",
    message: "which license would you like to add?",
    choices: ["mit", "open-source", "option-3"],
    name: "usage",
  },
  {
    type: "usage information",
    message: "what are your contribution guidelines?",
    name: "contributing",
  },
  {
    type: "input",
    message: "what test instructions should we include?",
    name: "tests",
  },
  {
    type: "input",
    message: "what is your github username?",
    name: "github",
  },
  {
    type: "input",
    message: "what is your email address?",
    name: "email",
  },
];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.appendFileSync(fileName, data, (err) => {
    if (err) console.log(err);
  });
}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((answers) => {
    console.log(answers.title);
    const fileTitle = answers.title + ".md";
    // create the file
    fs.writeFile(fileTitle, "# " + answers.title, (err) => {
      if (err) console.log(err);
    });
    // Add TOC
    writeToFile(
      fileTitle,
        "\n" +
        "# TOC" +
        "\n" +
        "1. [Description](#Description)" +
        "\n" +
        "2. [Installation](#Installation)" +
        "\n" +
        "3. [Usage](#Usage)" +
        "\n" +
        "4. [Contributing](#Contributing)" +
        "\n" +
        "5. [Tests](#Tests)"
    );
    // Add Description
    writeToFile(
      fileTitle,
      "\n" +
        `<div id='Description'/>` +
        "\n" +
        "# Description" +
        "\n" +
        answers.description
    );
  });
}

// Function call to initialize app
init();
