const items = [
    "AUTOBUS 45 PLAZAS", "CAMIONETA CARGA", "CAMIONETA VAN", "COMIDAS DEL OPERADOR",
    "COMISION BANCARIA 0.5%", "COORDINADOR", "DERECHOS DE PISO", "HORAS EXTRA",
    "HOSPEDAJE", "MINIBUS 31 PLAZAS", "PARKING", "SEDAN", "SPRINTER", "SUBURBAN",
    "SUBURBAN ADVANCE", "SUBURBAN BLINDADA NIVEL 3", "SUBURBAN HIGW COUNTRY",
    "SUBURBAN LINEA ANTIGUA", "TOYOTA HIENCE", "TRAMO CARRETERO", "VAN DE CARGA", "VIATICOS"
];

const itemsContainer = document.querySelector('#items tbody');

items.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item}</td>
        <td><input type="number" placeholder="Cantidad" class="qty"></td>
        <td><input type="number" placeholder="Precio" class="price"></td>
    `;
    itemsContainer.appendChild(row);
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

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Presupuesto", 10, 10);
    let y = 20;

    doc.autoTable({
        head: [['Concepto', 'Cantidad', 'Precio']],
        body: items.map((item, index) => {
            const qty = document.querySelectorAll('.qty')[index].value || 0;
            const price = document.querySelectorAll('.price')[index].value || 0;
            return [item, qty, price];
        }),
        startY: y
    });

    y += items.length * 10 + 10;
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
            console.log('Error al registrar el Service Worker:', error);
        });
}
        })
        .catch(error => {
            console.log('Error al registrar el Service Worker:', error);
        });
}
