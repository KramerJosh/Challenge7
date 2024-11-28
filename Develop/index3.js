// TODO: Include packages needed for this application
import { error } from "console";
import fs, { write } from "fs";
import inquirer from "inquirer";


// Function to generate markdown for the README
const generateMarkdown = (title, sections) => {
    let toc = '## Table of Contents\n';
    let content = `# ${title}\n\n`;
  
    // Generate Table of Contents and sections
    sections.forEach((section, index) => {
      const sectionTitle = section.title;
      const sectionAnchor = sectionTitle.toLowerCase().replace(/\s+/g, '-');
      
      // Add to ToC
      toc += `- [${sectionTitle}](#${sectionAnchor})\n`;
      
      // Add section content
      content += `## ${sectionTitle}\n\n${section.content}\n\n`;
    });
  
    // Combine ToC and content
    return `${content}\n${toc}`;
  };

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

