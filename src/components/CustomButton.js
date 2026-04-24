import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ titulo, alPresionar }) => {
  return (
    <TouchableOpacity style={estilos.boton} onPress={alPresionar} activeOpacity={0.8}>
      <Text style={estilos.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
};

const estilos = StyleSheet.create({
  boton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
