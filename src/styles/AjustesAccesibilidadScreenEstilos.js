import { StyleSheet } from 'react-native';

// Estilos de Accesibilidad - Sección de Modo Visual (Claro, Oscuro, Sistema)
export const accesibilidadEstilos = (colores) => StyleSheet.create({
  contenedorModoVisual: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
  },
  botonModoVisual: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  botonModoVisualActivo: {
    borderWidth: 1,
  },
  textoModoVisual: {
    fontSize: 13,
    fontWeight: '600',
  },
  // Estilos de Accesibilidad - Control Deslizante de Tamaño de Texto
  tarjetaSlider: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  contenedorSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  letraSlider: {
    fontWeight: '600',
  },
  lineaSlider: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    justifyContent: 'center',
    position: 'relative',
  },
  lineaProgreso: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
  },
  puntosFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  puntoSlider: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
  },
  puntoSliderActivo: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  // Estilos de Accesibilidad - Selector de Región e Idioma
  idiomaSeleccionado: {
    fontSize: 13,
    fontWeight: '600',
  },
  menuIdiomas: {
    borderTopWidth: 1,
    paddingHorizontal: 12,
  },
  opcionIdioma: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    paddingHorizontal: 12,
  },
  textoOpcionIdioma: {
    fontSize: 13,
  },
});
