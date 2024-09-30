// Add task function with due date
function addTask(description, priority, dueDate) {
    const taskList = document.getElementById('task-list');
  
    // Create task elements
    const li = document.createElement('li');
    li.classList.add(priority.toLowerCase());
  
    // Create a due date warning for overdue tasks
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const isOverdue = taskDueDate < currentDate && dueDate !== ''; 
  
    if (isOverdue) {
      li.classList.add('overdue');
    }
  
    li.innerHTML = `
      <span>${description} - ${priority} priority</span>
      <span>Due: ${dueDate ? dueDate : 'No due date'}</span>
      <div>
        <button class="complete-btn">Complete</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
  
    // Add event listeners for buttons
    li.querySelector('.complete-btn').addEventListener('click', () => {
      li.classList.toggle('complete');
      saveTasks();
    });
  
    li.querySelector('.delete-btn').addEventListener('click', () => {
      taskList.removeChild(li);
      saveTasks();
    });
  
    taskList.appendChild(li);
    saveTasks();
  }
  
  // Save tasks to local storage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach((task) => {
      tasks.push({
        description: task.querySelector('span').textContent,
        className: task.className,
        dueDate: task.querySelectorAll('span')[1].textContent.split(': ')[1]
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Load tasks from local storage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      tasks.forEach((task) => {
        const taskList = document.getElementById('task-list');
        const li = document.createElement('li');
        li.className = task.className;
        li.innerHTML = `
          <span>${task.description}</span>
          <span>Due: ${task.dueDate}</span>
          <div>
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
          </div>
        `;
        li.querySelector('.complete-btn').addEventListener('click', () => {
          li.classList.toggle('complete');
          saveTasks();
        });
        li.querySelector('.delete-btn').addEventListener('click', () => {
          taskList.removeChild(li);
          saveTasks();
        });
        taskList.appendChild(li);
      });
    }
  }
  
  // Event listener for adding tasks
  document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskDescription = document.getElementById('task-input').value;
    const taskPriority = document.getElementById('priority-select').value;
    const taskDueDate = document.getElementById('due-date-input').value;
  
    if (taskDescription !== '') {
      addTask(taskDescription, taskPriority, taskDueDate);
      document.getElementById('task-input').value = '';
      document.getElementById('due-date-input').value = ''; // Clear the due date input
    }
  });
  
  // Load tasks on page load
  window.onload = function () {
    loadTasks();
  };
