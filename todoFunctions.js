// Fungsi untuk menambahkan task
export function addTask(task, taskList) {
    const li = document.createElement('li');
    li.textContent = task;
    li.addEventListener('click', () => li.classList.toggle('completed'));
    taskList.appendChild(li);
  }
  
  // Fungsi untuk filter task
  export function filterTasks(status, taskList) {
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach(task => {
      switch (status) {
        case 'all':
          task.style.display = 'block';
          break;
        case 'completed':
          task.style.display = task.classList.contains('completed') ? 'block' : 'none';
          break;
        case 'pending':
          task.style.display = !task.classList.contains('completed') ? 'block' : 'none';
          break;
      }
    });
  }
  