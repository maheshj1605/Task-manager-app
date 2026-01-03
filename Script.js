const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];

// Add Task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    tasks.push({
        text: taskText,
        completed: false
    });

    taskInput.value = "";
    renderTasks("all");
});

// Render Tasks
function renderTasks(filter) {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (
            filter === "completed" && !task.completed ||
            filter === "pending" && task.completed
        ) {
            return;
        }

        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;

        const span = document.createElement("span");
        span.textContent = task.text;
        span.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            renderTasks(filter);
        });

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            renderTasks(filter);
        });

        actions.appendChild(deleteBtn);
        li.appendChild(span);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
}

// Filter Tasks
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");
        renderTasks(btn.dataset.filter);
    });
});
