// Create a div to hold the UI elements
let container = document.createElement('div');
container.id = 'my-extension-container';

// Create input fields for the user's basic info
let nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.placeholder = 'Enter your name';
container.appendChild(nameInput);

let emailInput = document.createElement('input');
emailInput.type = 'email';
emailInput.placeholder = 'Enter your email';
container.appendChild(emailInput);

let phoneInput = document.createElement('input');
phoneInput.type = 'tel';
phoneInput.placeholder = 'Enter your phone number';
container.appendChild(phoneInput);

// Create a textarea for the user to paste their resume
let resumeTextarea = document.createElement('textarea');
resumeTextarea.placeholder = 'Paste your resume here';
container.appendChild(resumeTextarea);

// Create a button to parse the resume and save the information
let saveButton = document.createElement('button');
saveButton.textContent = 'Save Resume';
saveButton.addEventListener('click', function() {
  // Parse the resume and save the information
  let resumeText = resumeTextarea.value;
  let resumeData = parseResume(resumeText);
  saveResumeData(resumeData);
});
container.appendChild(saveButton);

// Add the container to the document body
document.body.appendChild(container);

// Function to parse the resume into data for autofilling
function parseResume(resumeText) {
  // Implement your resume parsing code here
  // Return an object with the parsed data
}

// Function to save the parsed resume data
function saveResumeData(resumeData) {
  // Implement your resume data saving code here
  // Use a unique name for each resume to allow the user to save multiple resumes
}
