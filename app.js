const STORAGE_KEY = 'carve-chief-of-staff-dashboard-v1';

function loadSeedData() {
  return JSON.parse(document.getElementById('seed-data').textContent);
}

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : loadSeedData();
}

function saveData() {
  state.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function titleCase(value) {
  return value.replaceAll('_', ' ').replace(/\b\w/g, s => s.toUpperCase());
}

function countByStatus(tasks, status) {
  return tasks.filter(task => task.status === status).length;
}

function getAgent(agentId) {
  return state.agents.find(agent => agent.id === agentId);
}

function renderStats() {
  const tasks = state.tasks;
  const stats = [
    { label: 'Open tasks', value: tasks.filter(t => t.status !== 'done').length },
    { label: 'In progress', value: countByStatus(tasks, 'in_progress') },
    { label: 'Blocked', value: countByStatus(tasks, 'blocked') },
    { label: 'Agents active', value: state.agents.filter(a => a.status !== 'offline').length }
  ];

  document.getElementById('stats').innerHTML = stats.map(stat => `
    <article class="stat-card">
      <p class="stat-label">${stat.label}</p>
      <h2>${stat.value}</h2>
    </article>
  `).join('');
}

function renderFilters() {
  const statusFilter = document.getElementById('status-filter');
  const agentFilter = document.getElementById('agent-filter');
  const assignedTo = document.getElementById('assigned-to');

  const statuses = ['ready', 'in_progress', 'blocked', 'done'];
  statusFilter.innerHTML = '<option value="all">All statuses</option>' + statuses.map(status => `<option value="${status}">${titleCase(status)}</option>`).join('');

  const agentOptions = state.agents.map(agent => `<option value="${agent.id}">${agent.emoji} ${agent.name}</option>`).join('');
  agentFilter.innerHTML = '<option value="all">All assignees</option>' + agentOptions;
  assignedTo.innerHTML = agentOptions;

  statusFilter.value = filters.status;
  agentFilter.value = filters.agent;
  assignedTo.value = state.agents[0].id;
}

function taskMatchesFilters(task) {
  if (filters.status !== 'all' && task.status !== filters.status) return false;
  if (filters.agent !== 'all' && task.assignedTo !== filters.agent) return false;
  return true;
}

function renderTasks() {
  const list = document.getElementById('task-list');
  const tasks = state.tasks.filter(taskMatchesFilters);

  if (!tasks.length) {
    list.innerHTML = '<div class="empty-state panel">No tasks match the current filters.</div>';
    return;
  }

  list.innerHTML = tasks.map(task => {
    const agent = getAgent(task.assignedTo);
    return `
      <article class="task-card panel">
        <div class="task-topline">
          <div>
            <p class="task-id">${task.id}</p>
            <h3>${task.title}</h3>
          </div>
          <div class="pill-row">
            <span class="pill pill-${task.priority}">${titleCase(task.priority)}</span>
            <span class="pill pill-${task.status}">${titleCase(task.status)}</span>
          </div>
        </div>
        <p>${task.description || ''}</p>
        <div class="meta-grid">
          <div>
            <p class="detail-label">Assigned to</p>
            <p>${agent ? `${agent.emoji} ${agent.name}` : task.assignedTo}</p>
          </div>
          <div>
            <p class="detail-label">Owner</p>
            <p>${task.owner}</p>
          </div>
          <div>
            <p class="detail-label">Due</p>
            <p>${task.due || '—'}</p>
          </div>
        </div>
        <div class="next-action-box">
          <p class="detail-label">Next action</p>
          <p>${task.nextAction || '—'}</p>
        </div>
        <div class="task-actions">
          <button class="button button-secondary" data-action="advance" data-task-id="${task.id}">Advance status</button>
          <button class="button button-secondary" data-action="delete" data-task-id="${task.id}">Delete</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderAgents() {
  const grid = document.getElementById('agent-grid');
  grid.innerHTML = state.agents.map(agent => {
    const workload = state.tasks.filter(task => task.assignedTo === agent.id && task.status !== 'done').length;
    return `
      <article class="agent-card">
        <div class="agent-head">
          <div>
            <p class="agent-kicker">${titleCase(agent.status)}</p>
            <h3>${agent.emoji} ${agent.name}</h3>
            <p class="agent-title">${agent.title}</p>
          </div>
          <span class="pill pill-${agent.status}">${titleCase(agent.status)}</span>
        </div>
        <p>${agent.focus}</p>
        <div class="meta-grid compact-meta">
          <div>
            <p class="detail-label">Capacity</p>
            <p>${titleCase(agent.capacity)}</p>
          </div>
          <div>
            <p class="detail-label">Open tasks</p>
            <p>${workload}</p>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderLinks() {
  document.getElementById('local-url').textContent = window.location.href;
}

function renderAll() {
  renderStats();
  renderFilters();
  renderTasks();
  renderAgents();
  renderLinks();
}

function nextTaskId() {
  const nums = state.tasks.map(task => Number(task.id.replace('T-', '')) || 0);
  return `T-${String(Math.max(0, ...nums) + 1).padStart(3, '0')}`;
}

function advanceStatus(taskId) {
  const order = ['ready', 'in_progress', 'blocked', 'done'];
  const task = state.tasks.find(item => item.id === taskId);
  if (!task) return;
  const index = order.indexOf(task.status);
  task.status = order[(index + 1) % order.length];
  saveData();
  renderAll();
}

function deleteTask(taskId) {
  state.tasks = state.tasks.filter(task => task.id !== taskId);
  saveData();
  renderAll();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'carve-dashboard-data.json';
  link.click();
  URL.revokeObjectURL(url);
}

const state = loadData();
const filters = { status: 'all', agent: 'all' };

renderAll();

document.getElementById('status-filter').addEventListener('change', event => {
  filters.status = event.target.value;
  renderTasks();
});

document.getElementById('agent-filter').addEventListener('change', event => {
  filters.agent = event.target.value;
  renderTasks();
});

document.getElementById('task-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.target);
  state.tasks.unshift({
    id: nextTaskId(),
    title: form.get('title'),
    description: form.get('description'),
    priority: form.get('priority'),
    status: form.get('status'),
    assignedTo: form.get('assignedTo'),
    owner: 'Carve',
    nextAction: form.get('nextAction'),
    due: form.get('due'),
    tags: []
  });
  saveData();
  event.target.reset();
  renderAll();
});

document.getElementById('task-list').addEventListener('click', event => {
  const button = event.target.closest('button[data-task-id]');
  if (!button) return;
  const taskId = button.dataset.taskId;
  if (button.dataset.action === 'advance') advanceStatus(taskId);
  if (button.dataset.action === 'delete') deleteTask(taskId);
});

document.getElementById('reset-data').addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
});

document.getElementById('export-data').addEventListener('click', exportData);
