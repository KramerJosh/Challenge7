import { error } from "console";
import fs, { write } from "fs";
import inquirer from "inquirer";

// Predefined array of questions
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
    },
    {
        type: 'input',
        name: 'age',
        message: 'How old are you?'
    },
    {
        type: 'input',
        name: 'favoriteColor',
        message: 'What is your favorite color?'
    },
    {
        type: 'input',
        name: 'hobby',
        message: 'What is your favorite hobby?'
    }
];

// Async function to ask the user for multiple questions from the predefined array
async function askQuestions() {
    // Ask all questions from the predefined array at once
    const answers = await inquirer.prompt(questions);

    // Log the answers
    console.log('\nSummary of your answers:');
    console.log('Name: ' + answers.name);
    console.log('Age: ' + answers.age);
    console.log('Favorite Color: ' + answers.favoriteColor);
    console.log('Favorite Hobby: ' + answers.hobby);

    // Optionally, process the answers (e.g., save to a file)
    processAnswers(answers);
}

// Function to process the collected answers
function processAnswers(answers) {
    console.log('\nProcessing answers...');
    // Here you could add logic to save the answers to a file or perform further actions
    // For example, save to a file:
    // fs.writeFileSync('answers.json', JSON.stringify(answers, null, 2));
}

// Start asking questions
askQuestions();