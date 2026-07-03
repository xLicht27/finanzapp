import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useTema } from '../context/TemaContext';
import { customButtonEstilos } from '../styles/componentes';

const CustomButton = ({ titulo, alPresionar, variante = 'primario', cargando = false }) => {
  const { colores } = useTema();
  const estilos = customButtonEstilos(colores);

  return (
    <TouchableOpacity
      style={[
        estilos.boton,
        variante === 'primario' ? estilos.botonPrimario : estilos.botonSecundario
      ]}
      onPress={alPresionar}
      activeOpacity={0.8}
      disabled={cargando}
    >
      {cargando ? (
        <ActivityIndicator color={colores.fondoPrimario} />
      ) : (
        <Text style={[
          estilos.texto,
          variante === 'primario' ? { color: colores.fondoPrimario } : { color: colores.textoSecundario }
        ]}>
          {titulo}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
