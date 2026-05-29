import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORES } from '../constants/theme';

const PresupuestoBadge = ({ presupuesto, moneda, cargando }) => (
  <View style={estilos.contenedor}>
    <Text style={estilos.etiqueta}>PRESUPUESTO DIARIO RESTANTE</Text>
    {cargando ? (
      <Text style={estilos.cargando}>Calculando...</Text>
    ) : (
      <Text style={estilos.monto}>
        {moneda} {presupuesto}
      </Text>
    )}
    <Text style={estilos.subtexto}>✓ Buen ritmo hoy</Text>
  </View>
);

const estilos = StyleSheet.create({
  contenedor: {
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  etiqueta: {
    color: COLORES.textoSecundario,
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 6,
    fontWeight: '600',
  },
  monto: {
    color: COLORES.textoPrimario,
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 4,
  },
  cargando: {
    color: COLORES.textoSecundario,
    fontSize: 18,
    marginBottom: 4,
  },
  subtexto: {
    color: COLORES.accentVerde,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default PresupuestoBadge;
