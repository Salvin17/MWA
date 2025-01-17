# MWA
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elegant To-Do List</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  <style>
    /* Reset and Fonts */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Roboto', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: var(--bg-color);
      color: var(--text-color);
      transition: all 0.3s ease-in-out;
    }

    :root {
      --bg-color: #f8f9fa;
      --text-color: #343a40;
      --primary-color: #6c757d;
      --accent-color: #007bff;
      --card-bg: #ffffff;
      --button-bg: #007bff;
      --button-hover: #0056b3;
      --delete-bg: #dc3545;
      --delete-hover: #c82333;
    }

    [data-theme="dark"] {
      --bg-color: #212529;
      --text-color: #f8f9fa;
      --card-bg: #343a40;
      --button-bg: #17a2b8;
      --button-hover: #138496;
    }

    .container {
      width: 100%;
      max-width: 600px;
      background: var(--card-bg);
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    h1 {
      font-size: 2rem;
      color: var(--accent-color);
      text-align: center;
      margin-bottom: 20px;
    }

    .controls {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    input[type="text"], select {
      flex: 1;
      padding: 10px;
      font-size: 1rem;
      border: 2px solid #ced4da;
      border-radius: 8px;
      background: #f8f9fa;
      transition: border-color 0.3s;
    }

    input[type="text"]:focus {
      border-color: var(--accent-color);
    }

    button {
      padding: 10px 15px;
      background: var(--button-bg);
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      background: var(--button-hover);
    }

    ul {
      list-style: none;
      margin-top: 10px;
    }

    li {
      background: #f8f9fa;
      margin-bottom: 10px;
      border-radius: 8px;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, background 0.3s;
    }

    li:hover {
      transform: translateY(-2px);
      background: var(--card-bg);
    }

    .priority {
      padding: 5px 10px;
      font-size: 0.8rem;
      border-radius: 12px;
      text-transform: uppercase;
    }

    .priority.high {
      background: #dc3545;
      color: #fff;
    }

    .priority.medium {
      background: #ffc107;
      color: #212529;
    }

    .priority.low {
      background: #28a745;
      color: #fff;
    }

    .delete-btn {
      background: var(--delete-bg);
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 8px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.3s;
    }

    .delete-btn:hover {
      background: var(--delete-hover);
    }

    .theme-toggle {
      text-align: center;
      margin-top: 20px;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--primary-color);
      transition: color 0.3s;
    }

    .theme-toggle:hover {
      color: var(--accent-color);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Elegant To-Do List</h1>
    <div class="controls">
      <input type="text" id="taskInput" placeholder="Enter a task">
      <select id="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onclick="addTask()">Add</button>
    </div>
    <ul id="taskList"></ul>
    <div class="theme-toggle" onclick="toggleTheme()">
      <i class="fas fa-adjust"></i>
    </div>
  </div>

  <script>
    const taskList = document.getElementById("taskList");
    let tasksXML = `<?xml version="1.0" encoding="UTF-8"?><tasks></tasks>`;
    
    function parseXML(xmlStr) {
      return new DOMParser().parseFromString(xmlStr, "application/xml");
    }

    function serializeXML(xmlObj) {
      return new XMLSerializer().serializeToString(xmlObj);
    }

    function addTask() {
      const taskInput = document.getElementById("taskInput");
      const priority = document.getElementById("priority").value;
      const taskText = taskInput.value.trim();
      
      if (!taskText) return alert("Please enter a task!");

      const xmlDoc = parseXML(tasksXML);
      const newTask = xmlDoc.createElement("task");
      newTask.setAttribute("priority", priority);
      newTask.textContent = taskText;
      xmlDoc.documentElement.appendChild(newTask);
      tasksXML = serializeXML(xmlDoc);
      
      taskInput.value = "";
      displayTasks();
    }

    function displayTasks() {
      const xmlDoc = parseXML(tasksXML);
      const tasks = xmlDoc.getElementsByTagName("task");
      taskList.innerHTML = "";
      
      Array.from(tasks).forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.textContent;

        const priority = task.getAttribute("priority");
        const prioritySpan = document.createElement("span");
        prioritySpan.textContent = priority;
        prioritySpan.classList.add("priority", priority);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(prioritySpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    }

    function deleteTask(index) {
      const xmlDoc = parseXML(tasksXML);
      const tasks = xmlDoc.getElementsByTagName("task");
      const taskToDelete = tasks[index];
      taskToDelete.parentNode.removeChild(taskToDelete); // Remove task
      tasksXML = serializeXML(xmlDoc); // Update XML
      displayTasks(); // Refresh list
    }

    function toggleTheme() {
      document.body.dataset.theme = document.body.dataset.theme === "dark" ? "" : "dark";
    }

    displayTasks();
  </script>
</body>
</html>
