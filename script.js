const items = [
    "AUTOBUS 45 PLAZAS", "CAMIONETA CARGA", "CAMIONETA VAN", "COMIDAS DEL OPERADOR",
    "COMISION BANCARIA 0.5%", "COORDINADOR", "DERECHOS DE PISO", "HORAS EXTRA",
    "HOSPEDAJE", "MINIBUS 31 PLAZAS", "PARKING", "SEDAN", "SPRINTER", "SUBURBAN",
    "SUBURBAN ADVANCE", "SUBURBAN BLINDADA NIVEL 3", "SUBURBAN HIGW COUNTRY",
    "SUBURBAN LINEA ANTIGUA", "TOYOTA HIENCE", "TRAMO CARRETERO", "VAN DE CARGA", "VIATICOS"
];

const itemsContainer = document.querySelector('#items tbody');
const itemSelect = document.getElementById('item-select');

// Llenar el menú desplegable con los conceptos
items.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    itemSelect.appendChild(option);
});

function addItem() {
    const selectedItem = itemSelect.value;
    if (selectedItem) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" placeholder="Unidad" class="unit"></td>
            <td>${selectedItem}</td>
            <td><input type="text" placeholder="Vehículo" class="vehicle"></td>
            <td><input type="number" placeholder="P.U." class="unit-price"></td>
            <td><input type="number" placeholder="Precio" class="price"></td>
        `;
        itemsContainer.appendChild(row);
        itemSelect.value = ''; // Resetear el menú desplegable
    }
}

function calculateTotal() {
    let total = 0;
    const qtyInputs = document.querySelectorAll('.unit-price');
    const priceInputs = document.querySelectorAll('.price');

    qtyInputs.forEach((qtyInput, index) => {
        const qty = parseFloat(qtyInput.value) || 0;
        const price = parseFloat(priceInputs[index].value) || 0;
        total += qty * price;
    });

    const taxRate = parseFloat(document.getElementById('tax').value) || 0;
    total += total * (taxRate / 100);

    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Información del cliente
    const clientName = document.getElementById('client-name').value || 'Nombre del Cliente';
    const clientCity = document.getElementById('client-city').value || 'Ciudad';
    const clientPhone = document.getElementById('client-phone').value || 'Teléfono';
    const clientEmail = document.getElementById('client-email').value || 'Email';

    doc.text("COTIZACIÓN", 10, 10);
    doc.text(`Nombre del Cliente: ${clientName}`, 10, 20);
    doc.text(`Ciudad: ${clientCity}`, 10, 30);
    doc.text(`Teléfono: ${clientPhone}`, 10, 40);
    doc.text(`Email: ${clientEmail}`, 10, 50);

    let y = 60;

    const tableData = [];
    const rows = document.querySelectorAll('#items tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const unit = cells[0].querySelector('input').value || '';
        const concept = cells[1].textContent;
        const vehicle = cells[2].querySelector('input').value || '';
        const unitPrice = cells[3].querySelector('input').value || 0;
        const price = cells[4].querySelector('input').value || 0;
        if (unitPrice && price) {
            tableData.push([unit, concept, vehicle, unitPrice, price]);
        }
    });

    doc.autoTable({
        head: [['Unidad', 'Concepto', 'Vehículo', 'P.U.', 'Precio']],
        body: tableData,
        startY: y
    });

    y += tableData.length * 10 + 10;
    const taxRate = document.getElementById('tax').value || 0;
    const total = document.getElementById('total').innerText;
    doc.text(`Impuestos: ${taxRate}%`, 10, y);
    y += 10;
    doc.text(total, 10, y);

    doc.save("presupuesto.pdf");
}

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch(error => {
            console.log('Error al registrar el Service Worker:', error);
        });
}
