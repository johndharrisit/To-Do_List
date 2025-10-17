document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const totalTasks = document.getElementById('totalTasks');
    const completedTasks = document.getElementById('completedTasks');
    const fileInput = document.getElementById('fileInput');
    const backgroundImage = document.getElementById('backgroundImage');
    const blurRange = document.getElementById('blurRange');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Функция для обновления статистики
    function updateStats() {
        totalTasks.textContent = tasks.length;
        completedTasks.textContent = tasks.filter(task => task.completed).length;
    }
    
    // Функция для сохранения задач в localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateStats();
    }
    
    // Функция для отображения задач
    function renderTasks() {
        taskList.innerHTML = '';
        
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            if (task.completed) {
                li.classList.add('completed');
            }
            
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <button class="complete-btn">${task.completed ? 'Отменить' : 'Выполнено'}</button>
                <button class="delete-btn">Удалить</button>
            `;
            
            // Обработчик для кнопки выполнения
            li.querySelector('.complete-btn').addEventListener('click', function() {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });
            
            // Обработчик для кнопки удаления
            li.querySelector('.delete-btn').addEventListener('click', function() {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
            
            taskList.appendChild(li);
        });
        
        updateStats();
    }
    
    // Функция для добавления новой задачи
    function addTask() {
        const text = taskInput.value.trim();
        if (text !== '') {
            tasks.push({
                text: text,
                completed: false
            });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }
    
    // Обработчик для кнопки добавления
    addBtn.addEventListener('click', addTask);
    
    // Обработчик для клавиши Enter
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Обработчик для загрузки изображения
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                backgroundImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Обработчик для изменения размытия
    blurRange.addEventListener('input', function() {
        backgroundImage.style.filter = `blur(${blurRange.value}px)`;
    });
    
    // Инициализация приложения
    renderTasks();
});