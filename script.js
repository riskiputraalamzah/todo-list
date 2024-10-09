document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const newTaskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');

    function createTaskElement(taskText) {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = taskText;

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Done';
        toggleButton.classList.add('toggle-btn');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');

        li.appendChild(span);
        li.appendChild(toggleButton);
        li.appendChild(deleteButton);

        toggleButton.addEventListener('click', () => {
            span.classList.toggle('completed');
            if (span.classList.contains('completed')) {
                toggleButton.textContent = 'Undo';
            } else {
                toggleButton.textContent = 'Done';
            }
        });

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
                    Swal.fire(
                        'Deleted!',
                        'Your task has been deleted.',
                        'success'
                    );
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    Swal.fire(
                        'Cancelled',
                        'Your task is safe :)',
                        'error'
                    );
                }
            });
        });

        return li;
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const newTask = createTaskElement(taskText);
            todoList.appendChild(newTask);
            newTaskInput.value = '';

            Swal.fire({
                icon: 'success',
                title: 'Task added!',
                text: `Your task "${taskText}" has been added to the list.`,
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
});