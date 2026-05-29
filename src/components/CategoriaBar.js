import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORES } from '../constants/theme';

const CategoriaBar = ({ icono, nombre, subcategorias, monto, porcentaje }) => (
  <View style={estilos.contenedor}>
    <View style={estilos.encabezado}>
      <View style={estilos.iconoContenedor}>
        <Ionicons name={icono} size={18} color={COLORES.accentVerde} />
      </View>
      <View style={estilos.info}>
        <Text style={estilos.nombre}>{nombre}</Text>
        <Text style={estilos.subcategorias}>{subcategorias}</Text>
      </View>
      <View style={estilos.derecha}>
        <Text style={estilos.monto}>-${Math.abs(monto).toLocaleString()}</Text>
        <Text style={estilos.porcentaje}>{porcentaje}%</Text>
      </View>
    </View>
    <View style={estilos.barraContenedor}>
      <View style={[estilos.barraRelleno, { width: `${porcentaje}%` }]} />
    </View>
  </View>
);

const estilos = StyleSheet.create({
  contenedor: {
    marginBottom: 16,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconoContenedor: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORES.accentVerdeTenue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  nombre: {
    color: COLORES.textoPrimario,
    fontSize: 13,
    fontWeight: '500',
  },
  subcategorias: {
    color: COLORES.textoSecundario,
    fontSize: 11,
    marginTop: 1,
  },
  derecha: {
    alignItems: 'flex-end',
  },
  monto: {
    color: COLORES.textoPrimario,
    fontSize: 13,
    fontWeight: '600',
  },
  porcentaje: {
    color: COLORES.textoSecundario,
    fontSize: 11,
  },
  barraContenedor: {
    height: 4,
    backgroundColor: COLORES.borde,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barraRelleno: {
    height: '100%',
    backgroundColor: COLORES.accentVerde,
    borderRadius: 2,
  },
});

export default CategoriaBar;
