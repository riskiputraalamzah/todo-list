// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const newTaskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
  
    // Load tasks from localStorage when the page loads
    loadTasksFromLocalStorage();
  
    // Function to create a new task element
    function createTaskElement(taskText, isCompleted = false) {
      const li = document.createElement('li');
  
      // Create the task text span
      const span = document.createElement('span');
      span.textContent = taskText;
  
      // If task is already completed (from localStorage), apply the completed class
      if (isCompleted) {
        span.classList.add('completed');
      }
  
      // Create the 'Done' button to mark task as completed or undone
      const toggleButton = document.createElement('button');
      toggleButton.textContent = isCompleted ? 'Undo' : 'Done';
      toggleButton.classList.add('toggle-btn', 'done-btn');
  
      // Create the 'Delete' button to remove the task
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-btn');
  
      // Append buttons and span to the list item
      li.appendChild(span);
      li.appendChild(toggleButton);
      li.appendChild(deleteButton);
  
      // Event listener to toggle between 'Done' and 'Undo'
      toggleButton.addEventListener('click', () => {
        span.classList.toggle('completed');
        toggleButton.textContent = span.classList.contains('completed') ? 'Undo' : 'Done';
        updateLocalStorage();
        filterTasks(); // Apply filter after status change
      });
  
      // Event listener to delete the task with SweetAlert confirmation
      deleteButton.addEventListener('click', () => {
        Swal.fire({
          title: 'Are you sure?',
          text: "Do you want to delete this task?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            li.remove();
            updateLocalStorage();
            Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
          } else {
            Swal.fire('Cancelled', 'Your task is safe :)', 'error');
          }
        });
      });
  
      return li;
    }
  
    // Add event listener to the form submission
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = newTaskInput.value.trim();
      if (taskText !== '') {
        const newTask = createTaskElement(taskText);
        todoList.appendChild(newTask);
        newTaskInput.value = ''; // Clear the input field
  
        Swal.fire({
          icon: 'success',
          title: 'Task added!',
          text: `Your task "${taskText}" has been added to the list.`,
          timer: 1500,
          showConfirmButton: false
        });
  
        updateLocalStorage();
      }
    });
  
    // Function to save tasks to localStorage
    function updateLocalStorage() {
      const tasks = [];
      todoList.querySelectorAll('li').forEach(li => {
        const taskText = li.querySelector('span').textContent;
        const isCompleted = li.querySelector('span').classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Function to load tasks from localStorage
    function loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
        const newTask = createTaskElement(task.text, task.completed);
        todoList.appendChild(newTask);
      });
    }
  
    // Function to filter tasks
    function filterTasks() {
      const filter = document.querySelector('.filter-btn.active').id; // Get active filter
      const tasks = todoList.querySelectorAll('li');
      
      tasks.forEach(task => {
        const isCompleted = task.querySelector('span').classList.contains('completed');
        
        switch (filter) {
          case 'filter-all':
            task.style.display = 'flex'; // Show all tasks
            break;
          case 'filter-completed':
            task.style.display = isCompleted ? 'flex' : 'none'; // Show only completed tasks
            break;
          case 'filter-uncompleted':
            task.style.display = !isCompleted ? 'flex' : 'none'; // Show only uncompleted tasks
            break;
        }
      });
    }
  
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove 'active' class from all filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked filter button
        button.classList.add('active');
        // Apply the filter
        filterTasks();
      });
    });
  
    // Apply the initial filter when the page loads (default: 'All')
    filterTasks();
  });  