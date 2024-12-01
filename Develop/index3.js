// TODO: Include packages needed for this application
import { error } from "console";
import fs, { write, promises } from "fs";
import inquirer from "inquirer";

const licenseBadges = [
'[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
'[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
'[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)'
]

const mitBadge = licenseBadges[0];
const gplBadge = licenseBadges[1];
const hippoBadge = licenseBadges[2];

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
    choices: ["MIT", "GPL v3", "Hippocratic 3.0"],
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

    //Add Badge to top
    var badge = '';
    if (answers.usage === 'MIT') {badge = mitBadge}
    else if (answers.usage === 'GPL v3') {badge = gplBadge}
    else if (answers.usage === 'Hippocratic 3.0') {badge = hippoBadge}

    writeToFile(fileTitle, `\n ${badge}`)

    // could probably do this is a for loop with string literals
    // add TOC with predifined names
    writeToFile(fileTitle, String(TOC));

    // add the description 
    const desc = `${'\n'}<div id='Description' /> ${'\n'} ${'\n'} ## Description ${'\n'} ${answers.description} ${'\n'}`;
    writeToFile(fileTitle, desc);

    
    // add the installation instructions
    const inst = `${'\n'}<div id='Installation' /> ${'\n'} ${'\n'} ## Installation ${'\n'} ${answers.installation} ${'\n'}`;
    writeToFile(fileTitle, inst);

    // add usage 
    const usage = `${'\n'}<div id='Usage' /> ${'\n'} ${'\n'} ## Usage ${'\n'} ${answers.usage} ${'\n'}`;
    writeToFile(fileTitle, usage);

    // add contributing
    const contribute = `${'\n'}<div id='Contributing' /> ${'\n'} ${'\n'} ## Contributing ${'\n'} ${answers.contributing} ${'\n'}`;
    writeToFile(fileTitle, contribute);

    // add tests
    const tests = `${'\n'}<div id='Tests' /> ${'\n'} ${'\n'} ## Tests ${'\n'} ${answers.tests} ${'\n'}`;
    writeToFile(fileTitle, tests);

    const contactText = `For more information, please reach out to [mailto:${answers.email}](${answers.email}) or visit [${answers.github}](${answers.github}).`
    // add questions
    const contact = `${'\n'}<div id='Questions' /> ${'\n'} ${'\n'} ## Questions ${'\n'} ${contactText} ${'\n'}`;
    writeToFile(fileTitle, contact);
}

const init = () => {
    askQuestions();
}

init();


//TO DO:
//ADD Links for Each Section: <div id='Description'/> etc
