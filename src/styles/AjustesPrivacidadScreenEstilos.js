import { StyleSheet } from 'react-native';

// Estilos de Privacidad - Sección descriptiva y fuentes de datos
export const privacidadEstilos = (colores) => StyleSheet.create({
  descripcionSeccion: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },
  etiquetaTarjeta: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  descripcionTarjeta: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  itemFuente: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  iconoFuente: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoFuente: {
    flex: 1,
  },
  nombreFuente: {
    fontSize: 13,
    fontWeight: '500',
  },
  descripcionFuente: {
    fontSize: 11,
    marginTop: 2,
  },
  // Estilos de Privacidad - Bloque de Zona de Peligro (Revocar accesos)
  tarjetaPeligro: {
    backgroundColor: 'rgba(248, 81, 73, 0.05)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  encabezadoPeligro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  tituloPeligro: {
    fontSize: 14,
    fontWeight: '600',
  },
  descripcionPeligro: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  botonRevocar: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textoRevocar: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // Estilos de Privacidad - Listado de logs e historial de la IA
  encabezadoHistorial: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgeLog: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
  },
  textoLog: {
    fontSize: 10,
    fontWeight: '600',
  },
  itemHistorial: {
    flexDirection: 'row',
    marginTop: 12,
  },
  puntito: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
    marginRight: 10,
  },
  infoHistorial: {
    flex: 1,
  },
  encabezadoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  tipoHistorial: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tiempoHistorial: {
    fontSize: 10,
  },
  descripcionHistorial: {
    fontSize: 12,
    lineHeight: 17,
  },
});
