async function loadPatients() {
  const grid = document.getElementById('patientsGrid');

  try {
    const res = await fetch('/emergency/patients');
    const patients = await res.json();

    grid.innerHTML = patients.map(p => `
      <div class="patient-card" onclick="generateQR('${p._id}', '${p.name}')">
        <div class="patient-icon">🏥</div>
        <div class="patient-name">${p.name}</div>
        <div class="patient-action">Tap to generate QR →</div>
      </div>
    `).join('');

  } catch (error) {
    grid.innerHTML = '<p style="color:#555">Failed to load patients.</p>';
  }
}

async function generateQR(id, name) {
  const overlay = document.getElementById('modalOverlay');
  const qrImage = document.getElementById('qrImage');
  const downloadBtn = document.getElementById('downloadBtn');
  const viewPageBtn = document.getElementById('viewPageBtn');
  const modalName = document.getElementById('modalName');

  modalName.textContent = name;
  qrImage.src = '';
  overlay.style.display = 'flex';

  try {
    const res = await fetch(`/emergency/qr/${id}`);
    const data = await res.json();

    qrImage.src = data.qr;
    downloadBtn.href = data.qr;
    downloadBtn.download = `GoldenHourID-${name}.png`;
    viewPageBtn.href = data.url;

  } catch (error) {
    qrImage.alt = 'Failed to generate QR code';
  }
}

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('modalOverlay').style.display = 'none';
});

document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modalOverlay')) {
    document.getElementById('modalOverlay').style.display = 'none';
  }
});

loadPatients();