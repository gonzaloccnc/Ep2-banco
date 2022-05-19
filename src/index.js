import CalcularPrestamo from "./prestamo.js";

const dataForm = document.querySelector('#agregar-prestamo');
const montoTotal = document.querySelector('#monto-total');
const montoIncial = document.querySelector('#monto-inicial');
const plazoMeses = document.querySelector('#meses');
const TEA = document.querySelector('#tasa-anual');
const btnEnviar = document.querySelector('#enviar');
const inputs = document.querySelectorAll('#agregar-prestamo input');

const LoadScript = () => document.addEventListener('DOMContentLoaded', Exec)
const Exec = () => {

    dataForm.reset();
    montoIncial.disabled = true;
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
            montoTotal.value = parseInt(vValueInput);
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

    e.preventDefault();
    const nMontoTotal = parseFloat(montoTotal.value);
    const nMontoInicial = parseFloat(montoIncial.value);
    const nMeses = parseInt(plazoMeses.value);
    const nTEA = parseInt(TEA.value)
    const Amortizacion = new CalcularPrestamo(nMontoTotal, nMontoInicial, nMeses, nTEA);

    console.log(Amortizacion)
}
dataForm.addEventListener('submit', Calcular)

LoadScript();