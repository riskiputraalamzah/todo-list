document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    const newTaskInput = document.getElementById('new-task');
  
    // Load tasks from localStorage
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
        addTaskToList(task.text, task.completed);
      });
    };
  
    // Save tasks to localStorage
    const saveTasks = () => {
      const tasks = [];
      document.querySelectorAll('#todo-list li').forEach(task => {
        tasks.push({
          text: task.querySelector('.task-text').textContent,
          completed: task.classList.contains('completed')
        });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    // Add a new task to the list
    const addTaskToList = (taskText, completed = false) => {
      const li = document.createElement('li');
      li.className = completed ? 'completed' : '';
  
      const taskSpan = document.createElement('span');
      taskSpan.className = 'task-text';
      taskSpan.textContent = taskText;
      li.appendChild(taskSpan);
  
      const completeButton = document.createElement('button');
      completeButton.textContent = completed ? 'Undo' : 'Complete';
      completeButton.addEventListener('click', () => {
        li.classList.toggle('completed');
        completeButton.textContent = li.classList.contains('completed') ? 'Undo' : 'Complete';
        saveTasks();
      });
      li.appendChild(completeButton);
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasks();
        swal("Task deleted successfully!", "", "success");
      });
      li.appendChild(deleteButton);
  
      todoList.appendChild(li);
    };
  
    // Handle form submission
    todoForm.addEventListener('submit', event => {
      event.preventDefault();
      const taskText = newTaskInput.value.trim();
      if (taskText !== '') {
        addTaskToList(taskText);
        newTaskInput.value = '';
        saveTasks();
        swal("Task added successfully!", "", "success");
      } else {
        swal("Error", "Please enter a task", "error");
      }
    });
  
    // Filter tasks
    const filterTasks = (filter) => {
      document.querySelectorAll('#todo-list li').forEach(task => {
        switch (filter) {
          case 'all':
            task.style.display = '';
            break;
          case 'completed':
            task.style.display = task.classList.contains('completed') ? '' : 'none';
            break;
          case 'incomplete':
            task.style.display = task.classList.contains('completed') ? 'none' : '';
            break;
        }
      });
    };
  
    // Add filter buttons
    const filterContainer = document.createElement('div');
    ['all', 'completed', 'incomplete'].forEach(filter => {
      const button = document.createElement('button');
      button.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);
      button.addEventListener('click', () => filterTasks(filter));
      filterContainer.appendChild(button);
    });
    document.querySelector('.container').appendChild(filterContainer);
  
    // Load tasks on page load
    loadTasks();
  });