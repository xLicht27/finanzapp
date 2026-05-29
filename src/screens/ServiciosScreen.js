import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Modal, TextInput, KeyboardAvoidingView, Platform, Alert, Animated,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import MetaAhorroCard from '../components/MetaAhorroCard';
import { COLORES } from '../constants/theme';

const CLAVE_METAS = 'finanzaap_metas';

const metasIniciales = [
  { id: '1', nombre: 'Viaje a Japón', montoActual: 4500, montoObjetivo: 8500, fechaLimite: 'Dic 2026', estado: 'En progreso' },
  { id: '2', nombre: 'Enganche Casa', montoActual: 12000, montoObjetivo: 60000, fechaLimite: 'Mar 2027', estado: 'En progreso' },
  { id: '3', nombre: 'Nueva MacBook', montoActual: 2800, montoObjetivo: 3400, fechaLimite: 'Jul 2026', estado: 'Casi listo' },
];

const ServiciosScreen = () => {
  const [metas, setMetas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [metaSeleccionada, setMetaSeleccionada] = useState(null);
  const [diagnosticoEjecutado, setDiagnosticoEjecutado] = useState(false);
  const [nombre, setNombre] = useState('');
  const [montoActual, setMontoActual] = useState('');
  const [montoObjetivo, setMontoObjetivo] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [guardando, setGuardando] = useState(false);

  const swipeableRefs = useRef({});

  useEffect(() => {
    cargarMetas();
  }, []);

  const cargarMetas = async () => {
    try {
      const guardadas = await AsyncStorage.getItem(CLAVE_METAS);
      if (guardadas) {
        setMetas(JSON.parse(guardadas));
      } else {
        await AsyncStorage.setItem(CLAVE_METAS, JSON.stringify(metasIniciales));
        setMetas(metasIniciales);
      }
    } catch (error) {
      setMetas(metasIniciales);
    }
  };

  const cerrarTodosLosSwipes = () => {
    Object.values(swipeableRefs.current).forEach((ref) => ref?.close());
  };

  const abrirModalCrear = () => {
    cerrarTodosLosSwipes();
    setMetaSeleccionada(null);
    setNombre('');
    setMontoActual('');
    setMontoObjetivo('');
    setFechaLimite('');
    setModalVisible(true);
  };

  const abrirModalEditar = (meta) => {
    cerrarTodosLosSwipes();
    setMetaSeleccionada(meta);
    setNombre(meta.nombre);
    setMontoActual(meta.montoActual.toString());
    setMontoObjetivo(meta.montoObjetivo.toString());
    setFechaLimite(meta.fechaLimite === 'Sin plazo' ? '' : meta.fechaLimite);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setMetaSeleccionada(null);
  };

  const guardarMeta = async () => {
    if (!nombre.trim()) {
      Alert.alert('Campo requerido', 'El nombre de la meta es obligatorio.');
      return;
    }
    if (!montoObjetivo.trim() || isNaN(Number(montoObjetivo))) {
      Alert.alert('Monto inválido', 'Ingresa un monto objetivo válido.');
      return;
    }

    setGuardando(true);

    let metasActualizadas;

    if (metaSeleccionada) {
      metasActualizadas = metas.map((m) =>
        m.id === metaSeleccionada.id
          ? {
              ...m,
              nombre: nombre.trim(),
              montoActual: Number(montoActual) || 0,
              montoObjetivo: Number(montoObjetivo),
              fechaLimite: fechaLimite.trim() || 'Sin plazo',
            }
          : m
      );
    } else {
      const nuevaMeta = {
        id: Date.now().toString(),
        nombre: nombre.trim(),
        montoActual: Number(montoActual) || 0,
        montoObjetivo: Number(montoObjetivo),
        fechaLimite: fechaLimite.trim() || 'Sin plazo',
        estado: 'En progreso',
      };
      metasActualizadas = [...metas, nuevaMeta];
    }

    try {
      await AsyncStorage.setItem(CLAVE_METAS, JSON.stringify(metasActualizadas));
      setMetas(metasActualizadas);
      cerrarModal();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la meta.');
    } finally {
      setGuardando(false);
    }
  };

  const eliminarMeta = (id) => {
    cerrarTodosLosSwipes();
    Alert.alert(
      'Eliminar Meta',
      '¿Estás seguro de que deseas eliminar esta meta de ahorro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const filtradas = metas.filter((m) => m.id !== id);
            await AsyncStorage.setItem(CLAVE_METAS, JSON.stringify(filtradas));
            setMetas(filtradas);
          },
        },
      ]
    );
  };

  const renderAccionesSwipe = (meta, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-160, -80],
      outputRange: [1, 0.85],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[estilos.contenedorAcciones, { transform: [{ scale }] }]}>
        <TouchableOpacity
          style={estilos.accionEditar}
          onPress={() => abrirModalEditar(meta)}
        >
          <Ionicons name="pencil" size={18} color="#fff" />
          <Text style={estilos.textoAccion}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.accionEliminar}
          onPress={() => eliminarMeta(meta.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#fff" />
          <Text style={estilos.textoAccion}>Borrar</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <>
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
            <View style={estilos.filaSubtitulo}>
              <Text style={estilos.subtituloMetas}>Desliza una tarjeta para editar o eliminar.</Text>
            </View>
          </View>

          {metas.map((meta) => (
            <Swipeable
              key={meta.id}
              ref={(ref) => { swipeableRefs.current[meta.id] = ref; }}
              renderRightActions={(_, dragX) => renderAccionesSwipe(meta, dragX)}
              rightThreshold={60}
              overshootRight={false}
            >
              <MetaAhorroCard
                nombre={meta.nombre}
                montoActual={meta.montoActual}
                montoObjetivo={meta.montoObjetivo}
                fechaLimite={meta.fechaLimite}
                estado={meta.estado}
              />
            </Swipeable>
          ))}

          <TouchableOpacity style={estilos.botonAgregarMeta} onPress={abrirModalCrear}>
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

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={cerrarModal}
      >
        <KeyboardAvoidingView
          style={estilos.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={estilos.modalContenedor}>
            <View style={estilos.modalEncabezado}>
              <Text style={estilos.modalTitulo}>
                {metaSeleccionada ? 'Editar Meta' : 'Nueva Meta de Ahorro'}
              </Text>
              <TouchableOpacity onPress={cerrarModal}>
                <Ionicons name="close" size={22} color={COLORES.textoSecundario} />
              </TouchableOpacity>
            </View>

            <Text style={estilos.etiquetaCampo}>Nombre de la meta</Text>
            <TextInput
              style={estilos.entrada}
              placeholder="Ej: Viaje a Europa"
              placeholderTextColor={COLORES.textoSecundario}
              value={nombre}
              onChangeText={setNombre}
            />

            <Text style={estilos.etiquetaCampo}>Ahorro actual ($)</Text>
            <TextInput
              style={estilos.entrada}
              placeholder="0"
              placeholderTextColor={COLORES.textoSecundario}
              keyboardType="numeric"
              value={montoActual}
              onChangeText={setMontoActual}
            />

            <Text style={estilos.etiquetaCampo}>Monto objetivo ($)</Text>
            <TextInput
              style={estilos.entrada}
              placeholder="Ej: 5000"
              placeholderTextColor={COLORES.textoSecundario}
              keyboardType="numeric"
              value={montoObjetivo}
              onChangeText={setMontoObjetivo}
            />

            <Text style={estilos.etiquetaCampo}>Plazo (opcional)</Text>
            <TextInput
              style={estilos.entrada}
              placeholder="Ej: Dic 2026"
              placeholderTextColor={COLORES.textoSecundario}
              value={fechaLimite}
              onChangeText={setFechaLimite}
            />

            <TouchableOpacity
              style={[estilos.botonGuardar, guardando && estilos.botonGuardando]}
              onPress={guardarMeta}
              disabled={guardando}
            >
              <Text style={estilos.textoBotonGuardar}>
                {guardando ? 'Guardando...' : metaSeleccionada ? 'Actualizar Meta' : 'Guardar Meta'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.botonCancelar} onPress={cerrarModal}>
              <Text style={estilos.textoBotonCancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
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
  filaSubtitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
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
    fontSize: 11,
  },
  contenedorAcciones: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    gap: 2,
  },
  accionEditar: {
    width: 72,
    height: '100%',
    backgroundColor: '#1A6B4A',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRadius: 10,
  },
  accionEliminar: {
    width: 72,
    height: '100%',
    backgroundColor: '#7B1F1F',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRadius: 10,
  },
  textoAccion: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalContenedor: {
    backgroundColor: COLORES.fondoTarjeta,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderColor: COLORES.borde,
  },
  modalEncabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitulo: {
    color: COLORES.textoPrimario,
    fontSize: 17,
    fontWeight: '700',
  },
  etiquetaCampo: {
    color: COLORES.textoSecundario,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
    marginTop: 12,
  },
  entrada: {
    backgroundColor: COLORES.fondoPrimario,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORES.borde,
    color: COLORES.textoPrimario,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  botonGuardar: {
    backgroundColor: COLORES.accentVerde,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  botonGuardando: {
    opacity: 0.6,
  },
  textoBotonGuardar: {
    color: '#0D1117',
    fontSize: 15,
    fontWeight: '700',
  },
  botonCancelar: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotonCancelar: {
    color: COLORES.textoSecundario,
    fontSize: 14,
  },
});

export default ServiciosScreen;
