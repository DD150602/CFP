import jsPDF from 'jspdf'
import imagen from "./images/logoCFP.png"

const data = {
    nombre: "Pepio de las mercedes perez ",
    numeroDocumento: "123456789",
    numeroContacto: "1234567",
    direccion: "calle 123 # 46-56",
    correo: "prueba@gmail.com"
}

const deudas = [
    {
        entidad_bancaria: "Banco A",
        fecha_pago_oportuno: "2024-05-15",
        valor_pago: 1500.75,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco B",
        fecha_pago_oportuno: "2024-06-01",
        valor_pago: 3200.00,
        estado_pago: "Pendiente"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    },
    {
        entidad_bancaria: "Banco C",
        fecha_pago_oportuno: "2024-06-20",
        valor_pago: 2900.50,
        estado_pago: "Pagado"
    }
];

const doc = new jsPDF({
    orientation: 'portrait', // Orientación del documento (vertical)
    unit: 'mm', // Unidad de medida en milímetros
    format: [215.9, 279.4], // Tamaño de carta en milímetros (ancho x alto)
});

let contadorPaginas = 1
// obtencion del size del documento
const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();

export function generarPdf(datos) {
    const [data] = datos
    //llamado de funcion para generar cabecera
    generaCabecera()

    //codigo para agregar la imagen en la primera pagina del archivo
    doc.addImage(imagen, "png", 4, 20, 25, 23);

    // Establecer el tamaño de la fuente
    doc.setFontSize(20);

    // Establecer la fuente en negrita
    doc.setFont(undefined, "bold");
    // titulo del documento
    doc.text('Estado Financiero del Cliente', calculoCentral('Estado Financiero del Cliente'), 30);
    doc.setFontSize(16);
    doc.text('Deudas en [Mes] [Año]', calculoCentral('Deudas en [Mes] [Año]'), 36);
    // subtitulo del documento
    doc.text('Persona involucrada', 4, 48);
    // Definicion letra cuerpo documento
    doc.setFontSize(12);
    doc.setFont(undefined, "normal");
    impresionTexto(`A la fecha del reporte generado, el implicado ${data.nombre_usuario} con documento de identidad ${data.numero_documento} y con información de contacto ${data.correo}, es acreedor de las deudas bancarias descritas a continuación.`, 54)
    // configuraciones iniciales para generar el contenido de las deudas 
    let x = 10;
    let y = 71;
    const lineHeight = doc.getTextDimensions('A').h;
    let contadorDeuda = 1
        data.registros_bancarios.forEach(deuda => {
            // Verificar si hay suficiente espacio en la página actual para el encabezado de la deuda
            if (y + lineHeight * 2 + 6 > pageHeight - 20) {
                generarFinalDocumento()
                doc.addPage();
                generaCabecera()
                y = 32;
                contadorPaginas++
            }
    
            // Encabezado de la deuda
            doc.setFontSize(16);
            doc.setFont(undefined, "bold");
            doc.text(`Deuda N°${contadorDeuda}`, 4, y);
            y += lineHeight + 2;
    
            // Restablecer la fuente para el texto normal
            doc.setFontSize(12);
            doc.setFont(undefined, "normal");
    
            // Texto de la deuda
            const texto = `La deuda es con el banco ${deuda.entidad_bancaria} por un monto de ${deuda.valor_pago} con fecha de pago ${deuda.fecha_pago_oportuno} y se encuentra en estado ${deuda.estado_pago}.`;
    
            // Dividir el texto en líneas que se ajusten al ancho de la página
            const textLines = doc.splitTextToSize(texto, pageWidth - 20);
    
            // Renderizar cada línea de texto
            textLines.forEach(line => {
                if (y + lineHeight > pageHeight - 20) {
                    generarFinalDocumento()
                    doc.addPage();
                    generaCabecera()
                    y = marginTop;
                    contadorPaginas++
                }
                doc.text(line, x, y);
                y += lineHeight;
            });
    
            // Incrementar el contador de deuda
            contadorDeuda++;
            y += lineHeight; // Espacio adicional entre deudas
        });
    generarFinalDocumento()
    doc.setFont(undefined, "bold");
    impresionTexto('Este documento hace constancia del reporte del mes uno, el cual ha sido expedido el día (fecha), para cualquier trámite o papeleo necesario del cliente.', doc.internal.pageSize.getHeight() - 22)
    doc.save("Reporte Financiero.pdf");
};

function generaCabecera() {
    doc.setFillColor(0, 74, 173);
    doc.rect(0, 0, 300, 18, 'F');
}

const calculoCentral = (texto) => {
    const textWidth = doc.getTextWidth(texto);
    return (pageWidth - textWidth) / 2;
}

const impresionTexto = (texto, posicionY) => {
    // Dividir el texto en líneas que se ajusten al ancho de la página
    const textLines = doc.splitTextToSize(texto, pageWidth - 20);
    // Coordenadas iniciales
    let x = 10;
    // Renderizar cada línea de texto
    textLines.forEach(line => {
        doc.text(line, x, posicionY);
        posicionY += doc.getTextDimensions(line).h;
    });
}

const generarFinalDocumento = () => {
    doc.setFillColor(0, 74, 173);
    doc.rect(8, doc.internal.pageSize.getHeight() - 15, doc.internal.pageSize.getWidth() - 16, 0, 'F');
    doc.setFontSize(10);
    doc.setTextColor(211, 211, 211)
    doc.text('ClientFormPro-CFP', 4, doc.internal.pageSize.getHeight() - 6);
    doc.text(`Pagina ${contadorPaginas}`, doc.internal.pageSize.getWidth() - 4 - doc.getTextWidth(`Pagina ${contadorPaginas}`), doc.internal.pageSize.getHeight() - 6);
    doc.setTextColor(0, 0, 0)
}

