import { StyleSheet } from 'react-native';

// Estilos de Eliminación de Cuenta - Contenedor general y elementos informativos comunes
export const eliminarCuentaEstilos = (colores) => StyleSheet.create({
  contenedorPaso: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  advertenciaIconoContainer: {
    marginBottom: 20,
  },
  exitoIconoContainer: {
    marginBottom: 20,
  },
  tituloPaso: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  descripcionPaso: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 10,
  },
  // Estilos de Eliminación de Cuenta - Botones de acción principales y secundarios
  botonPrimario: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotonPrimario: {
    fontSize: 14,
    fontWeight: '600',
  },
  botonSecundario: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  textoBotonSecundario: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Estilos de Eliminación de Cuenta - SMS Verificación (Paso 2 y Paso 3 / Error)
  recuadroError: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoError: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  filaInputs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  inputCodigo: {
    width: 54,
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  botonVerificar: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  textoBotonVerificar: {
    fontSize: 14,
    fontWeight: '700',
  },
  enlaceReenviar: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  textoEnlaceReenviar: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Estilos de Eliminación de Cuenta - Confirmación Final por Frase (Paso 4)
  filaCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    width: '100%',
    paddingHorizontal: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCheckbox: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  etiquetaInput: {
    fontSize: 13,
    alignSelf: 'flex-start',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  inputTexto: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    marginBottom: 28,
  },
  botonEliminarPermanente: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonEliminarDeshabilitado: {
    opacity: 0.3,
  },
  textoBotonEliminarPermanente: {
    fontSize: 14,
    fontWeight: '600',
  },
});
