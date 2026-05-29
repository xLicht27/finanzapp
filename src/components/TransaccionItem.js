import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORES } from '../constants/theme';

const iconosPorCategoria = {
  comida: 'restaurant-outline',
  transporte: 'car-outline',
  compras: 'bag-outline',
  trabajo: 'briefcase-outline',
  entretenimiento: 'game-controller-outline',
  otro: 'ellipse-outline',
};

const TransaccionItem = ({ nombre, monto, categoria, fecha }) => {
  const esGasto = monto < 0;
  const icono = iconosPorCategoria[categoria] || iconosPorCategoria.otro;

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.iconoContenedor}>
        <Ionicons name={icono} size={20} color={COLORES.accentVerde} />
      </View>
      <View style={estilos.info}>
        <Text style={estilos.nombre} numberOfLines={1}>{nombre}</Text>
        <Text style={estilos.fecha}>{fecha}</Text>
      </View>
      <Text style={[estilos.monto, esGasto ? estilos.gasto : estilos.ingreso]}>
        {esGasto ? '' : '+'}{monto < 0 ? `-$${Math.abs(monto).toFixed(2)}` : `$${monto.toFixed(2)}`}
      </Text>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORES.borde,
  },
  iconoContenedor: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORES.accentVerdeTenue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nombre: {
    color: COLORES.textoPrimario,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  fecha: {
    color: COLORES.textoSecundario,
    fontSize: 12,
  },
  monto: {
    fontSize: 14,
    fontWeight: '600',
  },
  gasto: {
    color: '#F85149',
  },
  ingreso: {
    color: COLORES.accentVerde,
  },
});

export default TransaccionItem;
