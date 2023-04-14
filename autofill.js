let workExperience = document.getElementById('work-experience');
let addButton = document.getElementById('add-work-experience');

addButton.addEventListener('click', function() {
  let newExperience = workExperience.firstElementChild.cloneNode(true);
  workExperience.appendChild(newExperience);
});
// open a connection to the indexedDB database
var request = indexedDB.open("resumeDatabase", 1);

// handle errors that may occur while opening the database
request.onerror = function() {
  alert("There was an error opening the database.");
};

// handle the creation of the object stores
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // create the 'userInfo' object store
  var userInfoStore = db.createObjectStore("userInfo", { keyPath: "email" });
  userInfoStore.createIndex("nameIndex", "name", { unique: false });
  userInfoStore.createIndex("phoneIndex", "phone", { unique: true });

  // create the 'resumes' object store
  var resumesStore = db.createObjectStore("resumes", { keyPath: "resumeId", autoIncrement: true });
  resumesStore.createIndex("emailIndex", "email", { unique: false });
};

// find the "Add another work experience" button
var addBtn = $("#add-work-experience");

// find the container that will hold the work experience sections
var workExpContainer = $("#work-experience");

// add a click event listener to the "Add another work experience" button
addBtn.on("click", function() {
  // create a new work experience section
  var newWorkExp = $('<div class="work-experience">' +
    '<h3>Work Experience</h3>' +
    '<div>' +
    '<label for="position-title">Position Title:</label>' +
    '<input type="text" id="position-title" name="position-title">' +
    '</div>' +
    '<div>' +
    '<label for="company-name">Company Name:</label>' +
    '<input type="text" id="company-name" name="company-name">' +
    '</div>' +
    '<div>' +
    '<label for="company-location">Company Location:</label>' +
    '<input type="text" id="company-location" name="company-location">' +
    '</div>' +
    '<div>' +
    '<label for="start-date">Start Date:</label>' +
    '<input type="date" id="start-date" name="start-date">' +
    '</div>' +
    '<div>' +
    '<label for="end-date">End Date:</label>' +
    '<input type="date" id="end-date" name="end-date">' +
    '<input type="checkbox" id="present" name="present" value="present">' +
    '<label for="present">Present</label>' +
    '</div>' +
    '<div>' +
    '<label for="responsibilities">Job Responsibilities:</label>' +
    '<textarea id="responsibilities" name="responsibilities"></textarea>' +
    '</div>' +
    '</div>');

  // add the new work experience section to the container
  workExpContainer.append(newWorkExp);
});

// find the "submit" button
var submitBtn = $("#submit-btn");

submitBtn.on("click", function() {
  // get a reference to the database
  var db = window.indexedDB.open("userDatabase", 1);

  // handle errors that may occur while opening the database
  db.onerror = function() {
    alert("There was an error opening the database.");
  };

  // handle success of opening the database
  db.onsuccess = function() {
    // start a new transaction
    var transaction = db.result.transaction(["userInfo"], "readwrite");

    // get the object store for the transaction
    var objectStore = transaction.objectStore("userInfo");

    // get the user's information from the form
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var degreeType = $('#degree-type').val();
    var institutionName = $('#institution-name').val();
    var major = $('#major').val();
    var gradDate = $('#grad-date').val();
    var workExperienceArray = [];

    // loop through all work experience sections
    $('.work-experience').each(function() {
      var positionTitle = $(this).find('#position-title').val();
      var companyName = $(this).find('#company-name').val();
      var companyLocation = $(this).find('#company-location').val();
      var startDate = $(this).find('#start-date').val();
      var endDate = $(this).find('#end-date').val();
      var present = $(this).find('#present').is(':checked');
      var responsibilities = $(this).find('#responsibilities').val();

      // create a new work experience object and add it to the array
      var workExp = {
        positionTitle: positionTitle,
        companyName: companyName,
        companyLocation: companyLocation,
        startDate: startDate,
        endDate: endDate,
        present: present,
        responsibilities: responsibilities
      };

      workExperienceArray.push(workExp);
    });

    // create an object with the user's information
    var userInfo = {
      name: name,
      email: email,
      phone: phone,
      education: {
        degreeType: degreeType,
        institutionName: institutionName,
        major: major,
        gradDate: gradDate
      },
      workExperience: workExperienceArray
    };

    // add the user's information to the object store
    var addUser = objectStore.add(userInfo);

    // if the information was successfully added to the object store, alert the user
    addUser.onsuccess = function() {
      alert('Your information has been saved!');
    };

    // if there was an error adding the information to the object store, alert the user
    addUser.onerror = function() {
      alert('There was an error saving your information.');
    };

    // complete the transaction
    transaction.oncomplete = function() {
      db.close();
    };
  };
});
