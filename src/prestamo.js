class CalcularPrestamo {

    constructor(montoTotal, montoInicial, meses, tea) {

        this.montoTotal = montoTotal;
        this.montoInicial = montoInicial;
        this.meses = meses;
        this.tea = tea;
        this.teaNumber = this.tea / 100;
        this.pagos = this.montoTotal - this.montoInicial;
    }

    cuotaRestante() {

        return this.montoTotal - this.montoInicial;
    }

    calcularTEM() {

        const coTEA = this.teaNumber;
        const coTEM = ((Math.pow((1 + coTEA), 0.083)) - 1).toFixed(2);
        return Number(coTEM);
    }

    calcularCuotaM() {

        const valorPrestamo = this.cuotaRestante();
        const coTEM = this.calcularTEM();
        const icoTem = coTEM + 1;

        const cuotaMensual = valorPrestamo * ((Math.pow(icoTem, this.meses) * coTEM) / (Math.pow(icoTem, this.meses) - 1));
        return Number(cuotaMensual.toFixed(2));
    }

    calcularInteres() {

        const coTea = this.calcularTEM();
        const intereses = this.pagos * coTea;
        return Number(intereses.toFixed(2));
    }

    calcularAmortizacion() {

        const amortizacion = this.calcularCuotaM() - this.calcularInteres()
        return Number(amortizacion.toFixed(2));
    }

    calcularSaldos() {

        this.pagos -= this.calcularAmortizacion();
        return this.pagos;
    }

}
export default CalcularPrestamo;