import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

/**
 * Genera un archivo PDF con el reporte financiero de transacciones y metas de ahorro,
 * aplicando el esquema de colores del tema seleccionado, y abre el diálogo nativo de compartición.
 * 
 * @param {Array} transacciones - Listado de transacciones a incluir.
 * @param {Array} metas - Listado de metas de ahorro a incluir.
 * @param {object} colores - Paleta de colores del tema activo.
 * @returns {Promise<void>} Promesa que resuelve al completar la operación.
 */
export const exportarReportePDF = async (transacciones, metas, colores) => {
  const filasTransacciones = transacciones.map(t => {
    const esGasto = t.monto < 0;
    const colorMonto = esGasto ? colores.peligro : colores.accentVerde;
    const signo = esGasto ? '' : '+';
    return `
      <tr style="border-bottom: 1px solid ${colores.borde};">
        <td style="padding: 12px; color: ${colores.textoPrimario};">${t.nombre}</td>
        <td style="padding: 12px; color: ${colores.textoSecundario}; text-transform: capitalize;">${t.categoria}</td>
        <td style="padding: 12px; color: ${colores.textoSecundario};">${t.fecha}</td>
        <td style="padding: 12px; text-align: right; font-weight: bold; color: ${colorMonto};">
          ${signo}${t.monto.toFixed(2)}
        </td>
      </tr>
    `;
  }).join('');

  const bloquesMetas = metas.map(m => {
    const progreso = Math.min(m.montoActual / m.montoObjetivo, 1);
    const porcentaje = Math.round(progreso * 100);
    return `
      <div style="background-color: ${colores.fondoTarjeta2}; border: 1px solid ${colores.borde}; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-weight: bold; color: ${colores.textoPrimario};">${m.nombre}</span>
          <span style="color: ${colores.accentVerde}; font-weight: bold;">$${m.montoActual.toLocaleString()}</span>
        </div>
        <div style="height: 6px; background-color: ${colores.borde}; border-radius: 3px; overflow: hidden; margin-bottom: 8px;">
          <div style="height: 100%; width: ${porcentaje}%; background-color: ${colores.accentVerde}; border-radius: 3px;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: ${colores.textoSecundario};">
          <span>Objetivo: $${m.montoObjetivo.toLocaleString()}</span>
          <span>Plazo: ${m.fechaLimite}</span>
        </div>
      </div>
    `;
  }).join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Reporte Financiero FinanZaap</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: ${colores.fondoPrimario};
          color: ${colores.textoPrimario};
          margin: 0;
          padding: 40px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid ${colores.accentVerde};
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .titulo {
          font-size: 28px;
          font-weight: bold;
          margin: 0;
          color: ${colores.textoPrimario};
        }
        .subtitulo {
          font-size: 14px;
          color: ${colores.textoSecundario};
          margin: 5px 0 0 0;
        }
        .seccion-titulo {
          font-size: 18px;
          font-weight: bold;
          margin-top: 30px;
          margin-bottom: 15px;
          color: ${colores.accentVerde};
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .tarjeta-resumen {
          background-color: ${colores.fondoTarjeta};
          border: 1px solid ${colores.borde};
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 30px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th {
          background-color: ${colores.fondoTarjeta};
          color: ${colores.textoSecundario};
          text-align: left;
          padding: 12px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid ${colores.borde};
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1 class="titulo">FinanZaap</h1>
          <p class="subtitulo">Reporte de Control Financiero Personal</p>
        </div>
        <div style="text-align: right; color: ${colores.textoSecundario}; font-size: 12px;">
          Generado el: ${new Date().toLocaleDateString('es-ES')}
        </div>
      </div>

      <div class="tarjeta-resumen">
        <h2 style="margin-top: 0; font-size: 18px; color: ${colores.textoPrimario};">Resumen de Actividad</h2>
        <p style="color: ${colores.textoSecundario}; font-size: 14px; margin-bottom: 0;">
          Este documento contiene la recopilación detallada de movimientos y el nivel de avance de tus objetivos de ahorro vigentes en el dispositivo.
        </p>
      </div>

      <div class="seccion-titulo">Metas de Ahorro</div>
      <div style="margin-bottom: 30px;">
        ${bloquesMetas.length > 0 ? bloquesMetas : `<p style="color: ${colores.textoSecundario};">No hay metas de ahorro registradas.</p>`}
      </div>

      <div class="seccion-titulo">Transacciones Recientes</div>
      <div style="background-color: ${colores.fondoTarjeta}; border: 1px solid ${colores.borde}; border-radius: 12px; overflow: hidden; padding: 8px;">
        <table>
          <thead>
            <tr>
              <th>Detalle</th>
              <th>Categoría</th>
              <th>Fecha</th>
              <th style="text-align: right;">Monto</th>
            </tr>
          </thead>
          <tbody>
            ${filasTransacciones.length > 0 ? filasTransacciones : `<tr><td colspan="4" style="text-align: center; padding: 20px; color: ${colores.textoSecundario};">No hay transacciones registradas.</td></tr>`}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `;

  try {
    const archivo = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(archivo.uri, {
      mimeType: 'application/pdf',
      dialogTitle: 'Reporte Financiero FinanZaap',
      UTI: 'com.adobe.pdf'
    });
  } catch (error) {
    throw error;
  }
};
