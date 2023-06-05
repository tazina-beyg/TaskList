document.addEventListener("DOMContentLoaded", function () {
  // Get the task form and task list elements
  const taskForm = document.getElementById("task-form");
  const taskList = document.querySelector(".collection");
  const taskInput = document.getElementById("task");

  // Load event listeners
  loadEventListeners();
  getTasks(); // Retrieve tasks from local storage on DOM load

  function loadEventListeners() {
    taskForm.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    filter.addEventListener("keyup", filterTasks);
  }

  function addTask(e) {
    e.preventDefault(); // Prevent default form submission

    // Get the task input value
    const taskText = taskInput.value;

    if (taskText.trim() === "") {
      alert("Please enter a task!");
      return;
    }

    // Create a new list item
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskText));
    li.style.border = "1px solid lightgray";
    li.style.padding = "8px";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";

    // Create a remove button for the list item
    const removeBtn = document.createElement("a");
    removeBtn.className = "delete-item";
    removeBtn.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(removeBtn);

    // Append the new list item to the task list
    taskList.appendChild(li);

    // Store the task in local storage
    storeTaskInLocalStorage(taskText);

    // Clear the task input value
    taskInput.value = "";
  }

  function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
      if (confirm("Are you sure you want to delete this task?")) {
        e.target.parentElement.parentElement.remove();
        // Remove task from local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
    }
  }

  function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function (task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) !== -1) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
  }

  function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(task));
      li.style.border = "1px solid lightgray";
      li.style.padding = "8px";
      li.style.display = "flex";
      li.style.justifyContent = "space-between";

      const removeBtn = document.createElement("a");
      removeBtn.className = "delete-item";
      removeBtn.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(removeBtn);

      taskList.appendChild(li);
    });
  }

  function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task, index) {
      if (taskItem.textContent === task) {
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add event listener for clearing all tasks
  const clearBtn = document.querySelector(".clear-tasks");
  clearBtn.addEventListener("click", function () {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    // Clear tasks from local storage
    localStorage.removeItem("tasks");
  });
});
