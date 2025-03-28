const items = [
    "AUTOBUS 45 PLAZAS", "CAMIONETA CARGA", "CAMIONETA VAN", "COMIDAS DEL OPERADOR",
    "COMISION BANCARIA 0.5%", "COORDINADOR", "DERECHOS DE PISO", "HORAS EXTRA",
    "HOSPEDAJE", "MINIBUS 31 PLAZAS", "PARKING", "SEDAN", "SPRINTER", "SUBURBAN",
    "SUBURBAN ADVANCE", "SUBURBAN BLINDADA NIVEL 3", "SUBURBAN HIGW COUNTRY",
    "SUBURBAN LINEA ANTIGUA", "TOYOTA HIENCE", "TRAMO CARRETERO", "VAN DE CARGA", "VIATICOS"
];

const itemsContainer = document.getElementById('items');

items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.innerHTML = `
        <label>${item}</label>
        <input type="number" placeholder="Cantidad" class="qty">
        <input type="number" placeholder="Precio" class="price">
    `;
    itemsContainer.appendChild(itemDiv);
});

function calculateTotal() {
    let total = 0;
    const qtyInputs = document.querySelectorAll('.qty');
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
