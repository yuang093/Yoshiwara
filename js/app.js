// ============================================
// 吉原泡泡浴名店指南 - App JS
// ============================================

const STORAGE_KEY = 'yoshiwara_shops_v1';

// Global state
let allShops = [];
let filtered = [];
let currentSort = { key: 'id', asc: true };
let currentFilters = { type: '', foreign: '', search: '' };
let currentShopId = null;

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  loadShops();
  bindEvents();
  render();
});

// ---- Data ----
function loadShops() {
  fetch('shops.json')
    .then(r => r.json())
    .then(data => {
      // Merge with localStorage overrides
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const overrides = JSON.parse(saved); // { id: { name, type, foreign, url, address, notes } }
          data = data.map(s => ({
            ...s,
            name: overrides[s.id]?.name ?? s.name,
            type: overrides[s.id]?.type ?? s.type,
            foreign: overrides[s.id]?.foreign ?? s.foreign,
            url: overrides[s.id]?.url ?? s.url,
            address: overrides[s.id]?.address ?? s.address,
            notes: overrides[s.id]?.notes ?? s.notes,
          }));
        } catch(e) { console.warn('localStorage parse error', e); }
      }
      allShops = data;
      filtered = [...allShops];
      render();
    })
    .catch(err => {
      console.error('Failed to load shops.json', err);
      document.getElementById('shop-tbody').innerHTML =
        '<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--red)">❌ 載入失敗，請確認 shops.json 存在</td></tr>';
    });
}

function saveOverrides(shop) {
  const saved = localStorage.getItem(STORAGE_KEY);
  const overrides = saved ? JSON.parse(saved) : {};
  overrides[shop.id] = {
    name: shop.name,
    url: shop.url,
    address: shop.address,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function getLocalOverrides(id) {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return {};
  try {
    return JSON.parse(saved)[id] || {};
  } catch { return {}; }
}

// ---- Events ----
function bindEvents() {
  const filterType = document.getElementById('filter-type');
  const filterForeign = document.getElementById('filter-foreign');
  const searchName = document.getElementById('search-name');
  const sortBy = document.getElementById('sort-by');
  const sortDir = document.getElementById('sort-dir');

  filterType.addEventListener('change', () => {
    currentFilters.type = filterType.value;
    applyFilters();
  });
  filterForeign.addEventListener('change', () => {
    currentFilters.foreign = filterForeign.value;
    applyFilters();
  });
  searchName.addEventListener('input', () => {
    currentFilters.search = searchName.value.trim().toLowerCase();
    applyFilters();
  });
  sortBy.addEventListener('change', () => {
    currentSort.key = sortBy.value;
    applyFilters();
  });
  sortDir.addEventListener('click', () => {
    currentSort.asc = !currentSort.asc;
    sortDir.textContent = currentSort.asc ? '▲' : '▼';
    applyFilters();
  });

  // Th click for column sort
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (currentSort.key === key) {
        currentSort.asc = !currentSort.asc;
      } else {
        currentSort.key = key;
        currentSort.asc = true;
      }
      document.getElementById('sort-by').value = key;
      sortDir.textContent = currentSort.asc ? '▲' : '▼';
      applyFilters();
    });
  });

  // Modal backdrop close
  document.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);

  // Enter key in modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

// ---- Filter & Sort ----
function applyFilters() {
  filtered = allShops.filter(s => {
    if (currentFilters.type && s.type !== currentFilters.type) return false;
    if (currentFilters.foreign && s.foreign !== currentFilters.foreign) return false;
    if (currentFilters.search && !s.name.toLowerCase().includes(currentFilters.search)) return false;
    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    let va = a[currentSort.key] ?? '';
    let vb = b[currentSort.key] ?? '';
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return currentSort.asc ? -1 : 1;
    if (va > vb) return currentSort.asc ? 1 : -1;
    return 0;
  });

  renderTable();
  updateCount();
  updateSortIndicators();
}

function updateSortIndicators() {
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc');
    if (th.dataset.sort === currentSort.key) {
      th.classList.add(currentSort.asc ? 'sort-asc' : 'sort-desc');
    }
  });
}

function updateCount() {
  const el = document.getElementById('result-count');
  const total = allShops.length;
  const shown = filtered.length;
  el.textContent = shown === total
    ? `共 ${total} 間店鋪`
    : `顯示 ${shown} / ${total} 間`;
}

// ---- Render ----
function render() {
  renderTable();
  updateCount();
}

function badgeClass(type) {
  if (type.includes('超高級')) return 'badge-super';
  if (type.includes('高級')) return 'badge-high';
  if (type.includes('大眾')) return 'badge-mid';
  if (type.includes('激安')) return 'badge-cheap';
  if (type.includes('閉店') || type.includes('歇業')) return 'badge-closed';
  if (type.includes('籌備')) return 'badge-prep';
  return 'badge-high';
}

function foreignClass(f) {
  if (f === '✅ 接待') return 'foreign-ok';
  if (f === '❌ 不接待') return 'foreign-no';
  if (f === '⚠️ 不建議') return 'foreign-avoid';
  return 'foreign-unknown';
}

function renderTable() {
  const tbody = document.getElementById('shop-tbody');
  const noResults = document.getElementById('no-results');

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  tbody.innerHTML = filtered.map(s => {
    const bc = badgeClass(s.type);
    const fc = foreignClass(s.foreign);
    const nameEsc = escapeHtml(s.name);
    return `<tr data-id="${s.id}">
      <td class="col-id">${s.id}</td>
      <td class="col-name">
        <span class="shop-name-link" onclick="openModal(${s.id})" title="點擊查看詳情">${nameEsc}</span>
      </td>
      <td class="col-type"><span class="badge ${bc}">${escapeHtml(s.type)}</span></td>
      <td class="col-foreign"><span class="${fc}">${s.foreign}</span></td>
      <td class="col-notes">${escapeHtml(s.notes)}</td>
    </tr>`;
  }).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---- Modal ----
function openModal(id) {
  const s = allShops.find(x => x.id === id);
  if (!s) return;
  currentShopId = id;

  document.getElementById('modal-title').textContent = s.name;
  document.getElementById('edit-name').value = s.name;
  document.getElementById('edit-type').value = s.type;
  document.getElementById('edit-foreign').value = s.foreign;
  document.getElementById('edit-url').value = s.url || '';
  document.getElementById('edit-address').value = s.address || '';
  document.getElementById('edit-notes').value = s.notes;

  document.getElementById('detail-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('detail-modal').style.display = 'none';
  currentShopId = null;
}

function saveShop() {
  if (!currentShopId) return;
  const name = document.getElementById('edit-name').value.trim();
  const type = document.getElementById('edit-type').value;
  const foreign = document.getElementById('edit-foreign').value;
  const url = document.getElementById('edit-url').value.trim();
  const address = document.getElementById('edit-address').value.trim();
  const notes = document.getElementById('edit-notes').value.trim();

  const s = allShops.find(x => x.id === currentShopId);
  if (!s) return;

  s.name = name || s.name;
  s.type = type;
  s.foreign = foreign;
  s.url = url;
  s.address = address;
  s.notes = notes;

  saveOverrides(s);

  // Update localStorage saved name for display
  const saved = localStorage.getItem(STORAGE_KEY);
  const overrides = saved ? JSON.parse(saved) : {};
  overrides[s.id] = { name: s.name, type: s.type, foreign: s.foreign, url: s.url, address: s.address, notes: s.notes };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));

  // Re-apply filter/sort
  applyFilters();
  closeModal();
  showToast('✅ 已儲存');
}

// ---- Toast ----
function showToast(msg, isError = false) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast' + (isError ? ' error' : '');
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}