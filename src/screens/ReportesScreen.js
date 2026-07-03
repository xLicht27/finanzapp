import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTema } from '../context/TemaContext';
import CategoriaBar from '../components/CategoriaBar';

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

const ReportesScreen = () => {
  const { colores, t } = useTema();
  const [mesSeleccionado, setMesSeleccionado] = useState('May');

  const mesesTraducidos = t('meses');
  const indiceSeleccionado = MESES.indexOf(mesSeleccionado);

  const categorias = [
    { id: '1', icono: 'home-outline', nombre: t('hogar'), subcategorias: t('hipotecasServicios'), monto: 2100, porcentaje: 45 },
    { id: '2', icono: 'restaurant-outline', nombre: t('alimentacion'), subcategorias: t('superRestaurantes'), monto: 850, porcentaje: 28 },
    { id: '3', icono: 'car-outline', nombre: t('transporte'), subcategorias: t('gasolinaPeajes'), monto: 320, porcentaje: 8 },
  ];

  return (
    <ScrollView
      style={[estilos.fondoPrincipal, { backgroundColor: colores.fondoPrimario }]}
      contentContainerStyle={estilos.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={[estilos.selectorMes, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        {MESES.map((mes, index) => (
          <TouchableOpacity
            key={mes}
            style={[
              estilos.botonMes,
              mesSeleccionado === mes && { backgroundColor: colores.accentVerde }
            ]}
            onPress={() => setMesSeleccionado(mes)}
          >
            <Text style={[
              estilos.textoMes,
              { color: colores.textoSecundario },
              mesSeleccionado === mes && { color: colores.fondoPrimario, fontWeight: '700' }
            ]}>
              {mesesTraducidos[index]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[estilos.tarjeta, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <View style={estilos.encabezadoTarjeta}>
          <Text style={[estilos.subtituloTarjeta, { color: colores.textoSecundario }]}>{t('ahorroMesAnterior')}</Text>
          <View style={[estilos.badge, { backgroundColor: colores.accentVerdeTenue, borderColor: colores.accentVerde }]}>
            <Text style={[estilos.textoBadge, { color: colores.accentVerde }]}>{t('excelente')}</Text>
          </View>
        </View>
        <Text style={[estilos.montoAhorro, { color: colores.accentVerde }]}>+$3,450.00</Text>
        <Text style={[estilos.textoIncremento, { color: colores.accentVerde }]}>↑ 12.5% {t('incremento')}</Text>
      </View>

      <View style={[estilos.tarjeta, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <Text style={[estilos.tituloSeccion, { color: colores.textoPrimario }]}>{t('gastosCategoria')}</Text>

        <View style={estilos.barrasGrafico}>
          {[65, 42, 88, 55, 30].map((altura, i) => (
            <View key={i} style={estilos.columnaBarra}>
              <View style={[estilos.barra, { height: altura, backgroundColor: colores.accentVerde }]} />
            </View>
          ))}
        </View>

        <View style={[estilos.separador, { backgroundColor: colores.borde }]} />
        <Text style={[estilos.tituloSeccion, { marginTop: 4, color: colores.textoPrimario }]}>{t('desgloseDetallado')}</Text>
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
  },
  scroll: {
    padding: 20,
    paddingBottom: 30,
  },
  selectorMes: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
  },
  botonMes: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 7,
  },
  textoMes: {
    fontSize: 12,
    fontWeight: '500',
  },
  tarjeta: {
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
  },
  encabezadoTarjeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtituloTarjeta: {
    fontSize: 13,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  textoBadge: {
    fontSize: 11,
    fontWeight: '600',
  },
  montoAhorro: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  textoIncremento: {
    fontSize: 13,
  },
  tituloSeccion: {
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
    borderRadius: 4,
    opacity: 0.8,
  },
  separador: {
    height: 1,
    marginVertical: 14,
  },
});

export default ReportesScreen;
