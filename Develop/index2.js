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

// Prompt for user input
const prompts = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?'
  },
  {
    type: 'confirm',
    name: 'addSection',
    message: 'Do you want to add a section?',
    default: true
  }
];

// Prompt for section details
const getSectionDetails = async (sections = []) => {
  const { addSection } = await inquirer.prompt(prompts);

  if (addSection) {
    const sectionDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the section:'
      },
      {
        type: 'input',
        name: 'content',
        message: 'Enter the content of the section (Markdown supported):'
      }
    ]);
    sections.push(sectionDetails);
    return getSectionDetails(sections);
  } else {
    return sections;
  }
};

// Main function to generate the README
const createReadMe = async () => {
  try {
    // Get project title
    const { title } = await inquirer.prompt(prompts[0]);

    // Get section details from the user
    const sections = await getSectionDetails();

    // Generate the README markdown content
    const readmeContent = generateMarkdown(title, sections);

    // Write the README.md file
    fs.writeFileSync('README.md', readmeContent);
    console.log('README.md file has been created successfully!');
  } catch (error) {
    console.error('Error creating README.md:', error);
  }
};

// Run the program
createReadMe();
