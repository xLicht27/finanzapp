import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CategoriaBar from '../components/CategoriaBar';
import { COLORES } from '../constants/theme';

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

const categorias = [
  { id: '1', icono: 'home-outline', nombre: 'Hogar', subcategorias: 'Hipotecas, Servicios', monto: 2100, porcentaje: 45 },
  { id: '2', icono: 'restaurant-outline', nombre: 'Alimentación', subcategorias: 'Súper, Restaurantes', monto: 850, porcentaje: 28 },
  { id: '3', icono: 'car-outline', nombre: 'Transporte', subcategorias: 'Gasolina, Peajes', monto: 320, porcentaje: 8 },
];

const ReportesScreen = () => {
  const [mesSeleccionado, setMesSeleccionado] = useState('May');

  return (
    <ScrollView
      style={estilos.fondoPrincipal}
      contentContainerStyle={estilos.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={estilos.selectorMes}>
        {MESES.map((mes) => (
          <TouchableOpacity
            key={mes}
            style={[estilos.botonMes, mesSeleccionado === mes && estilos.botonMesActivo]}
            onPress={() => setMesSeleccionado(mes)}
          >
            <Text style={[estilos.textoMes, mesSeleccionado === mes && estilos.textoMesActivo]}>
              {mes}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={estilos.tarjeta}>
        <View style={estilos.encabezadoTarjeta}>
          <Text style={estilos.subtituloTarjeta}>Ahorro vs Mes Anterior</Text>
          <View style={estilos.badge}>
            <Text style={estilos.textoBadge}>✓ Excelente</Text>
          </View>
        </View>
        <Text style={estilos.montoAhorro}>+$3,450.00</Text>
        <Text style={estilos.textoIncremento}>↑ 12.5% incremento</Text>
      </View>

      <View style={estilos.tarjeta}>
        <Text style={estilos.tituloSeccion}>Gastos por Categoría</Text>

        <View style={estilos.barrasGrafico}>
          {[65, 42, 88, 55, 30].map((altura, i) => (
            <View key={i} style={estilos.columnaBarra}>
              <View style={[estilos.barra, { height: altura }]} />
            </View>
          ))}
        </View>

        <View style={estilos.separador} />
        <Text style={[estilos.tituloSeccion, { marginTop: 4 }]}>Desglose Detallado</Text>
        <View style={{ marginTop: 12 }}>
          {categorias.map((cat) => (
            <CategoriaBar
              key={cat.id}
              icono={cat.icono}
              nombre={cat.nombre}
              subcategorias={cat.subcategorias}
              monto={cat.monto}
              porcentaje={cat.porcentaje}
            />
          ))}
        </View>
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
  selectorMes: {
    flexDirection: 'row',
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  botonMes: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 7,
  },
  botonMesActivo: {
    backgroundColor: COLORES.accentVerde,
  },
  textoMes: {
    color: COLORES.textoSecundario,
    fontSize: 12,
    fontWeight: '500',
  },
  textoMesActivo: {
    color: '#0D1117',
    fontWeight: '700',
  },
  tarjeta: {
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  encabezadoTarjeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtituloTarjeta: {
    color: COLORES.textoSecundario,
    fontSize: 13,
  },
  badge: {
    backgroundColor: COLORES.accentVerdeTenue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORES.accentVerde,
  },
  textoBadge: {
    color: COLORES.accentVerde,
    fontSize: 11,
    fontWeight: '600',
  },
  montoAhorro: {
    color: COLORES.accentVerde,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  textoIncremento: {
    color: COLORES.accentVerde,
    fontSize: 13,
  },
  tituloSeccion: {
    color: COLORES.textoPrimario,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 14,
  },
  barrasGrafico: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 100,
    marginBottom: 16,
  },
  columnaBarra: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 4,
  },
  barra: {
    width: '70%',
    backgroundColor: COLORES.accentVerde,
    borderRadius: 4,
    opacity: 0.8,
  },
  separador: {
    height: 1,
    backgroundColor: COLORES.borde,
    marginVertical: 14,
  },
});

export default ReportesScreen;
