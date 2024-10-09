document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("new-task");
    const todoList = document.getElementById("todo-list");
    const deleteAllBtn = document.getElementById("delete-all"); // Tombol Delete All
  
    // Function to add a new task
    function addTask(task) {
      const li = document.createElement("li");
  
      // Task text
      const taskText = document.createElement("span");
      taskText.textContent = task;
  
      // Complete task button
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "Complete";
      completeBtn.addEventListener("click", () => {
        li.classList.toggle("completed");
      });
  
      // Delete task button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        todoList.removeChild(li);
      });
  
      // Append elements to list item
      li.appendChild(taskText);
      li.appendChild(completeBtn);
      li.appendChild(deleteBtn);
  
      // Add list item to the list
      todoList.appendChild(li);
    }
  
    // Handle form submit event
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form submission
  
      const task = taskInput.value.trim();
  
      if (task) {
        addTask(task); // Add task to the list
        taskInput.value = ""; // Clear input field
      }
    });
  
    // Delete all tasks
    deleteAllBtn.addEventListener("click", () => {
      todoList.innerHTML = ""; // Hapus semua task dari daftar
    });
  });
  