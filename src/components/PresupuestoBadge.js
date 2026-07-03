import React from 'react';
import { View, Text } from 'react-native';
import { useTema } from '../context/TemaContext';
import { presupuestoBadgeEstilos } from '../styles/componentes';

const PresupuestoBadge = ({ presupuesto, moneda, cargando }) => {
  const { colores } = useTema();
  const estilos = presupuestoBadgeEstilos(colores);

  return (
    <View style={[estilos.contenedor, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
      <Text style={[estilos.etiqueta, { color: colores.textoSecundario }]}>PRESUPUESTO DIARIO RESTANTE</Text>
      {cargando ? (
        <Text style={[estilos.cargando, { color: colores.textoSecundario }]}>Calculando...</Text>
      ) : (
        <Text style={[estilos.monto, { color: colores.textoPrimario }]}>
          {moneda} {presupuesto}
        </Text>
      )}
      <Text style={[estilos.subtexto, { color: colores.accentVerde }]}>✓ Buen ritmo hoy</Text>
    </View>
  );
};

export default PresupuestoBadge;
