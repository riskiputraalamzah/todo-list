// Select the form, input field, and the task list
const todoForm = document.getElementById("todo-form");
const newTaskInput = document.getElementById("new-task");
const todoList = document.getElementById("todo-list");

// Add event listener to the form to handle task submission
todoForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  const taskText = newTaskInput.value.trim(); // Get task text
  if (taskText === "") return; // Don't add empty tasks

  // Create a new list item (task)
  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;

  // Create 'delete' button (now the only button)
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Hapus"; // Delete task
  deleteButton.classList.add("delete-btn");
  taskItem.appendChild(deleteButton);

  // Add the task to the list
  todoList.appendChild(taskItem);

  // Clear the input field
  newTaskInput.value = "";

  // Show SweetAlert notification for task added
  Swal.fire({
    icon: "success",
    title: "Task Added",
    text: `"${taskText}" has been added to your list!`,
    showConfirmButton: false,
    timer: 1500,
  });
});

// Add event listener to the task list to handle task deletion
todoList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    // Confirm task deletion with SweetAlert
    const taskItem = event.target.parentElement;
    const taskText = taskItem.textContent.replace("Hapus", "").trim(); // Get task text without button text

    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${taskText}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, delete the task
        todoList.removeChild(taskItem);

        // Show SweetAlert notification for task deleted
        Swal.fire({
          icon: "success",
          title: "Task Deleted",
          text: `"${taskText}" has been removed from your list.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
});
