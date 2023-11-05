function saveTasksToStorage() {
  const table = document.getElementById("data");
  let tasks = [];

  for (let i = 0; i < table.rows.length; i++) {
    // go trough the rows of the table, removing done-symbol
    let row = table.rows[i];
    let cell = row.cells[0];
    let taskName = cell.textContent.replace(" ✓", "");
    let isDone = cell.classList.contains("done");

    tasks.push({ name: taskName, isDone: isDone });
  }

  let tasksJSON = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksJSON);
}

function validateForm() {
  var task = document.forms.todoForm.taskfield.value;

  if (task.length < 3 || task == "") {
    document.getElementById("errorText").innerHTML =
      "Task should exist or be longer!";
    document.forms.todoForm.taskfield.style.background = "red";
    return false;
  } else {
    document.getElementById("errorText").innerHTML = "";
    document.forms.todoForm.taskfield.style.background = "";
    return true;
  }
}

function insertRows() {
  // Find a table element with id "data"
  var table = document.getElementById("data");

  // Read the value of the input field
  var name = document.getElementById("taskfield").value;

  if (validateForm()) {
    // Create a new empty row and add it to the table
    var row = table.insertRow();

    // Insert a new cell into the row and display whatever is written in name variable
    var cell1 = row.insertCell(0);
    cell1.innerHTML = name;

    // Insert a new cell to the row with the "Delete" button, and on click on the button, deleteRow function is called
    var cell2 = row.insertCell(1);
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () {
      deleteRow(row);
    };
    cell2.appendChild(deleteButton);

    // Insert a new cell to the row with "Done" button, and on click on the button, markDone function is called
    var cell3 = row.insertCell(2);
    var markDoneButton = document.createElement("button");
    markDoneButton.innerHTML = "Done";
    markDoneButton.onclick = function () {
      markDone(row);
    };
    cell3.appendChild(markDoneButton); //adding the button to the cell
    saveTasksToStorage();
  }
}

function deleteRow(row) {
  var table = document.getElementById("data");
  table.deleteRow(row.rowIndex);
}

function markDone(cell) {
  if (cell.classList.contains("done")) {
    return; // marked as done, no need to do anything, the class "done" from CSS has been applied already
  }
  cell.innerHTML += " ✓"; // otherwise, add a checkmark symbol
  cell.classList.add("done"); // add the properties from CSS .done
}
