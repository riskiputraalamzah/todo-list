import { addTask, filterTasks } from './todoFunctions.js';

document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('new-task');
  const taskList = document.getElementById('todo-list');
  const todoForm = document.getElementById('todo-form');

  // Event listener untuk menambah task baru
  todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = taskInput.value;
    if (task) {
      addTask(task, taskList);
      taskInput.value = ''; // Reset input
    }
  });

  // Filter tasks berdasarkan status
  document.getElementById('all').addEventListener('click', () => filterTasks('all', taskList));
  document.getElementById('completed').addEventListener('click', () => filterTasks('completed', taskList));
  document.getElementById('pending').addEventListener('click', () => filterTasks('pending', taskList));
});
