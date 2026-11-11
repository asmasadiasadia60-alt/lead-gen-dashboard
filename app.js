// ============================================================
// LeadGen Dashboard - Application Logic
// ============================================================

// 5 Initial Sample Leads as requested
const DEFAULT_SAMPLE_LEADS = [
  {
    id: "lead-1",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@acmecorp.com",
    status: "Qualified"
  },
  {
    id: "lead-2",
    name: "Alex Rivera",
    email: "alex.rivera@techflow.io",
    status: "Contacted"
  },
  {
    id: "lead-3",
    name: "Priya Sharma",
    email: "priya.sharma@innovate.co",
    status: "New"
  },
  {
    id: "lead-4",
    name: "Michael Chen",
    email: "m.chen@nexusmedia.com",
    status: "Proposal"
  },
  {
    id: "lead-5",
    name: "Fatima Zahra",
    email: "fatima.z@cloudscale.net",
    status: "Lost"
  }
];

const STORAGE_KEY = "leadgen_dashboard_leads_v1";

// Application State
let leads = loadLeads();
let searchTerm = "";
let selectedStatus = "All";

// DOM Elements
const leadsTableBody = document.getElementById("leadsTableBody");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const statusFilter = document.getElementById("statusFilter");
const resultsCount = document.getElementById("resultsCount");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const resetDataBtn = document.getElementById("resetDataBtn");

// Modal Elements
const leadModal = document.getElementById("leadModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const addLeadForm = document.getElementById("addLeadForm");

// Stat Elements
const statTotal = document.getElementById("statTotal");
const statNew = document.getElementById("statNew");
const statContacted = document.getElementById("statContacted");
const statQualified = document.getElementById("statQualified");
const statProposal = document.getElementById("statProposal");
const statLost = document.getElementById("statLost");
const statCards = document.querySelectorAll(".stat-card");

// Avatar color palettes
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #6366f1, #8b5cf6)",
  "linear-gradient(135deg, #0ea5e9, #2563eb)",
  "linear-gradient(135deg, #10b981, #059669)",
  "linear-gradient(135deg, #f59e0b, #d97706)",
  "linear-gradient(135deg, #ec4899, #be185d)",
  "linear-gradient(135deg, #8b5cf6, #6d28d9)",
  "linear-gradient(135deg, #14b8a6, #0f766e)"
];

function getAvatarGradient(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}

function getInitials(name) {
  if (!name) return "L";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Data persistence
function loadLeads() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not read from localStorage:", err);
  }
  return [...DEFAULT_SAMPLE_LEADS];
}

function saveLeads() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.warn("Could not save to localStorage:", err);
  }
}

// Render Table & Metrics
function render() {
  updateStats();

  const filtered = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      selectedStatus === "All" || lead.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Update counter
  resultsCount.innerHTML = `Showing <strong>${filtered.length}</strong> of ${leads.length} leads`;

  // Update stat cards highlight
  statCards.forEach(card => {
    if (card.dataset.stat === selectedStatus) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  if (filtered.length === 0) {
    leadsTableBody.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  leadsTableBody.innerHTML = filtered.map((lead, index) => {
    const statusClass = `status-${lead.status.toLowerCase().replace(/\s+/g, "-")}`;
    const initials = getInitials(lead.name);
    const avatarBg = getAvatarGradient(lead.name);

    return `
      <tr data-id="${escapeHtml(lead.id)}">
        <td class="row-index">${index + 1}</td>
        <td>
          <div class="lead-info">
            <div class="avatar" style="background: ${avatarBg}">${initials}</div>
            <div class="lead-name">${escapeHtml(lead.name)}</div>
          </div>
        </td>
        <td>
          <a class="lead-email" href="mailto:${escapeHtml(lead.email)}">
            ${escapeHtml(lead.email)}
          </a>
        </td>
        <td>
          <span class="status-badge ${statusClass}">
            ${escapeHtml(lead.status)}
          </span>
        </td>
        <td style="text-align: right;">
          <button class="btn-danger-ghost delete-lead-btn" data-id="${escapeHtml(lead.id)}" title="Delete lead">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </td>
      </tr>
    `;
  }).join("");

  // Attach delete handlers
  document.querySelectorAll(".delete-lead-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      deleteLead(id);
    });
  });
}

function updateStats() {
  statTotal.textContent = leads.length;
  statNew.textContent = leads.filter(l => l.status === "New").length;
  statContacted.textContent = leads.filter(l => l.status === "Contacted").length;
  statQualified.textContent = leads.filter(l => l.status === "Qualified").length;
  statProposal.textContent = leads.filter(l => l.status === "Proposal").length;
  statLost.textContent = leads.filter(l => l.status === "Lost").length;
}

function deleteLead(id) {
  leads = leads.filter(l => l.id !== id);
  saveLeads();
  render();
}

function addLead(name, email, status) {
  const newLead = {
    id: "lead-" + Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    status
  };
  leads.unshift(newLead);
  saveLeads();
  render();
}

function resetToSamples() {
  if (confirm("Reset to the default 5 sample leads? Any added leads will be replaced.")) {
    leads = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_LEADS));
    saveLeads();
    searchTerm = "";
    selectedStatus = "All";
    searchInput.value = "";
    statusFilter.value = "All";
    clearSearchBtn.style.display = "none";
    render();
  }
}

// XSS Sanitizer Helper
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Event Listeners
searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  clearSearchBtn.style.display = searchTerm.length > 0 ? "block" : "none";
  render();
});

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchTerm = "";
  clearSearchBtn.style.display = "none";
  searchInput.focus();
  render();
});

statusFilter.addEventListener("change", (e) => {
  selectedStatus = e.target.value;
  render();
});

resetFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchTerm = "";
  clearSearchBtn.style.display = "none";
  statusFilter.value = "All";
  selectedStatus = "All";
  render();
});

resetDataBtn.addEventListener("click", resetToSamples);

// Quick filter clicking on stat cards
statCards.forEach(card => {
  card.addEventListener("click", () => {
    const stat = card.dataset.stat;
    selectedStatus = stat;
    statusFilter.value = stat;
    render();
  });
});

// Modal Logic
function openModal() {
  leadModal.style.display = "flex";
  document.getElementById("leadName").focus();
}

function closeModal() {
  leadModal.style.display = "none";
  addLeadForm.reset();
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
cancelModalBtn.addEventListener("click", closeModal);

// Close modal when clicking on backdrop
leadModal.addEventListener("click", (e) => {
  if (e.target === leadModal) {
    closeModal();
  }
});

// ESC key to close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && leadModal.style.display === "flex") {
    closeModal();
  }
});

addLeadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("leadName").value;
  const email = document.getElementById("leadEmail").value;
  const status = document.getElementById("leadStatus").value;

  if (!name || !email) return;

  addLead(name, email, status);
  closeModal();
});

// Initial Render
render();

