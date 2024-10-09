document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("new-task");
    const todoList = document.getElementById("todo-list");
  
    // Function to add a new task
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Get the task value
      const taskValue = taskInput.value.trim();
  
      // Check if the input is not empty
      if (taskValue !== "") {
        // Create new list item
        const li = document.createElement("li");
  
        // Create a span for the task text
        const taskText = document.createElement("span");
        taskText.textContent = taskValue;
  
        // Add event listener to toggle completed state (strike-through) on the task text only
        taskText.addEventListener("click", () => {
          taskText.classList.toggle("completed");
        });
  
        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Hapus";
        deleteBtn.classList.add("delete-btn");
  
        // Add event listener to remove task
        deleteBtn.addEventListener("click", () => {
          li.remove();
        });
  
        // Append task text and delete button to the list item
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
  
        // Append list item to the task list
        todoList.appendChild(li);
  
        // Clear the input field
        taskInput.value = "";
      }
    });
  });
  