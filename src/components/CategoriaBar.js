import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/TemaContext';
import { categoriaBarEstilos } from '../styles/componentes';

const CategoriaBar = ({ icono, nombre, subcategorias, monto, porcentaje }) => {
  const { colores } = useTema();
  const estilos = categoriaBarEstilos(colores);

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.encabezado}>
        <View style={[estilos.icono, { backgroundColor: colores.accentVerdeTenue }]}>
          <Ionicons name={icono} size={18} color={colores.accentVerde} />
        </View>
        <View style={estilos.info}>
          <Text style={[estilos.nombre, { color: colores.textoPrimario }]}>{nombre}</Text>
          <Text style={[estilos.subcategorias, { color: colores.textoSecundario }]}>{subcategorias}</Text>
        </View>
        <View style={estilos.derecha}>
          <Text style={[estilos.monto, { color: colores.textoPrimario }]}>-${Math.abs(monto).toLocaleString()}</Text>
          <Text style={[estilos.porcentaje, { color: colores.textoSecundario }]}>{porcentaje}%</Text>
        </View>
      </View>
      <View style={[estilos.contenedorBarra, { backgroundColor: colores.borde }]}>
        <View style={[estilos.relleno, { width: `${porcentaje}%`, backgroundColor: colores.accentVerde }]} />
      </View>
    </View>
  );
};

export default CategoriaBar;
