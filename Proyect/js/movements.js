async function getTransferHistory() {
  const emailUser = localStorage.getItem('email');
  if (!emailUser) {
    console.error('No se encontró el email del usuario en localStorage');
    return null;
  }

  try {
    const response = await fetch(`http://localhost:3000/transfer/history/${emailUser}`);
    if (!response.ok) {
      throw new Error('Error al obtener el historial de transferencias');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


function displaySingleTransfer(transfer) {
  const transferHistoryElement = document.getElementById('singleTransferHistory');

  transferHistoryElement.innerHTML = '';  
  if (!transfer) {
    transferHistoryElement.innerHTML = '<img src="images/transactions2.png" alt="No hay transferencias" class="no-transfers-image" />';
    return;
  }

  const transferElement = document.createElement('div');
  transferElement.className = 'container3-1';
  transferElement.innerHTML = `
    <div class="img-card">
      <img src="images/flechita.png" alt="img" class="img-1">
    </div>
    <div class="content-card">
      <p class="title-card">${transfer.messageTransfer}</p>
      <p class="date">${new Date(transfer.dateTransfer).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}</p>
    </div>
    <div class="amount">
      <p class="amount1">$${transfer.amountTransfer}</p>
    </div>
  `;
  transferHistoryElement.appendChild(transferElement);
}


async function loadSingleTransfer() {
  const transfers = await getTransferHistory();
  if (transfers && transfers.length > 0) {
    displaySingleTransfer(transfers[0]);  
  } else {
    displaySingleTransfer(null);  
  }
}


function displayTransfers(transfers) {
  const transferHistoryElement = document.getElementById('transferHistory');
  transferHistoryElement.innerHTML = '';  

  if (!transfers || transfers.length === 0) {
    transferHistoryElement.innerHTML = '<img src="images/transactions.png" alt="No hay transferencias" class="no-transfers-image" />';
    return;
  }

  transfers.forEach(transfer => {
    const transferElement = document.createElement('div');
    transferElement.className = 'container3-1';
    transferElement.innerHTML = `
      <div class="img-card">
        <img src="images/flechita.png" alt="img" class="img-1">
      </div>
      <div class="content-card">
        <p class="message">${transfer.messageTransfer}</p>
        <p class="date">${new Date(transfer.dateTransfer).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}</p>
      </div>
      <div class="amount">
        <p class="amount1">$${transfer.amountTransfer}</p>
      </div>
    `;
    transferHistoryElement.appendChild(transferElement);
  });
}

async function loadTransferHistory() {
  const transfers = await getTransferHistory();
  displayTransfers(transfers);  
}


document.addEventListener('DOMContentLoaded', loadSingleTransfer);  


document.addEventListener('DOMContentLoaded', loadTransferHistory);  

const usernameElement = document.querySelector('.cta1');
if (usernameElement) {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        usernameElement.textContent = savedUsername;
    }
}
