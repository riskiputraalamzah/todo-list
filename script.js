// Get references to DOM elements
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const newTaskInput = document.getElementById('new-task');

// Event listener for the form submission
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const taskText = newTaskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task'); 
    return;
  }


  const listItem = document.createElement('li');
  listItem.textContent = taskText;


  const removeButton = document.createElement('button');
  removeButton.textContent = 'Hapusssssssssssssssssss';
  removeButton.classList.add('remove-task');
  

  listItem.appendChild(removeButton);


  todoList.appendChild(listItem);


  newTaskInput.value = '';


  removeButton.addEventListener('click', function() {
    todoList.removeChild(listItem); 
  });
});
