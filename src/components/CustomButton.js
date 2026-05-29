import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORES } from '../constants/theme';

const CustomButton = ({ titulo, alPresionar, variante = 'primario', cargando = false }) => {
  return (
    <TouchableOpacity
      style={[estilos.boton, estilos[variante]]}
      onPress={alPresionar}
      activeOpacity={0.8}
      disabled={cargando}
    >
      {cargando ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={[estilos.texto, variante === 'secundario' && estilos.textoSecundario]}>
          {titulo}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const estilos = StyleSheet.create({
  boton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  primario: {
    backgroundColor: COLORES.accentVerde,
  },
  secundario: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  texto: {
    color: '#0D1117',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  textoSecundario: {
    color: COLORES.textoSecundario,
  },
});

export default CustomButton;
