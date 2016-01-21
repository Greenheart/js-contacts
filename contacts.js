var contacts; // Array with contacts
var list = document.querySelector('#list');
var template = document.querySelector('#contact');

function startApp() {
  /*
  The function that starts the app

  Runs when the app (contacts.html) has loaded and displays
  existing contacts in the view
  */
  loadContacts();
  refreshContactsList();
}


function loadContacts() {
  /*
  Reads information from the localStorage and displays it in the app
  */

  // Detect if there are any existing contacts
  if (localStorage.contacts && JSON.parse(localStorage.contacts).length > 0) {
    contacts = JSON.parse(localStorage.contacts);
    console.info("Existing contacts loaded from the localStorage");
  } else {
    contacts = [];
    console.info("Created empty contact-storage");
  }
}


function updateContacts() {
  /*
  Update data in localStorage
  */
  localStorage.contacts = JSON.stringify(contacts); // overwrite old data with new
  refreshContactsList();  // update list and use new data
}


function addContact(contact) {
  /*
  Add a new contact to the storage

  Takes a contact-object as argument, which contains name and phone properties
  */
  contacts.push(contact);
  console.log("adding new contact");
  updateContacts();
}


function getNewContact() {
  /*
  Prompt user for new contact-information

  Will only add it to the localStorage if the input is valid
  */
  var name = prompt("Enter name:");
  var phone = prompt("Enter Phone:");

  if (name && phone && name.length > 0 && phone.length > 0) {
    addContact({
      name: name,
      phone: phone
    });
  } else {
    alert("Invalid name or phone. Try again");
  }
}


function refreshContactsList() {
  /*
  Update the contacts list and re-render only the necessary parts
  */
  var currentContacts = list.querySelectorAll('p');

  // If no contacts rendered yet, render them all
  if (currentContacts.length === 0) {
    contacts.forEach(renderContact);
  } else {
    contacts.forEach(function(contact) {

      // Get names of currently rendered contacts
      var renderedContacts = [].map.call(currentContacts, function(contactElem) {
        return contactElem.querySelector('.name').textContent;
      })

      // Only render the current contact if it's not already rendered
      if (renderedContacts.indexOf(contact.name) === -1) {
        renderContact(contact);
      }
    });
  }
}

function renderContact(contact) {
  /*
  Poulate the #contact-template with data for a contact

  contact: Object with name and phone properties
  */
  var clone = document.importNode(template.content, true);

  // Select each field and add data to it's textContent
  clone.querySelector('.name').textContent = contact.name;
  clone.querySelector('.phone').textContent = contact.phone;

  list.appendChild(clone);
}

function deleteContact(button) {
  /*
  Delete a contact from the storage, but only if the user confirms
  */
  var contact2delete = button.parentNode.querySelector('.name').textContent;

  if (confirm("Do you really want to delete " + contact2delete + "?")) {

    contacts = contacts.filter(function(contact) {
      return contact.name !== contact2delete;
    });

    // Stop displaying the contact just removed and update storage
    button.parentNode.remove();
    updateContacts();
  }
}
