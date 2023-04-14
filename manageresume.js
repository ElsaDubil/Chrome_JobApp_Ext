function getResumeList() {
    // open connection to indexedDB
    const request = indexedDB.open("resumes", 1);
    let resumes = [];
  
    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(["resumes"], "readonly");
      const objectStore = transaction.objectStore("resumes");
      
      // iterate through resumes in object store and add to array
      objectStore.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
          resumes.push({ id: cursor.key, name: cursor.value.name });
          cursor.continue();
        }
        else {
          // populate dropdown with resume list
          const dropdown = document.getElementById("resume-dropdown");
          dropdown.innerHTML = "";
          for (const resume of resumes) {
            const option = document.createElement("option");
            option.value = resume.id;
            option.text = resume.name;
            dropdown.appendChild(option);
          }
        }
      };
    };
  }
  
// get dropdown and buttons
const dropdown = document.getElementById("resume-dropdown");
const editButton = document.getElementById("edit-resume-button");
const deleteButton = document.getElementById("delete-resume-button");

// add event listener to dropdown
dropdown.addEventListener("change", function() {
  // get selected value
  const selectedValue = dropdown.value;
  
  // enable buttons and set href
  editButton.disabled = false;
  deleteButton.disabled = false;
  editButton.href = `editresume.html?id=${selectedValue}`;
  deleteButton.href = `deleteresume.html?id=${selectedValue}`;
});

document.addEventListener("DOMContentLoaded", getResumeList);
getResumeList();