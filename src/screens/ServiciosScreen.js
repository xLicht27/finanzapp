import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MetaAhorroCard from '../components/MetaAhorroCard';
import { COLORES } from '../constants/theme';

const metas = [
  { id: '1', nombre: 'Viaje a Japón', montoActual: 4500, montoObjetivo: 8500, fechaLimite: 'Dic 2026', estado: 'En progreso' },
  { id: '2', nombre: 'Enganche Casa', montoActual: 12000, montoObjetivo: 60000, fechaLimite: 'Mar 2027', estado: 'En progreso' },
  { id: '3', nombre: 'Nueva MacBook', montoActual: 2800, montoObjetivo: 3400, fechaLimite: 'Jul 2026', estado: 'Casi listo' },
];

const ServiciosScreen = () => {
  const [diagnosticoEjecutado, setDiagnosticoEjecutado] = useState(false);

  return (
    <ScrollView
      style={estilos.fondoPrincipal}
      contentContainerStyle={estilos.scroll}
      showsVerticalScrollIndicator={false}
    >
      <Text style={estilos.etiquetaSeccion}>SERVICIOS ÚTILES PARA EL AHORRO</Text>

      <View style={estilos.tarjeta}>
        <View style={estilos.encabezadoMetas}>
          <View style={estilos.iconoMetasContenedor}>
            <Ionicons name="flag-outline" size={20} color={COLORES.accentVerde} />
          </View>
          <Text style={estilos.tituloMetas}>Metas de Ahorro</Text>
          <Text style={estilos.subtituloMetas}>Progresa hacia tus objetivos financieros.</Text>
        </View>

        {metas.map((meta) => (
          <MetaAhorroCard
            key={meta.id}
            nombre={meta.nombre}
            montoActual={meta.montoActual}
            montoObjetivo={meta.montoObjetivo}
            fechaLimite={meta.fechaLimite}
            estado={meta.estado}
          />
        ))}

        <TouchableOpacity style={estilos.botonAgregarMeta}>
          <Ionicons name="add" size={22} color={COLORES.accentVerde} />
        </TouchableOpacity>
      </View>

      <View style={estilos.tarjetaAI}>
        <View style={estilos.encabezadoAI}>
          <Ionicons name="flash" size={16} color={COLORES.accentVerde} />
          <Text style={estilos.tituloAI}>OPTIMIZACIÓN AI</Text>
        </View>
        <Text style={estilos.tituloAnalisis}>Análisis de Cartera</Text>
        <Text style={estilos.descripcionAI}>
          Permite que la IA te dé un análisis completo sobre los gastos realizados y te otorgue recomendaciones.
        </Text>

        <TouchableOpacity
          style={[estilos.botonDiagnostico, diagnosticoEjecutado && estilos.botonDiagnosticoEjecutado]}
          onPress={() => setDiagnosticoEjecutado(true)}
        >
          <Text style={estilos.textoBotonDiagnostico}>
            {diagnosticoEjecutado ? '✓ DIAGNÓSTICO COMPLETADO' : 'EJECUTAR DIAGNÓSTICO'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  fondoPrincipal: {
    flex: 1,
    backgroundColor: COLORES.fondoPrimario,
  },
  scroll: {
    padding: 20,
    paddingBottom: 30,
  },
  etiquetaSeccion: {
    color: COLORES.textoSecundario,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  tarjeta: {
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  encabezadoMetas: {
    marginBottom: 16,
  },
  iconoMetasContenedor: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: COLORES.accentVerdeTenue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  tituloMetas: {
    color: COLORES.textoPrimario,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtituloMetas: {
    color: COLORES.textoSecundario,
    fontSize: 12,
  },
  botonAgregarMeta: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORES.accentVerdeTenue,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: COLORES.accentVerde,
    marginTop: 4,
  },
  tarjetaAI: {
    backgroundColor: '#0D2B1E',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORES.accentVerde,
  },
  encabezadoAI: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  tituloAI: {
    color: COLORES.accentVerde,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  tituloAnalisis: {
    color: COLORES.textoPrimario,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  descripcionAI: {
    color: COLORES.textoSecundario,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  botonDiagnostico: {
    backgroundColor: COLORES.accentVerde,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botonDiagnosticoEjecutado: {
    backgroundColor: '#0D5E3E',
  },
  textoBotonDiagnostico: {
    color: '#0D1117',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default ServiciosScreen;
