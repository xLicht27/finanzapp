import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, Alert, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useTema } from '../context/TemaContext';
import { obtenerEstilosGlobales } from '../styles/globales';
import { serviciosEstilos } from '../styles/ServiciosScreenEstilos';
import MetaAhorroCard from '../components/MetaAhorroCard';

const CLAVE_METAS = 'finanzaap_metas';

const metasIniciales = [
  { id: '1', nombre: 'Viaje a Japón', montoActual: 4500, montoObjetivo: 8500, fechaLimite: 'Dic 2026', estado: 'En progreso' },
  { id: '2', nombre: 'Enganche Casa', montoActual: 12000, montoObjetivo: 60000, fechaLimite: 'Mar 2027', estado: 'En progreso' },
  { id: '3', nombre: 'Nueva MacBook', montoActual: 2800, montoObjetivo: 3400, fechaLimite: 'Jul 2026', estado: 'Casi listo' },
];

const ServiciosScreen = () => {
  const { colores, t } = useTema();
  const estilosComunes = obtenerEstilosGlobales(colores);
  const estilos = serviciosEstilos(colores);

  const [metas, setMetas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [metaSeleccionada, setMetaSeleccionada] = useState(null);
  const [diagnosticoEjecutado, setDiagnosticoEjecutado] = useState(false);
  const [camaraVisible, setCamaraVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [montoActual, setMontoActual] = useState('');
  const [montoObjetivo, setMontoObjetivo] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [guardando, setGuardando] = useState(false);

  const swipeableRefs = useRef({});
  const refCamara = useRef(null);
  const [permiso, solicitarPermiso] = useCameraPermissions();

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

  const ejecutarDiagnosticoIA = async () => {
    setDiagnosticoEjecutado(true);
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '¡Optimización Completa!',
          body: 'Tu reporte de IA ya está listo.',
          sound: true,
        },
        trigger: null,
      });
    }
  };

  const activarCamara = async () => {
    const { status } = await solicitarPermiso();
    if (status === 'granted') {
      setCamaraVisible(true);
    } else {
      Alert.alert('Permiso Denegado', 'Se requiere acceso a la cámara para escanear comprobantes físicos.');
    }
  };

  const capturarFoto = async () => {
    if (refCamara.current) {
      try {
        await refCamara.current.takePictureAsync();
        setCamaraVisible(false);
        Alert.alert('Escaneo', 'Comprobante escaneado con éxito');
        
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: '¡Recibo Procesado!',
              body: 'Se ha registrado un gasto de S/. 25.50 en la categoría Alimentos.',
              sound: true,
            },
            trigger: null,
          });
        }
      } catch (err) {
        Alert.alert('Error', 'No se pudo capturar la fotografía del comprobante.');
      }
    }
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

  if (camaraVisible) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <CameraView
          style={{ flex: 1 }}
          ref={refCamara}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 50 }}>
            <View style={{ flexDirection: 'row', gap: 24 }}>
              <TouchableOpacity
                style={{ backgroundColor: colores.peligro, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 10 }}
                onPress={() => setCamaraVisible(false)}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: colores.accentVerde, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 10 }}
                onPress={capturarFoto}
              >
                <Text style={{ color: colores.fondoPrimario, fontWeight: '700', fontSize: 14 }}>Tomar Foto</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={estilosComunes.fondoPrincipal}
        contentContainerStyle={estilosComunes.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[estilos.etiquetaSeccion, { color: colores.textoSecundario }]}>{t('serviciosUtiles')}</Text>

        <View style={[estilosComunes.tarjeta, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
          <View style={estilos.encabezadoMetas}>
            <View style={[estilos.iconoMetasContenedor, { backgroundColor: colores.accentVerdeTenue }]}>
              <Ionicons name="flag-outline" size={20} color={colores.accentVerde} />
            </View>
            <Text style={[estilos.tituloMetas, { color: colores.textoPrimario }]}>{t('metasAhorro')}</Text>
            <View style={estilos.filaSubtitulo}>
              <Text style={[estilos.subtituloMetas, { color: colores.textoSecundario }]}>{t('deslizaTarjeta')}</Text>
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

          <TouchableOpacity
            style={[estilos.botonAgregarMeta, { backgroundColor: colores.accentVerdeTenue, borderColor: colores.accentVerde }]}
            onPress={abrirModalCrear}
          >
            <Ionicons name="add" size={22} color={colores.accentVerde} />
          </TouchableOpacity>
        </View>

        <View style={[estilos.tarjetaAI, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde, marginBottom: 16 }]}>
          <View style={estilos.encabezadoAI}>
            <Ionicons name="camera-outline" size={16} color={colores.accentVerde} />
            <Text style={[estilos.tituloAI, { color: colores.accentVerde }]}>ESCÁNER FÍSICO</Text>
          </View>
          <Text style={[estilos.tituloAnalisis, { color: colores.textoPrimario }]}>Escáner de Recibos Físicos</Text>
          <Text style={[estilos.descripcionAI, { color: colores.textoSecundario }]}>
            Registra tus transacciones al instante escaneando la imagen de tus recibos impresos.
          </Text>

          <TouchableOpacity
            style={[
              estilos.botonDiagnostico,
              { backgroundColor: colores.accentVerde }
            ]}
            onPress={activarCamara}
          >
            <Text style={[estilos.textoBotonDiagnostico, { color: colores.fondoPrimario }]}>
              ESCANEAR COMPROBANTE
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[estilos.tarjetaAI, { backgroundColor: colores.accentVerdeTenue, borderColor: colores.accentVerde }]}>
          <View style={estilos.encabezadoAI}>
            <Ionicons name="flash" size={16} color={colores.accentVerde} />
            <Text style={[estilos.tituloAI, { color: colores.accentVerde }]}>{t('optimizacionAi')}</Text>
          </View>
          <Text style={[estilos.tituloAnalisis, { color: colores.textoPrimario }]}>{t('analisisCartera')}</Text>
          <Text style={[estilos.descripcionAI, { color: colores.textoSecundario }]}>
            {t('descripcionAi')}
          </Text>

          <TouchableOpacity
            style={[
              estilos.botonDiagnostico,
              { backgroundColor: colores.accentVerde },
              diagnosticoEjecutado && { backgroundColor: colores.altoContraste ? colores.borde : (colores.modoVisual === 'Claro' ? '#00795F' : '#0D5E3E') }
            ]}
            onPress={ejecutarDiagnosticoIA}
          >
            <Text style={[estilos.textoBotonDiagnostico, { color: colores.fondoPrimario }]}>
              {diagnosticoEjecutado ? t('diagnosticoCompletado') : t('ejecutarDiagnostico')}
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
          <View style={[estilos.modalContenedor, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
            <View style={estilos.modalEncabezado}>
              <Text style={[estilos.modalTitulo, { color: colores.textoPrimario }]}>
                {metaSeleccionada ? t('editarMeta') : t('nuevaMeta')}
              </Text>
              <TouchableOpacity onPress={cerrarModal}>
                <Ionicons name="close" size={22} color={colores.textoSecundario} />
              </TouchableOpacity>
            </View>

            <Text style={[estilos.etiquetaCampo, { color: colores.textoSecundario }]}>{t('nombreMeta')}</Text>
            <TextInput
              style={[estilos.entrada, { backgroundColor: colores.fondoPrimario, borderColor: colores.borde, color: colores.textoPrimario }]}
              placeholder="Ej: Viaje a Europa"
              placeholderTextColor={colores.textoSecundario}
              value={nombre}
              onChangeText={setNombre}
            />

            <Text style={[estilos.etiquetaCampo, { color: colores.textoSecundario }]}>{t('ahorroActual')}</Text>
            <TextInput
              style={[estilos.entrada, { backgroundColor: colores.fondoPrimario, borderColor: colores.borde, color: colores.textoPrimario }]}
              placeholder="0"
              placeholderTextColor={colores.textoSecundario}
              keyboardType="numeric"
              value={montoActual}
              onChangeText={setMontoActual}
            />

            <Text style={[estilos.etiquetaCampo, { color: colores.textoSecundario }]}>{t('montoObjetivo')}</Text>
            <TextInput
              style={[estilos.entrada, { backgroundColor: colores.fondoPrimario, borderColor: colores.borde, color: colores.textoPrimario }]}
              placeholder="Ej: 5000"
              placeholderTextColor={colores.textoSecundario}
              keyboardType="numeric"
              value={montoObjetivo}
              onChangeText={setMontoObjetivo}
            />

            <Text style={[estilos.etiquetaCampo, { color: colores.textoSecundario }]}>{t('plazoOpcional')}</Text>
            <TextInput
              style={[estilos.entrada, { backgroundColor: colores.fondoPrimario, borderColor: colores.borde, color: colores.textoPrimario }]}
              placeholder="Ej: Dic 2026"
              placeholderTextColor={colores.textoSecundario}
              value={fechaLimite}
              onChangeText={setFechaLimite}
            />

            <TouchableOpacity
              style={[
                estilos.botonGuardar,
                { backgroundColor: colores.accentVerde },
                guardando && estilos.botonGuardando
              ]}
              onPress={guardarMeta}
              disabled={guardando}
            >
              <Text style={[estilos.textoBotonGuardar, { color: colores.fondoPrimario }]}>
                {guardando ? '...' : metaSeleccionada ? t('actualizarMeta') : t('guardarMeta')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.botonCancelar} onPress={cerrarModal}>
              <Text style={[estilos.textoBotonCancelar, { color: colores.textoSecundario }]}>{t('cancelar')}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default ServiciosScreen;
