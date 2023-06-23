// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
  let arr = [];

  // Get the button element
  let button = document.getElementById("submitBtn");

  // Function to add task
  function addTask(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Access the input element and get its value
    let inputValue = document.getElementById("inputTask").value;

    // Check if input value is empty
    if (inputValue.trim() === "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please input text",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    // Check if the array length is already 5
    if (arr.length === 8) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Task limit reached (8 tasks only)",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    // Push the input value into the array
    arr.push(inputValue);

    // Clear the input field
    document.getElementById("inputTask").value = "";

    // Update the task list
    displayList();

    // Show success alert
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Task Added",
      showConfirmButton: false,
      timer: 1500
    });
  }
  
  // Assign the addTask function to the button's click event
  button.addEventListener("click", addTask);

  // Get the task list element
  let taskList = document.getElementById("taskList");

  // Function to update the task list
  function displayList() {
    // Clear the task list
    taskList.innerHTML = "";

    // Loop through the array and create list items for each value
    arr.forEach(function(value, index) {
      let listItem = document.createElement("li");
      listItem.textContent = value;
      listItem.id = "listItem"
      taskList.appendChild(listItem);

      // Create the "Edit" button
      let editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.id = "editBtn";

      // Create the "Remove" button
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Remove";
      deleteButton.id = "deleteBtn";

      // Create the "Done" button
      let doneButton = document.createElement("button");
      doneButton.textContent = "Done";
      doneButton.id = "doneBtn";

      // Append the buttons to the list item
      listItem.appendChild(editButton);
      listItem.appendChild(doneButton);
      listItem.appendChild(deleteButton);
      

      // Add event listener to the "Edit" button
      editButton.addEventListener("click", function() {
        // Clear the list item content
        listItem.innerHTML = "";

        // Create the edit form
        let editForm = document.createElement("form");
        let editInput = document.createElement("input");
        let submitButton = document.createElement("button");

        editInput.type = "text";
        editInput.value = value;
        submitButton.type = "submit";
        submitButton.textContent = "Save";

        // Append the form elements to the list item
        editForm.appendChild(editInput);
        editForm.appendChild(submitButton);
        listItem.appendChild(editForm);

        // Add event listener to the form submission
        editForm.addEventListener("submit", function(e) {
          e.preventDefault(); // Prevent form submission and page refresh
          let newText = editInput.value;
          arr[index] = newText;
          displayList();
        });
      });

      // Add event listener to the "Remove" button
      deleteButton.addEventListener("click", function() {
        arr.splice(index, 1);
        displayList();
      });

      // Add event listener to the "Done" button
      doneButton.addEventListener("click", function() {
        listItem.style.textDecoration = "line-through";
      });
    });
  }

});
  