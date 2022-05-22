class CalcularPrestamo {

    constructor(montoTotal, montoInicial, meses, tea) {

        this.montoTotal = montoTotal;
        this.montoInicial = montoInicial;
        this.meses = meses;
        this.tea = tea;
        this.teaNumber = this.tea / 100;
        this.pagos = this.montoTotal - this.montoInicial;
        this.interesesD = 0;
        this.amortD = 0;
    }

    cuotaRestante() {

        return this.montoTotal - this.montoInicial;
    }

    calcularTEM() {

        const coTEA = this.teaNumber + 1;
        const coTEM = ((Math.pow(coTEA, 1 / 12)) - 1);
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
        this.interesesD = this.pagos * coTea;
        return Number(this.interesesD.toFixed(2))
    }

    calcularAmortizacion() {

        this.amortD = this.calcularCuotaM() - this.calcularInteres()
        return Number(this.amortD.toFixed(2));
    }

    calcularSaldos() {

        this.pagos -= this.calcularAmortizacion();
        return this.pagos;
    }

}
export default CalcularPrestamo;