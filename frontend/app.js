const API_URL = "/api";

async function fetchTasks() {
  try {
    const res = await fetch(`${API_URL}/tasks`);

    if (!res.ok) {
      throw new Error(`Failed to fetch tasks: ${res.status}`);
    }

    const data = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    data.forEach(task => {
      const li = document.createElement("li");
      li.innerText = task.title;
      list.appendChild(li);
    });

  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

async function addTask() {
  const input = document.getElementById("taskInput");

  if (!input.value.trim()) return;

  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: input.value })
    });

    if (!res.ok) {
      throw new Error(`Failed to add task: ${res.status}`);
    }

    input.value = "";
    fetchTasks();

  } catch (err) {
    console.error("Error adding task:", err);
  }
}

fetchTasks();
