var contacts; // Array with contacts

function startApp() {
  /*
  The function that starts the app

  Runs when the app (contacts.html) has loaded and displays
  existing contacts in the view
  */
  loadContacts();
  displayContacts();
}


function loadContacts() {
  /*
  Reads information from the localStorage and displays it in the app
  */

  // Detect if there are any existing contacts
  if (localStorage.contacts) {
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
  contacts = JSON.parse(localStorage.contacts);   // make sure to use new data in the app
  refreshList();  //
}


function addContact(contact) {
  /*
  Add a new contact to the storage

  Takes a contact-object as argument, which contains name and phone properties
  */
  contacts.push(contact);
  updateContacts();   // save to localStorage
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


function displayContacts() {
  /*
  Generate HTML to display contact-data in the div #list
  */
  var out = "";
  contacts.forEach(function(contact) {
    out += "<p class='contact'><span class='name'>" + contact.name + "</span>" + " - " + contact.phone + "<button onclick='deleteContact(this);'>Delete</button></p>";
  });

  var list = document.getElementById("list");
  list.innerHTML = out;
}


function deleteContact(button) {
  /*
  Delete a contact from the storage, but only if the user confirms
  */
  var contact2delete = button.parentNode.firstChild.innerHTML;

  if (confirm("Do you really want to delete " + contact2delete + "?")) {


    contacts = contacts.filter(function(contact) {
      return contact.name !== contact2delete;
    });

    updateContacts();
  }
}


function refreshList() {
  /*
  Delete old data and replace it with new to make the app show latest changes

  This way of implementing it is pretty slow and bad for larger apps, but gets
  the job done for a small example like this app.
  */
  var list = document.getElementById("list");
  list.innerHTML = "";
  displayContacts();
}
