import { StyleSheet } from 'react-native';

export const TEMAS = {
  oscuro: {
    fondoPrimario: '#0D1117',
    fondoTarjeta: '#161B22',
    fondoTarjeta2: '#1C2230',
    accentVerde: '#00D4A3',
    accentVerdeTenue: 'rgba(0, 212, 163, 0.12)',
    textoPrimario: '#FFFFFF',
    textoSecundario: '#8B949E',
    peligro: '#F85149',
    borde: '#21262D',
    fondoEntrada: '#0D1117',
  },
  claro: {
    fondoPrimario: '#F8F9FA',
    fondoTarjeta: '#FFFFFF',
    fondoTarjeta2: '#F1F3F5',
    accentVerde: '#00B48A',
    accentVerdeTenue: 'rgba(0, 180, 138, 0.12)',
    textoPrimario: '#212529',
    textoSecundario: '#6C757D',
    peligro: '#CF222E',
    borde: '#E9ECEF',
    fondoEntrada: '#FFFFFF',
  },
  oscuroContraste: {
    fondoPrimario: '#000000',
    fondoTarjeta: '#000000',
    fondoTarjeta2: '#000000',
    accentVerde: '#00FFC4',
    accentVerdeTenue: 'rgba(0, 255, 196, 0.2)',
    textoPrimario: '#FFFFFF',
    textoSecundario: '#FFFFFF',
    peligro: '#FF3333',
    borde: '#FFFFFF',
    fondoEntrada: '#000000',
  },
  claroContraste: {
    fondoPrimario: '#FFFFFF',
    fondoTarjeta: '#FFFFFF',
    fondoTarjeta2: '#FFFFFF',
    accentVerde: '#00664E',
    accentVerdeTenue: 'rgba(0, 102, 78, 0.2)',
    textoPrimario: '#000000',
    textoSecundario: '#000000',
    peligro: '#990000',
    borde: '#000000',
    fondoEntrada: '#FFFFFF',
  }
};

export const obtenerEstilosGlobales = (colores) => {
  return StyleSheet.create({
    fondoPrincipal: {
      flex: 1,
      backgroundColor: colores.fondoPrimario,
    },
    scroll: {
      padding: 20,
      paddingTop: 50,
      paddingBottom: 40,
    },
    cabecera: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    botonVolver: {
      padding: 4,
    },
    titulo: {
      fontSize: 18,
      fontWeight: '700',
      color: colores.textoPrimario,
    },
    tituloSeccion: {
      fontSize: 14,
      fontWeight: '700',
      color: colores.textoPrimario,
      marginBottom: 12,
      marginTop: 18,
      paddingLeft: 4,
    },
    tarjeta: {
      backgroundColor: colores.fondoTarjeta,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colores.borde,
      padding: 16,
      marginBottom: 16,
      shadowColor: colores.textoPrimario,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
    },
    tarjetaDropdown: {
      backgroundColor: colores.fondoTarjeta,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colores.borde,
      overflow: 'hidden',
    },
    itemFila: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    itemFilaDropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    iconoContenedor: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: colores.accentVerdeTenue,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    infoContenedor: {
      flex: 1,
    },
    tituloItem: {
      color: colores.textoPrimario,
      fontSize: 13,
      fontWeight: '500',
    },
    descripcionItem: {
      color: colores.textoSecundario,
      fontSize: 11,
      marginTop: 2,
    },
  });
};
