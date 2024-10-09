document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("new-task");
    const todoList = document.getElementById("todo-list");
    
    // Create notification div
    const notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.top = "20px"; // Position at the top
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)"; // Center horizontally
    notification.style.padding = "10px 20px";
    notification.style.backgroundColor = "#4CAF50"; // Green background for success
    notification.style.color = "white";
    notification.style.borderRadius = "5px";
    notification.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    notification.style.display = "none"; // Initially hidden
    document.body.appendChild(notification);
  
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent page refresh
  
      const taskText = input.value.trim();
      if (taskText) {
        addTask(taskText);
        input.value = ""; // Clear the input
        showNotification("✔️ Task added successfully!");
      }
    });
  
    function addTask(taskText) {
      const li = document.createElement("li");
  
      const taskSpan = document.createElement("span");
      taskSpan.textContent = taskText;
      li.appendChild(taskSpan);
  
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "Complete";
      completeBtn.addEventListener("click", () => {
        const completed = taskSpan.classList.toggle("completed");
        showNotification(completed 
          ? "✔️ Task marked as complete!" 
          : "❌ Task marked as incomplete!");
      });
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        todoList.removeChild(li); // Remove task
        showNotification("🗑️ Task deleted successfully!");
      });
  
      li.appendChild(completeBtn);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    }
  
    function showNotification(message) {
      notification.textContent = message;
      notification.style.display = "block";
  
      // Hide notification after 3 seconds
      setTimeout(() => {
        notification.style.display = "none";
      }, 3000);
    }
  });
  