class TodoApp {
  constructor() {
    // Menangkap elemen form dan daftar to-do dari DOM
    this.todoForm = document.getElementById('todo-form');
    this.todoList = document.getElementById('todo-list');
    this.newTaskInput = document.getElementById('new-task');

    // Tombol filter
    this.allTasksBtn = document.getElementById('all-tasks');
    this.activeTasksBtn = document.getElementById('active-tasks');
    this.completedTasksBtn = document.getElementById('completed-tasks');

    // Initializing events
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => this.loadTasksFromLocalStorage());
    this.todoForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    this.allTasksBtn.addEventListener('click', () => this.filterTasks('all'));
    this.activeTasksBtn.addEventListener('click', () => this.filterTasks('active'));
    this.completedTasksBtn.addEventListener('click', () => this.filterTasks('completed'));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const taskText = this.newTaskInput.value;

    if (taskText !== '') {
      this.addTaskToDOM(taskText);
      this.saveTaskToLocalStorage(taskText);
      this.newTaskInput.value = ''; // Reset input setelah menambahkan tugas
    }
  }

  addTaskToDOM(taskText, isCompleted = false) {
    const newTask = document.createElement('li');
    newTask.classList.add('todo-item');

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;

    if (isCompleted) {
      taskContent.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('remove-btn');

    taskContent.addEventListener('click', () => {
      taskContent.classList.toggle('completed');
      this.updateTaskStatusInLocalStorage(taskText);
    });

    deleteButton.addEventListener('click', () => {
      newTask.remove();
      this.removeTaskFromLocalStorage(taskText);
    });

    newTask.appendChild(taskContent);
    newTask.appendChild(deleteButton);
    this.todoList.appendChild(newTask);
  }

  saveTaskToLocalStorage(taskText) {
    let tasks = this.getTasksFromLocalStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  loadTasksFromLocalStorage() {
    let tasks = this.getTasksFromLocalStorage();
    tasks.forEach((task) => this.addTaskToDOM(task.text, task.completed));
  }

  getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  updateTaskStatusInLocalStorage(taskText) {
    let tasks = this.getTasksFromLocalStorage();
    tasks.forEach((task) => {
      if (task.text === taskText) {
        task.completed = !task.completed;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  removeTaskFromLocalStorage(taskText) {
    let tasks = this.getTasksFromLocalStorage();
    tasks = tasks.filter((task) => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  filterTasks(filter) {
    const tasks = document.querySelectorAll('.todo-item');

    tasks.forEach((task) => {
      const taskContent = task.querySelector('span');

      switch (filter) {
        case 'all':
          task.style.display = 'flex';
          break;
        case 'active':
          task.style.display = taskContent.classList.contains('completed') ? 'none' : 'flex';
          break;
        case 'completed':
          task.style.display = taskContent.classList.contains('completed') ? 'flex' : 'none';
          break;
      }
    });
  }
}

// Menginisialisasi aplikasi
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});
