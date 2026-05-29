import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORES } from '../constants/theme';

const MetaAhorroCard = ({ nombre, montoActual, montoObjetivo, fechaLimite, estado }) => {
  const progreso = Math.min(montoActual / montoObjetivo, 1);
  const porcentaje = Math.round(progreso * 100);

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.encabezado}>
        <View style={estilos.infoIzquierda}>
          <Text style={estilos.nombre}>{nombre}</Text>
          <Text style={estilos.estado}>{estado}</Text>
        </View>
        <Text style={estilos.montoActual}>${montoActual.toLocaleString()}</Text>
      </View>

      <View style={estilos.barraContenedor}>
        <View style={[estilos.barraRelleno, { width: `${porcentaje}%` }]} />
      </View>

      <View style={estilos.piePagina}>
        <Text style={estilos.textoMeta}>
          Objetivo: ${montoObjetivo.toLocaleString()}
        </Text>
        <Text style={estilos.textoFecha}>Plazo: {fechaLimite}</Text>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    backgroundColor: COLORES.fondoTarjeta2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  infoIzquierda: {
    flex: 1,
  },
  nombre: {
    color: COLORES.textoPrimario,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  estado: {
    color: COLORES.textoSecundario,
    fontSize: 11,
  },
  montoActual: {
    color: COLORES.accentVerde,
    fontSize: 16,
    fontWeight: '700',
  },
  barraContenedor: {
    height: 5,
    backgroundColor: COLORES.borde,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  barraRelleno: {
    height: '100%',
    backgroundColor: COLORES.accentVerde,
    borderRadius: 3,
  },
  piePagina: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textoMeta: {
    color: COLORES.textoSecundario,
    fontSize: 11,
  },
  textoFecha: {
    color: COLORES.textoSecundario,
    fontSize: 11,
  },
});

export default MetaAhorroCard;
