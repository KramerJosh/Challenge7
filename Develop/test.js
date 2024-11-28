// TODO: Include packages needed for this application
import { error } from "console";
import fs, { appendFile, write } from "fs";
import inquirer from "inquirer";

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
      type: "usage information",
      message: "what are your contribution guidelines?",
      name: "contribution",
    },
    {
      type: "input",
      message: "what test instructions should we include?",
      name: "instructions",
    },
    {
      type: "list",
      message: "which license would you like to add?",
      choices: ["mit", "open-source", "option-3"],
      name: "license",
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


  const writeToFile = () => {
    appendFile(fileName, )
  }

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
