import CalcularPrestamo from "./prestamo.js";

const dataForm = document.querySelector('#agregar-prestamo');
const montoTotal = document.querySelector('#monto-total');
const montoIncial = document.querySelector('#monto-inicial');
const plazoMeses = document.querySelector('#meses');
const TEA = document.querySelector('#tasa-anual');
const btnEnviar = document.querySelector('#enviar');
const inputs = document.querySelectorAll('#agregar-prestamo input');
const root = document.querySelector('#root');
const resetForm = document.querySelector('#reset');
const textosCols = ['Parc', 'Amortización', 'Interés', 'Pago', 'Saldo',]

const LoadScript = () => document.addEventListener('DOMContentLoaded', Exec)
const Exec = () => {

    dataForm.reset();
    montoIncial.disabled = true;
    btnEnviar.disabled = true;
    inputs.forEach(el => el.addEventListener('input', validarCampos))
}

const validarCampos = function () {

    const inicialMax = montoTotal.value * 0.8;
    const inicialMin = montoTotal.value * 0.2;
    const vValueInput = this.value;

    if (this.id === 'monto-total') {
        if (!vValueInput || isNaN(vValueInput) || Number(vValueInput) <= 0) {

            montoTotal.classList.contains('border-success') ? montoTotal.classList.toggle('border-success') : "";
            montoTotal.placeholder = "Esta vacio";
            montoTotal.classList.add("btn-danger");
            montoIncial.disabled = true;
            montoIncial.value = "";
        }
        else {

            montoTotal.classList.contains('btn-danger') ? montoTotal.classList.toggle('btn-danger') : "";
            montoTotal.classList.add("border-success");
            montoTotal.value = Number(vValueInput);
            montoIncial.disabled = false;
            montoIncial.value = "";
            montoIncial.placeholder = "Monto Inicial";
        }
    }

    if (this.id === 'monto-inicial') {
        if (Number(vValueInput) <= inicialMax && Number(vValueInput) >= inicialMin) {

            montoIncial.classList.contains('btn-danger') ? montoIncial.classList.toggle('btn-danger') : "";
            montoIncial.classList.add('border-success');
            montoIncial.value = parseInt(vValueInput);
        }
        else {

            montoIncial.placeholder = "Esta vacio";
            montoIncial.classList.add('btn-danger');
        }
    }

    if (this.id === 'meses') {
        if (!vValueInput || isNaN(vValueInput) || Number(vValueInput) <= 0 || Number(vValueInput) > 100) {

            plazoMeses.classList.contains('border-success') ? plazoMeses.classList.toggle('border-success') : "";
            plazoMeses.placeholder = "Esta vacio";
            plazoMeses.classList.add("btn-danger");
        }
        else {

            plazoMeses.classList.contains('btn-danger') ? plazoMeses.classList.toggle('btn-danger') : "";
            plazoMeses.classList.add("border-success");
            plazoMeses.value = parseInt(vValueInput);
        }
    }

    if (this.id === 'tasa-anual') {
        if (!vValueInput || isNaN(vValueInput) || Number(vValueInput) <= 0 || Number(vValueInput) > 80) {

            TEA.classList.contains('border-success') ? TEA.classList.toggle('border-success') : "";
            TEA.placeholder = "Esta vacio";
            TEA.classList.add("btn-danger");
        }
        else {

            TEA.classList.contains('btn-danger') ? TEA.classList.toggle('btn-danger') : "";
            TEA.classList.add("border-success");
            TEA.value = parseInt(vValueInput);
        }
    }

    const copyInputs = [...inputs];
    const validating = copyInputs.some(el => el.classList.contains('btn-danger') || el.value == "")
    validating ? btnEnviar.disabled = true : btnEnviar.disabled = false;
}

const Calcular = e => {

    const containerAmort = document.querySelector('#amortizacion-container');
    const divCalculo = document.querySelector('#calculo-total');
    containerAmort ? containerAmort.remove() : "";
    divCalculo ? divCalculo.remove() : "";

    e.preventDefault();
    const nMontoTotal = parseFloat(montoTotal.value);
    const nMontoInicial = parseFloat(montoIncial.value);
    const nMeses = parseInt(plazoMeses.value);
    const nTEA = parseInt(TEA.value)
    const Amortizacion = new CalcularPrestamo(nMontoTotal, nMontoInicial, nMeses, nTEA);
    const container = document.createElement('section');

    container.classList = "container-xl text-center";
    container.id = "amortizacion-container"

    for (let i = 0; i <= Amortizacion.meses + 1; i++) {

        const divRow = document.createElement('div');
        divRow.classList.add('row');
        container.appendChild(divRow);

        textosCols.forEach(el => {

            const divCol = document.createElement('div');
            divCol.classList = 'col border border-info p-3'
            container.children[i].appendChild(divCol);

            if (i === 0) {

                divCol.textContent = el;
                container.children[0].appendChild(divCol);
            }
        })

        if (i === 1) {
            divRow.firstElementChild.textContent = 0;
            divRow.lastElementChild.textContent = 'S/.' + Number(Amortizacion.pagos.toFixed(2)).toLocaleString('en-US');
        }

        if (i >= 2) {

            Amortizacion.calcularSaldos();
            divRow.children[0].textContent = i - 1;
            divRow.children[1].textContent = 'S/.' + Number(Amortizacion.amortD.toFixed(2)).toLocaleString('en-US');
            divRow.children[2].textContent = 'S/.' + Number(Amortizacion.interesesD.toFixed(2)).toLocaleString('en-US');
            divRow.children[3].textContent = 'S/.' + Number(Amortizacion.calcularCuotaM().toFixed(2)).toLocaleString('en-US');

            if (Amortizacion.pagos <= 0) Amortizacion.pagos = 0;
            if (Amortizacion.interesesD <= 0) Amortizacion.interesesD = 0;
            divRow.children[4].textContent = 'S/.' + Number(Amortizacion.pagos.toFixed(2)).toLocaleString('en-US');
        }
    }

    const TotalPagos = Amortizacion.calcularCuotaM() * Amortizacion.meses
    const divTotal = document.createElement("div");
    const inputPagos = document.createElement('input');
    const inputInteres = document.createElement('input');
    const inputCuotas = document.createElement('input');
    const divInput = document.createElement('div');
    const divInput2 = document.createElement('div');
    const divInput3 = document.createElement('div');
    const labelPagos = document.createElement('label');
    const labelCuotas = document.createElement('label');
    const labelInteres = document.createElement('label');


    labelPagos.textContent = 'Cuotas Totales: '
    labelInteres.textContent = 'Intereses Totales: '
    labelCuotas.textContent = 'Cuotas Mensuales: '

    divInput.classList.add('col')
    divInput2.classList = 'col my-3'
    divInput3.classList.add('col')
    divInput.append(labelPagos, inputPagos)
    divInput2.append(labelInteres, inputInteres)
    divInput3.append(labelCuotas, inputCuotas)

    inputInteres.classList = 'form-control';
    inputPagos.classList = 'form-control';
    inputCuotas.classList = 'form-control'

    inputCuotas.id = 'cuotas-mensual'
    inputInteres.id = 'interes-total'
    inputPagos.id = 'cuotas-total'

    inputCuotas.value = 'S/.' + Number(Amortizacion.calcularCuotaM().toFixed(2)).toLocaleString('en-US');
    inputInteres.value = 'S/.' + Number(Amortizacion.interescontables.toFixed(2)).toLocaleString('en-US');
    inputPagos.value = 'S/.' + Number(TotalPagos.toFixed(2)).toLocaleString('en-US');

    inputInteres.disabled = true;
    inputPagos.disabled = true;
    inputCuotas.disabled = true

    divTotal.append(divInput, divInput2, divInput3)
    divTotal.classList = "mx-auto my-3 p-3 border border-success"
    divTotal.id = 'calculo-total'
    divTotal.style.width = "300px"

    root.append(divTotal, container)
}

const LimpiarHTML = e => {

    e.preventDefault();
    const containerAmort = document.querySelector('#amortizacion-container');
    const divCalculo = document.querySelector('#calculo-total');

    if (containerAmort || divCalculo) {

        dataForm.reset();
        containerAmort.remove();
        divCalculo.remove();
        btnEnviar.disabled = true;
    }
    else {

        dataForm.reset();
        btnEnviar.disabled = true;
    }

    inputs.forEach(el => {

        el.classList.contains('border-success') ? el.classList.remove('border-success') : null;
        el.classList.contains('btn-danger') ? el.classList.remove('btn-danger') : null;

        if (el.id == 'monto-total') el.placeholder = 'Monto Total';
        if (el.id == 'monto-inicial') el.placeholder = 'Monto Inicial';
        if (el.id == 'meses') el.placeholder = 'Meses';
        if (el.id == 'tasa-anual') el.placeholder = 'Tasa Anual';
    })
    montoIncial.disabled = true;
}

dataForm.addEventListener('submit', Calcular)
resetForm.addEventListener('click', LimpiarHTML)

LoadScript();