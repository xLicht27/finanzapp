import { StyleSheet } from 'react-native';

// Estilos de Servicios - Encabezados y Metas de Ahorro generales
export const serviciosEstilos = (colores) => StyleSheet.create({
  etiquetaSeccion: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  encabezadoMetas: {
    marginBottom: 16,
  },
  filaSubtitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  iconoMetasContenedor: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  tituloMetas: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtituloMetas: {
    fontSize: 11,
  },
  // Estilos de Servicios - Gestos de deslizado (Swipeable) y botones de acción rápida
  contenedorAcciones: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    gap: 2,
  },
  accionEditar: {
    width: 72,
    height: '100%',
    backgroundColor: '#1A6B4A',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRadius: 10,
  },
  accionEliminar: {
    width: 72,
    height: '100%',
    backgroundColor: '#7B1F1F',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRadius: 10,
  },
  textoAccion: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  botonAgregarMeta: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderWidth: 1,
    marginTop: 4,
  },
  // Estilos de Servicios - Tarjeta y sección para el diagnóstico por IA
  tarjetaAI: {
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
  },
  encabezadoAI: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  tituloAI: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  tituloAnalisis: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  descripcionAI: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  botonDiagnostico: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textoBotonDiagnostico: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // Estilos de Servicios - Ventana modal de creación y edición de metas
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalContenedor: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
  },
  modalEncabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitulo: {
    fontSize: 17,
    fontWeight: '700',
  },
  etiquetaCampo: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
    marginTop: 12,
  },
  entrada: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  botonGuardar: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  botonGuardando: {
    opacity: 0.6,
  },
  textoBotonGuardar: {
    fontSize: 15,
    fontWeight: '700',
  },
  botonCancelar: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotonCancelar: {
    fontSize: 14,
  },
  contenedorVistaPrevia: {
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 16,
  },
  imagenRecibo: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#000',
  },
  tituloPreview: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  textoDetallePreview: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  filaBotonesPreview: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
  },
  botonConfirmarPreview: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botonDescartarPreview: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
});
