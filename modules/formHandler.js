import { addTask } from './taskManager.js';

const todoForm = document.getElementById('todo-form');
const newTaskInput = document.getElementById('new-task');

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = newTaskInput.value.trim();
  if (newTask) {
    addTask(newTask);
    Swal.fire({
      title: 'Tugas Ditambahkan!',
      text: `Kamu telah menambahkan tugas baru: "${newTask}"`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
    newTaskInput.value = '';
  }
});
