// Define database name and version
const DB_NAME = 'contacts_db';
const DB_VERSION = 1;

// Define store and index names
const STORE_NAME = 'contacts_store';
const NAME_INDEX = 'name_index';

// Define request for opening IndexedDB database
const dbOpenRequest = indexedDB.open(DB_NAME, DB_VERSION);

// Function to handle errors
function handleRequestError(request) {
  console.error(`Request error: ${request.error}`);
}

// Function to handle success
function handleRequestSuccess(request) {
  console.log('Request success');
}

// Function to initialize database
function initDatabase() {
  dbOpenRequest.onupgradeneeded = function(event) {
    const db = event.target.result;
    
    // Create object store
    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });

    // Create index for searching by name
    store.createIndex(NAME_INDEX, 'name', { unique: false });
  };

  dbOpenRequest.onerror = handleRequestError;
  dbOpenRequest.onsuccess = handleRequestSuccess;
}

// Function to save contact information
function saveContact() {
  // Get form input values
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const street1 = document.getElementById('street1').value;
  const street2 = document.getElementById('street2').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const zip = document.getElementById('zip').value;

  // Open transaction and object store
  const db = dbOpenRequest.result;
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  // Create contact object
  const contact = {
    name: name,
    phone: phone,
    email: email,
    address: {
      street1: street1,
      street2: street2,
      city: city,
      state: state,
      zip: zip
    }
  };

  // Add contact object to object store
  const addRequest = store.add(contact);

  addRequest.onerror = handleRequestError;
  addRequest.onsuccess = handleRequestSuccess;
}

// Function to retrieve contact information
function retrieveContact() {
  // Open transaction and object store
  const db = dbOpenRequest.result;
  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);

  // Get all objects from object store
  const getRequest = store.getAll();

  getRequest.onerror = handleRequestError;
  getRequest.onsuccess = function(event) {
    const contacts = event.target.result;

    // If contacts exist, populate form fields
    if (contacts.length > 0) {
      const contact = contacts[contacts.length - 1];
      document.getElementById('name').value = contact.name;
      document.getElementById('phone').value = contact.phone;
      document.getElementById('email').value = contact.email;
      document.getElementById('street1').value = contact.address.street1;
      document.getElementById('street2').value = contact.address.street2;
      document.getElementById('city').value = contact.address.city;
      document.getElementById('state').value = contact.address.state;
      document.getElementById('zip').value = contact.address.zip;
    }
  };
}

// Call initDatabase function to initialize IndexedDB
initDatabase();

