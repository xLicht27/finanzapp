import { StyleSheet } from 'react-native';

// Estilos de Reportes - Selector del filtro de meses superior
export const reportesEstilos = (colores) => StyleSheet.create({
  selectorMes: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
  },
  botonMes: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 7,
  },
  textoMes: {
    fontSize: 12,
    fontWeight: '500',
  },
  // Estilos de Reportes - Tarjeta de resumen de ahorros
  encabezadoTarjeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtituloTarjeta: {
    fontSize: 13,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  textoBadge: {
    fontSize: 11,
    fontWeight: '600',
  },
  montoAhorro: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  textoIncremento: {
    fontSize: 13,
  },
  // Estilos de Reportes - Gráfico de barras de gastos y separadores
  barrasGrafico: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 100,
    marginBottom: 16,
  },
  columnaBarra: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 4,
  },
  barra: {
    width: '70%',
    borderRadius: 4,
    opacity: 0.8,
  },
  separador: {
    height: 1,
    marginVertical: 14,
  },
});
