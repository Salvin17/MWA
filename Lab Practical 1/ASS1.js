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
