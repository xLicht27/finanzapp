import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTema } from '../context/TemaContext';
import CategoriaBar from '../components/CategoriaBar';
import { obtenerEstilosGlobales } from '../styles/globales';
import { reportesEstilos } from '../styles/ReportesScreenEstilos';

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

const ReportesScreen = () => {
  const { colores, t } = useTema();
  const [mesSeleccionado, setMesSeleccionado] = useState('May');

  const estilosComunes = obtenerEstilosGlobales(colores);
  const estilos = reportesEstilos(colores);

  const mesesTraducidos = t('meses');
  const indiceSeleccionado = MESES.indexOf(mesSeleccionado);

  const categorias = [
    { id: '1', icono: 'home-outline', nombre: t('hogar'), subcategorias: t('hipotecasServicios'), monto: 2100, porcentaje: 45 },
    { id: '2', icono: 'restaurant-outline', nombre: t('alimentacion'), subcategorias: t('superRestaurantes'), monto: 850, porcentaje: 28 },
    { id: '3', icono: 'car-outline', nombre: t('transporte'), subcategorias: t('gasolinaPeajes'), monto: 320, porcentaje: 8 },
  ];

  return (
    <ScrollView
      style={estilosComunes.fondoPrincipal}
      contentContainerStyle={estilosComunes.scroll}
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

      <View style={[estilosComunes.tarjeta, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <View style={estilos.encabezadoTarjeta}>
          <Text style={[estilos.subtituloTarjeta, { color: colores.textoSecundario }]}>{t('ahorroMesAnterior')}</Text>
          <View style={[estilos.badge, { backgroundColor: colores.accentVerdeTenue, borderColor: colores.accentVerde }]}>
            <Text style={[estilos.textoBadge, { color: colores.accentVerde }]}>{t('excelente')}</Text>
          </View>
        </View>
        <Text style={[estilos.montoAhorro, { color: colores.accentVerde }]}>+$3,450.00</Text>
        <Text style={[estilos.textoIncremento, { color: colores.accentVerde }]}>↑ 12.5% {t('incremento')}</Text>
      </View>

      <View style={[estilosComunes.tarjeta, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <Text style={[estilosComunes.tituloItem, { fontSize: 15, fontWeight: '600', marginBottom: 14 }]}>{t('gastosCategoria')}</Text>

        <View style={estilos.barrasGrafico}>
          {[65, 42, 88, 55, 30].map((altura, i) => (
            <View key={i} style={estilos.columnaBarra}>
              <View style={[estilos.barra, { height: altura, backgroundColor: colores.accentVerde }]} />
            </View>
          ))}
        </View>

        <View style={[estilos.separador, { backgroundColor: colores.borde }]} />
        <Text style={[estilosComunes.tituloItem, { fontSize: 15, fontWeight: '600', marginTop: 4 }]}>{t('desgloseDetallado')}</Text>
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

export default ReportesScreen;
