import { StyleSheet } from 'react-native';

// Estilos de Inicio - Saludo inicial al usuario
export const homeEstilos = (colores) => StyleSheet.create({
  saludo: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  // Estilos de Inicio - Banner de tipo de cambio USD/PEN
  bannerApi: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  textoBannerApi: {
    fontSize: 12,
    fontWeight: '500',
  },
  // Estilos de Inicio - Encabezado del listado de transacciones
  encabezadoSeccion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  verTodo: {
    fontSize: 13,
  },
});
