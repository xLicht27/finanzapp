import React from 'react';
import { View, Text } from 'react-native';
import { useTema } from '../context/TemaContext';
import { metaAhorroCardEstilos } from '../styles/componentes';

const MetaAhorroCard = ({ nombre, montoActual, montoObjetivo, fechaLimite, estado }) => {
  const { colores } = useTema();
  const estilos = metaAhorroCardEstilos(colores);
  const progreso = Math.min(montoActual / montoObjetivo, 1);
  const porcentaje = Math.round(progreso * 100);

  return (
    <View style={[estilos.contenedor, { backgroundColor: colores.fondoTarjeta2, borderColor: colores.borde }]}>
      <View style={estilos.encabezado}>
        <View style={estilos.izquierda}>
          <Text style={[estilos.nombre, { color: colores.textoPrimario }]}>{nombre}</Text>
          <Text style={[estilos.estado, { color: colores.textoSecundario }]}>{estado}</Text>
        </View>
        <Text style={[estilos.monto, { color: colores.accentVerde }]}>${montoActual.toLocaleString()}</Text>
      </View>

      <View style={[estilos.barraContenedor, { backgroundColor: colores.borde }]}>
        <View style={[estilos.barraRelleno, { width: `${porcentaje}%`, backgroundColor: colores.accentVerde }]} />
      </View>

      <View style={estilos.pie}>
        <Text style={[estilos.texto, { color: colores.textoSecundario }]}>
          Objetivo: ${montoObjetivo.toLocaleString()}
        </Text>
        <Text style={[estilos.texto, { color: colores.textoSecundario }]}>Plazo: {fechaLimite}</Text>
      </View>
    </View>
  );
};

export default MetaAhorroCard;
