import { StyleSheet } from 'react-native';

// Estilos para el componente CategoriaBar
export const categoriaBarEstilos = (colores) => StyleSheet.create({
  contenedor: {
    marginBottom: 16,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icono: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 13,
    fontWeight: '500',
  },
  subcategorias: {
    fontSize: 11,
    marginTop: 1,
  },
  derecha: {
    alignItems: 'flex-end',
  },
  monto: {
    fontSize: 13,
    fontWeight: '600',
  },
  porcentaje: {
    fontSize: 11,
  },
  contenedorBarra: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  relleno: {
    height: '100%',
    borderRadius: 2,
  },
});

// Estilos para el componente CustomButton
export const customButtonEstilos = (colores) => StyleSheet.create({
  boton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  botonPrimario: {
    backgroundColor: colores.accentVerde,
  },
  botonSecundario: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colores.borde,
  },
  texto: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

// Estilos para el componente MetaAhorroCard
export const metaAhorroCardEstilos = (colores) => StyleSheet.create({
  contenedor: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  izquierda: {
    flex: 1,
  },
  nombre: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  estado: {
    fontSize: 11,
  },
  monto: {
    fontSize: 16,
    fontWeight: '700',
  },
  barraContenedor: {
    height: 5,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  barraRelleno: {
    height: '100%',
    borderRadius: 3,
  },
  pie: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  texto: {
    fontSize: 11,
  },
});

// Estilos para el componente PresupuestoBadge
export const presupuestoBadgeEstilos = (colores) => StyleSheet.create({
  contenedor: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: colores.textoPrimario,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  etiqueta: {
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 6,
    fontWeight: '600',
  },
  monto: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 4,
  },
  cargando: {
    fontSize: 18,
    marginBottom: 4,
  },
  subtexto: {
    fontSize: 12,
    fontWeight: '500',
  },
});

// Estilos para el componente TransaccionItem
export const transaccionItemEstilos = (colores) => StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  icono: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  fecha: {
    fontSize: 12,
  },
  monto: {
    fontSize: 14,
    fontWeight: '600',
  },
});
