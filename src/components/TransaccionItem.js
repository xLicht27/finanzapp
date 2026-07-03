import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/TemaContext';
import { transaccionItemEstilos } from '../styles/componentes';

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
  const estilos = transaccionItemEstilos(colores);
  const esGasto = monto < 0;
  const icono = iconosPorCategoria[categoria] || iconosPorCategoria.otro;

  return (
    <View style={[estilos.contenedor, { borderBottomColor: colores.borde }]}>
      <View style={[estilos.icono, { backgroundColor: colores.accentVerdeTenue }]}>
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

export default TransaccionItem;
