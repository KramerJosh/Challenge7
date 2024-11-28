// TODO: Include packages needed for this application
import { error } from "console";
import fs, { write, promises } from "fs";
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

const TOC = [
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
    "5. [Tests](#Tests)" +
    "\n"
]

// Define a function to ask prompts and store answers

function writeToFile(fileName, data) {
    fs.appendFileSync(fileName, data, (err) => {
      if (err) console.log(err);
    });
  }

async function askQuestions() {
    const answers = await inquirer.prompt(questions);
    processAnswers(answers)
    }

function processAnswers(answers) {
    // append each section after TOC is written

    //create new file with title
    const fileTitle = answers.title + ".md";
    fs.writeFileSync(fileTitle, `# ${answers.title}` + "\n", (err) => {
        if (err) console.log(err);
    })

    // add TOC with predifined names
    writeToFile(fileTitle, String(TOC));

    const desc = ` ## Description ${'\n'} ${answers.description} ${'\n'}`;

    // add the description 
    writeToFile(fileTitle, desc);

    
    // add the installation instructions
    const inst = `## Installation ${'\n'} ${answers.installation} ${'\n'}`;
    writeToFile(fileTitle, inst);

    // add usage 
    const usage = `## Usage ${'\n'} ${answers.usage} ${'\n'}`;
    writeToFile(fileTitle, usage);

    // add contributing
    const contribute = `## Contributing ${'\n'} ${answers.contributing} ${'\n'}`;
    writeToFile(fileTitle, contribute);

    // add tests
    const tests = `## Tests ${'\n'} ${answers.tests} ${'\n'}`;
    writeToFile(fileTitle, tests);
}

const init = () => {
    askQuestions();
}

init();


//TO DO:
//ADD Links for Each Section: <div id='Description'/> etc
