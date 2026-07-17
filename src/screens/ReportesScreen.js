import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/TemaContext';
import CategoriaBar from '../components/CategoriaBar';
import { exportarReportePDF } from '../services/pdfServicio';
import { obtenerEstilosGlobales } from '../styles/globales';
import { reportesEstilos } from '../styles/ReportesScreenEstilos';

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

const transaccionesIniciales = [
  { id: '1', nombre: 'Almuerzo Ejecutivo', monto: -32.5, categoria: 'comida', fecha: 'Hoy, 14:30' },
  { id: '2', nombre: 'Cafetería Central', monto: -4.2, categoria: 'comida', fecha: 'Hoy, 09:11' },
  { id: '3', nombre: 'Uber Viaje', monto: -15.0, categoria: 'transporte', fecha: 'Ayer, 19:41' },
];

const metasIniciales = [
  { id: '1', nombre: 'Viaje a Japón', montoActual: 4500, montoObjetivo: 8500, fechaLimite: 'Dic 2026', estado: 'En progreso' },
  { id: '2', nombre: 'Enganche Casa', montoActual: 12000, montoObjetivo: 60000, fechaLimite: 'Mar 2027', estado: 'En progreso' },
  { id: '3', nombre: 'Nueva MacBook', montoActual: 2800, montoObjetivo: 3400, fechaLimite: 'Jul 2026', estado: 'Casi listo' },
];

/**
 * Pantalla de Reportes Estadísticos.
 * Muestra el progreso de ahorro mensual, un desglose gráfico por columnas,
 * la distribución de gastos por categoría y permite exportar el reporte en PDF.
 */
const ReportesScreen = () => {
  const { colores, t } = useTema();
  const [mesSeleccionado, setMesSeleccionado] = useState('May');
  const [exportando, setExportando] = useState(false);

  const estilosComunes = obtenerEstilosGlobales(colores);
  const estilos = reportesEstilos(colores);

  const mesesTraducidos = t('meses');

  const categorias = [
    { id: '1', icono: 'home-outline', nombre: t('hogar'), subcategorias: t('hipotecasServicios'), monto: 2100, porcentaje: 45 },
    { id: '2', icono: 'restaurant-outline', nombre: t('alimentacion'), subcategorias: t('superRestaurantes'), monto: 850, porcentaje: 28 },
    { id: '3', icono: 'car-outline', nombre: t('transporte'), subcategorias: t('gasolinaPeajes'), monto: 320, porcentaje: 8 },
  ];

  /**
   * Obtiene la información financiera del dispositivo de forma asíncrona,
   * y llama al servicio de exportación PDF mostrando un indicador de carga.
   */
  const gestionarExportacionPDF = async () => {
    try {
      setExportando(true);
      const guardadasTransacciones = await AsyncStorage.getItem('finanzaap_transacciones');
      const guardadasMetas = await AsyncStorage.getItem('finanzaap_metas');

      const transacciones = guardadasTransacciones ? JSON.parse(guardadasTransacciones) : transaccionesIniciales;
      const metas = guardadasMetas ? JSON.parse(guardadasMetas) : metasIniciales;

      await exportarReportePDF(transacciones, metas, colores);
    } catch (error) {
      Alert.alert('Error', 'No se pudo generar el reporte en PDF.');
    } finally {
      setExportando(false);
    }
  };

  return (
    <ScrollView
      style={estilosComunes.fondoPrincipal}
      contentContainerStyle={estilosComunes.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={estilosComunes.cabecera}>
        <View style={{ width: 30 }} />
        <Text style={estilosComunes.titulo}>Reportes</Text>
        <TouchableOpacity 
          onPress={gestionarExportacionPDF} 
          style={estilosComunes.botonVolver}
          disabled={exportando}
        >
          {exportando ? (
            <ActivityIndicator size="small" color={colores.accentVerde} />
          ) : (
            <Ionicons name="download-outline" size={22} color={colores.textoPrimario} />
          )}
        </TouchableOpacity>
      </View>

      <View style={[estilos.selectorMes, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde, marginTop: 16 }]}>
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
