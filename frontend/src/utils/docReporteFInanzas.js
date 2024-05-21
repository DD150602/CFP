import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, PageBreak, Header, Table, TableRow, TableCell, ShadingType, WidthType, HeightRule, Media, Footer, PageNumber, ImageRun } from 'docx'
import { saveAs } from 'file-saver';

const data = {
  nombre: "Pepio de las mercedes perez ",
  numeroDocumento: "123456789",
  numeroContacto: "1234567",
  direccion: "calle 123 # 46-56",
  correo: "prueba@gmail.com"
};

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
  }
];


function addEmptyParagraphsWithBlueBackground(count) {
  const paragraphs = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(new Paragraph({
      text: "",
      shading: {
        type: ShadingType.SOLID,
        color: "#084cac" // Azul
      }
    }));
  }
  return paragraphs;
}




export async function generarWord(datos) {
  const [data] = datos
  const doc = new Document({
    sections: [{
      properties: {},
      headers: {
        default: new Header({
          children: [
            ...addEmptyParagraphsWithBlueBackground(3), // Agregar 3 párrafos vacíos con fondo azul
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun("ClientFormPro-CFP"),
                new TextRun({
                  children: [" Pagina ", PageNumber.CURRENT, " de ", PageNumber.TOTAL_PAGES],
                }),
              ],
            }),
          ],
        }),
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Estado Financiero del Cliente",
              bold: true,
              color: '000000',
              size: 32
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Deudas en [Mes] [Año]",
              bold: true,
              color: '000000',
              size: 26
            })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Persona involucrada",
              bold: true,
              color: '000000',
              size: 24
            })
          ]
        }),
        new Paragraph({
          text: `A la fecha del reporte generado, el implicado ${data.nombre_usuario} con documento de identidad ${data.numero_documento} y con información de contacto ${data.correo}, es acreedor de las deudas bancarias descritas a continuación.`,
          spacing: {
            after: 240,
          },
        }),
        ...data.registros_bancarios.map((deuda, index) => [
          new Paragraph({
            children: [
              new TextRun({
                text: `Deuda N°${index + 1}`,
                bold: true,
                color: '000000',
                size: 28
              })
            ],
            spacing: {
              before: 240,
              after: 120,
            },
          }),
          new Paragraph({
            text: `La deuda es con el banco ${deuda.entidad_bancaria} por un monto de ${deuda.valor_pago} con fecha de pago ${deuda.fecha_pago_oportuno} y se encuentra en estado ${deuda.estado_pago}.`,
            spacing: {
              after: 120,
            },
          }),
        ]).flat(),
        new Paragraph({
          children: [
            new TextRun({
              text: "Este documento hace constancia del reporte del mes uno, el cual ha sido expedido el día (fecha), para cualquier trámite o papeleo necesario del cliente.",
              bold: true,
            })
          ],
          spacing: {
            before: 240,
          },
        }),
      ],
    }],
  });

  // Convertimos el documento a un archivo blob
  const blob = await Packer.toBlob(doc);
  // Guardamos el archivo usando FileSaver
  saveAs(blob, "Estado_Financiero_Cliente.docx");
}


