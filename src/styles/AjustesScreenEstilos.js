import { StyleSheet } from 'react-native';

// Estilos de la pantalla Ajustes - Sección del perfil de usuario y avatar
export const ajustesEstilos = (colores) => StyleSheet.create({
  contenedorPerfil: {
    alignItems: 'center',
    borderRadius: 14,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: colores.textoPrimario,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
  },
  nombreUsuario: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  correoUsuario: {
    fontSize: 13,
  },
  // Estilos de la pantalla Ajustes - Menú de opciones de configuración
  tarjetaMenu: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 28,
    overflow: 'hidden',
  },
  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  textoItem: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  // Estilos de la pantalla Ajustes - Botón de eliminación de cuenta
  botonEliminar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(248, 81, 73, 0.1)',
    borderRadius: 10,
    paddingVertical: 14,
    borderWidth: 1,
  },
  textoEliminar: {
    fontSize: 14,
    fontWeight: '600',
  },
});
