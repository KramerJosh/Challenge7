//Import packages

import { error } from "console";
import fs, { write, promises } from "fs";
import inquirer from "inquirer";

// Badges from https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
const licenseBadges = [
'[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
'[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
'[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)'
]

// Add constants for each badge
const mitBadge = licenseBadges[0];
const gplBadge = licenseBadges[1];
const hippoBadge = licenseBadges[2];


// Question array to be called lower down from inquirer
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
    name: "license",
  },
  {
    type: "input",
    message: "how do you use the program?",
    name: "usage",
  },
  {
    type: "input",
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


// used to generate TOC - ideally would rework this so that each section was pulled from questions.name[x]
// '\n' causes a line break to occur - need these for everything to order correctly
// n. at front of each string causes ordered list to form in markdown
// [hyperlink](display text)
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
    "4. [License](#License)" +
    "\n" +
    "5. [Contributing](#Contributing)" +
    "\n" +
    "6. [Tests](#Tests)" +
    "\n"
]

// Define a function to ask prompts and store answers

// Define a function to add to a content to an existing file
// I've found it important to use fs.appendFileSync - otherwise the data gets written out of order
// And we really want it written in order.
function writeToFile(fileName, data) {
    fs.appendFileSync(fileName, data, (err) => {
      if (err) console.log(err);
    });
  }

// Wait until answers becomes populated with responses to the questions
// Then run the processAnswers function
async function askQuestions() {
    const answers = await inquirer.prompt(questions);
    processAnswers(answers)
    }

// Okay so this is a big one.  Comments above each section.  This runs in the same function that calls inquirer to ask questions.
function processAnswers(answers) {
    //create new file with title pulled from the answer.
    const fileTitle = answers.title + ".md";
    fs.writeFileSync(fileTitle, `# ${answers.title}` + "\n", (err) => {
        if (err) console.log(err);
    })

    //Add Badge to top
    var badge = '';
    if (answers.license === 'MIT') {badge = mitBadge}
    else if (answers.license === 'GPL v3') {badge = gplBadge}
    else if (answers.license === 'Hippocratic 3.0') {badge = hippoBadge}

    writeToFile(fileTitle, `\n ${badge}`)

    // could probably do this is a for loop with template literals
      // Tried to do the above, had trouble with the ${answers.iterate} part of it, could get everything but that done, so I took it out.
    // add TOC with predifined names
    writeToFile(fileTitle, String(TOC));

    // For each of these we start with a new line, then create a div with an anchor for the TOC to link to.  Two new lines worked well here.
    // Next we add the visible title of the section, new line, section content from inquirer, then a new line under.

    // add the description 
    const desc = `${'\n'}<div id='Description' /> ${'\n'} ${'\n'} ## Description ${'\n'} ${answers.description} ${'\n'}`;
    writeToFile(fileTitle, desc);

    // add the installation instructions
    const inst = `${'\n'}<div id='Installation' /> ${'\n'} ${'\n'} ## Installation ${'\n'} ${answers.installation} ${'\n'}`;
    writeToFile(fileTitle, inst);

    // add usage 
    const usage = `${'\n'}<div id='Usage' /> ${'\n'} ${'\n'} ## Usage ${'\n'} ${answers.usage} ${'\n'}`;
    writeToFile(fileTitle, usage);

    // add license 
    const license = `${'\n'}<div id='License' /> ${'\n'} ${'\n'} ## License ${'\n'} ${answers.license} ${'\n'}`;
    writeToFile(fileTitle, license);

    // add contributing
    const contribute = `${'\n'}<div id='Contributing' /> ${'\n'} ${'\n'} ## Contributing ${'\n'} ${answers.contributing} ${'\n'}`;
    writeToFile(fileTitle, contribute);

    // add tests
    const tests = `${'\n'}<div id='Tests' /> ${'\n'} ${'\n'} ## Tests ${'\n'} ${answers.tests} ${'\n'}`;
    writeToFile(fileTitle, tests);

    // add questions
    // Define a constant to hold the text for the contact section, then populate it with email and github info.
    // Could add some error checking here (probably should add that in the askQuestions function, before processAnswers runs)
    const contactText = `For more information, please reach out to [${answers.email}](mailto:${answers.email}) or visit [${answers.github}](https://www.github.com/${answers.github}).`
    const contact = `${'\n'}<div id='Questions' /> ${'\n'} ${'\n'} ## Questions ${'\n'} ${contactText} ${'\n'}`;
    writeToFile(fileTitle, contact);
}

// Define a function to run on startup of the program.  Right now it only calls the askQuestions Function
const init = () => {
    askQuestions();
}

// Call the init Function
init();
