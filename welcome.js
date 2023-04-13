document.addEventListener("DOMContentLoaded", function() {
    const newResumeBtn = document.getElementById("new-resume-btn");
    const editResumeBtn = document.getElementById("edit-resume-btn");
    const editContactBtn = document.getElementById("edit-contact-btn");
  
    newResumeBtn.addEventListener("click", function() {
      console.log("User clicked 'Upload a new resume'");
    });
  
    editResumeBtn.addEventListener("click", function() {
      console.log("User clicked 'Edit previous resume'");
    });
  
    editContactBtn.addEventListener("click", function() {
      console.log("User clicked 'Change basic contact information'");
    });
  });
  