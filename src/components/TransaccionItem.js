import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/TemaContext';

const iconosPorCategoria = {
  comida: 'restaurant-outline',
  transporte: 'car-outline',
  compras: 'bag-outline',
  trabajo: 'briefcase-outline',
  entretenimiento: 'game-controller-outline',
  otro: 'ellipse-outline',
};

const TransaccionItem = ({ nombre, monto, categoria, fecha }) => {
  const { colores } = useTema();
  const esGasto = monto < 0;
  const icono = iconosPorCategoria[categoria] || iconosPorCategoria.otro;

  return (
    <View style={[estilos.contenedor, { borderBottomColor: colores.borde }]}>
      <View style={[estilos.iconoContenedor, { backgroundColor: colores.accentVerdeTenue }]}>
        <Ionicons name={icono} size={20} color={colores.accentVerde} />
      </View>
      <View style={estilos.info}>
        <Text style={[estilos.nombre, { color: colores.textoPrimario }]} numberOfLines={1}>{nombre}</Text>
        <Text style={[estilos.fecha, { color: colores.textoSecundario }]}>{fecha}</Text>
      </View>
      <Text style={[estilos.monto, esGasto ? { color: colores.peligro } : { color: colores.accentVerde }]}>
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
  },
  iconoContenedor: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  fecha: {
    fontSize: 12,
  },
  monto: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TransaccionItem;
