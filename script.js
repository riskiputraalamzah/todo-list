document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
    const filter = document.getElementById('filter');

    // Mendapatkan elemen untuk fitur modulus
    const calculateModulusButton = document.getElementById('calculate-modulus');
    const number1Input = document.getElementById('number1');
    const number2Input = document.getElementById('number2');
    const modulusResult = document.getElementById('modulus-result');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = input.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            input.value = '';
        }
    });

    todoList.addEventListener('click', (event) => {
        if (event.target.classList.contains('complete-btn')) {
            toggleTaskCompletion(event.target.parentElement);
        } else if (event.target.classList.contains('delete-btn')) {
            deleteTask(event.target.parentElement);
        }
    });

    filter.addEventListener('change', () => {
        filterTasks(filter.value);
    });

    // Event listener untuk tombol calculate modulus
    calculateModulusButton.addEventListener('click', () => {
        const num1 = parseInt(number1Input.value);
        const num2 = parseInt(number2Input.value);
        if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
            const result = num1 % num2;
            modulusResult.textContent = `The modulus of ${num1} % ${num2} is: ${result}`;
        } else {
            modulusResult.textContent = 'Please enter valid numbers, and make sure the second number is not zero.';
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        li.appendChild(createButton('Complete', 'complete-btn'));
        li.appendChild(createButton('Delete', 'delete-btn'));
        todoList.appendChild(li);
    }

    function createButton(text, className) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = 'task-button ' + className;
        return button;
    }

    function toggleTaskCompletion(task) {
        task.classList.toggle('completed');
    }

    function deleteTask(task) {
        task.remove();
    }

    function filterTasks(filterValue) {
        const tasks = Array.from(todoList.children);
        tasks.forEach((task) => {
            switch (filterValue) {
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
});
