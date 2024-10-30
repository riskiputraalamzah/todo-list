// script.js

const task = document.getElementById('new-task');
const form = document.getElementById('todo-form');
const taskList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const taskValue = task.value.trim();
  if (taskValue !== "") {
    const li = createTaskElement(taskValue);
    taskList.appendChild(li);
    saveTaskToLocalStorage(taskValue);
    task.value = "";
  }
}

function createTaskElement(taskValue) {
  const li = document.createElement('li');
  li.classList.add('todo-item');
  
  const taskText = document.createElement('span');
  taskText.textContent = taskValue;
  taskText.classList.add('task-text');

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.classList.add('remove-btn');

  removeBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    this.parentElement.remove();
    removeTaskFromLocalStorage(taskValue);
  });

  taskText.addEventListener('click', function() {
    li.classList.toggle('completed');
    updateTaskInLocalStorage(taskValue, li.classList.contains('completed'));
  });

  li.appendChild(taskText);
  li.appendChild(removeBtn);
  return li;
}

function saveTaskToLocalStorage(taskValue) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskValue, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = createTaskElement(task.text);
    if (task.completed) {
      li.classList.add('completed');
    }
    taskList.appendChild(li);
  });
}

function removeTaskFromLocalStorage(taskValue) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.text !== taskValue);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(taskValue, completed) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskToUpdate = tasks.find(task => task.text === taskValue);
  if (taskToUpdate) {
    taskToUpdate.completed = completed;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(filter) {
  const tasks = taskList.querySelectorAll('.todo-item');
  tasks.forEach(task => {
    switch (filter) {
      case 'all':
        task.style.display = 'flex';
        break;
      case 'completed':
        task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
        break;
      case 'active':
        task.style.display = !task.classList.contains('completed') ? 'flex' : 'none';
        break;
    }
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const filter = event.target.dataset.filter;
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filterTasks(filter);
  });
});

task.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTask();
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask();
});

// Export functions and constants
export {
  task,
  form,
  taskList,
  filterButtons,
  addTask,
  createTaskElement,
  saveTaskToLocalStorage,
  loadTasks,
  removeTaskFromLocalStorage,
  updateTaskInLocalStorage,
  filterTasks
};
