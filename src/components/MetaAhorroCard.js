import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTema } from '../context/TemaContext';

const MetaAhorroCard = ({ nombre, montoActual, montoObjetivo, fechaLimite, estado }) => {
  const { colores } = useTema();
  const progreso = Math.min(montoActual / montoObjetivo, 1);
  const porcentaje = Math.round(progreso * 100);

  return (
    <View style={[estilos.contenedor, { backgroundColor: colores.fondoTarjeta2, borderColor: colores.borde }]}>
      <View style={estilos.encabezado}>
        <View style={estilos.infoIzquierda}>
          <Text style={[estilos.nombre, { color: colores.textoPrimario }]}>{nombre}</Text>
          <Text style={[estilos.estado, { color: colores.textoSecundario }]}>{estado}</Text>
        </View>
        <Text style={[estilos.montoActual, { color: colores.accentVerde }]}>${montoActual.toLocaleString()}</Text>
      </View>

      <View style={[estilos.barraContenedor, { backgroundColor: colores.borde }]}>
        <View style={[estilos.barraRelleno, { width: `${porcentaje}%`, backgroundColor: colores.accentVerde }]} />
      </View>

      <View style={estilos.piePagina}>
        <Text style={[estilos.textoMeta, { color: colores.textoSecundario }]}>
          Objetivo: ${montoObjetivo.toLocaleString()}
        </Text>
        <Text style={[estilos.textoFecha, { color: colores.textoSecundario }]}>Plazo: {fechaLimite}</Text>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
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
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  estado: {
    fontSize: 11,
  },
  montoActual: {
    fontSize: 16,
    fontWeight: '700',
  },
  barraContenedor: {
    height: 5,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  barraRelleno: {
    height: '100%',
    borderRadius: 3,
  },
  piePagina: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textoMeta: {
    fontSize: 11,
  },
  textoFecha: {
    fontSize: 11,
  },
});

export default MetaAhorroCard;
