import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { useTema } from '../context/TemaContext';
import { useAuth } from '../context/AuthContext';
import { obtenerEstilosGlobales } from '../styles/globales';
import { privacidadEstilos } from '../styles/AjustesPrivacidadScreenEstilos';

/**
 * Pantalla de Privacidad y Control.
 * Permite configurar las fuentes de acceso de la IA, revocar accesos
 * e integrar seguridad biométrica (FaceID / Huella Dactilar).
 */
const AjustesPrivacidadScreen = ({ navigation }) => {
  const { colores, t } = useTema();
  const { biometriaActiva, cambiarBiometria } = useAuth();
  const estilosComunes = obtenerEstilosGlobales(colores);
  const estilos = privacidadEstilos(colores);

  const [bancoPush, setBancoPush] = useState(true);
  const [gmail, setGmail] = useState(false);
  const [compatibleConBiometria, setCompatibleConBiometria] = useState(false);

  const historialIA = [
    { id: '1', tipo: 'PROCESADO EXITOSO', descripcion: 'Transacción detectada vía SMS (Banco XYZ): Categorización: Supermercado.', tiempo: 'Hace 2 min', color: colores.accentVerde },
    { id: '2', tipo: 'ANÁLISIS EN PAUSA', descripcion: 'Acceso a Gmail delegado por configuración de usuario. Omitiendo escaneo de recibos.', tiempo: 'Hace 1 hora', color: '#F0A500' },
    { id: '3', tipo: 'SINCRONIZACIÓN', descripcion: 'Resumen diario generado: 3 nuevas transacciones añadidas al flujo Zero-Entry.', tiempo: 'Ayer, 23:45', color: colores.accentVerde },
  ];

  useEffect(() => {
    verificarHardwareBiometrico();
  }, []);

  /**
   * Comprueba si el hardware del dispositivo móvil admite biometría
   * y si el usuario tiene alguna huella o rostro registrado.
   */
  const verificarHardwareBiometrico = async () => {
    try {
      const tieneHardware = await LocalAuthentication.hasHardwareAsync();
      const estaEnrolado = await LocalAuthentication.isEnrolledAsync();
      setCompatibleConBiometria(tieneHardware && estaEnrolado);
    } catch (e) {
      setCompatibleConBiometria(false);
    }
  };

  /**
   * Activa o desactiva la seguridad biométrica solicitando confirmación
   * mediante la interfaz nativa del sistema operativo.
   * 
   * @param {boolean} nuevoValor - Indica si se desea activar o desactivar la biometría.
   */
  const toggleBiometria = async (nuevoValor) => {
    try {
      const resultado = await LocalAuthentication.authenticateAsync({
        promptMessage: nuevoValor
          ? 'Confirma tu identidad para activar el acceso biométrico'
          : 'Confirma tu identidad para desactivar el acceso biométrico',
        cancelLabel: 'Cancelar',
        disableDeviceFallback: false,
      });

      if (resultado.success) {
        await cambiarBiometria(nuevoValor);
      } else {
        Alert.alert('Autenticación fallida', 'No se pudo verificar la identidad.');
      }
    } catch (e) {
      Alert.alert('Error', 'Ocurrió un error al acceder a la biometría.');
    }
  };

  const revocarPermisos = () => {
    Alert.alert(
      "Revocar Permisos",
      "¿Estás seguro de que deseas revocar todos los accesos a tus fuentes de datos? La IA dejará de registrar transacciones automáticamente.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Revocar",
          style: "destructive",
          onPress: () => {
            setBancoPush(false);
            setGmail(false);
          }
        }
      ]
    );
  };

  return (
    <ScrollView
      style={estilosComunes.fondoPrincipal}
      contentContainerStyle={estilosComunes.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={estilosComunes.cabecera}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={estilosComunes.botonVolver}>
          <Ionicons name="chevron-back" size={22} color={colores.textoPrimario} />
        </TouchableOpacity>
        <Text style={estilosComunes.titulo}>{t('privacidadControl')}</Text>
        <View style={{ width: 30 }} />
      </View>

      <Text style={estilosComunes.tituloSeccion}>{t('privacidadControl')}</Text>
      <Text style={[estilos.descripcionSeccion, { color: colores.textoSecundario }]}>
        Gestiona cómo FinanZaap accede y procesa tu información financiera.
      </Text>

      <View style={[estilosComunes.tarjeta, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <Text style={[estilos.etiquetaTarjeta, { color: colores.textoPrimario }]}>Seguridad de Acceso</Text>
        <Text style={[estilos.descripcionTarjeta, { color: colores.textoSecundario }]}>
          Protege el ingreso a tu aplicación financiera mediante biometría nativa del dispositivo.
        </Text>

        <View style={[estilos.itemFuente, { borderBottomWidth: 0 }]}>
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="finger-print-outline" size={18} color={colores.accentVerde} />
          </View>
          <View style={estilos.infoFuente}>
            <Text style={[estilos.nombreFuente, { color: colores.textoPrimario }]}>Autenticación Biométrica</Text>
            <Text style={[estilos.descripcionFuente, { color: colores.textoSecundario }]}>
              {compatibleConBiometria 
                ? 'Habilitar huella dactilar o reconocimiento facial' 
                : 'No disponible o sin configurar en el sistema'}
            </Text>
          </View>
          <Switch
            value={biometriaActiva}
            onValueChange={toggleBiometria}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
            disabled={!compatibleConBiometria}
          />
        </View>
      </View>

      <View style={[estilosComunes.tarjeta, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <Text style={[estilos.etiquetaTarjeta, { color: colores.textoPrimario }]}>Fuentes de Datos</Text>
        <Text style={[estilos.descripcionTarjeta, { color: colores.textoSecundario }]}>
          Controla los canales desde donde la IA extrae información transaccional automáticamente.
        </Text>

        <View style={[estilos.itemFuente, { borderBottomColor: colores.borde }]}>
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="phone-portrait-outline" size={18} color={colores.accentVerde} />
          </View>
          <View style={estilos.infoFuente}>
            <Text style={[estilos.nombreFuente, { color: colores.textoPrimario }]}>Notificaciones de Banco</Text>
            <Text style={[estilos.descripcionFuente, { color: colores.textoSecundario }]}>Lectura de SMS y Push</Text>
          </View>
          <Switch
            value={bancoPush}
            onValueChange={setBancoPush}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={[estilos.itemFuente, { borderBottomWidth: 0 }]}>
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="mail-outline" size={18} color={colores.accentVerde} />
          </View>
          <View style={estilos.infoFuente}>
            <Text style={[estilos.nombreFuente, { color: colores.textoPrimario }]}>Gmail</Text>
            <Text style={[estilos.descripcionFuente, { color: colores.textoSecundario }]}>Análisis de recibos y facturas</Text>
          </View>
          <Switch
            value={gmail}
            onValueChange={setGmail}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View style={[estilos.tarjetaPeligro, { borderColor: '#F0A500' }]}>
        <View style={estilos.encabezadoPeligro}>
          <Ionicons name="warning-outline" size={16} color="#F0A500" />
          <Text style={[estilos.tituloPeligro, { color: '#F0A500' }]}>Zona de Peligro</Text>
        </View>
        <Text style={[estilos.descripcionPeligro, { color: colores.textoSecundario }]}>
          Esta acción eliminará todos los accesos de la IA a tus fuentes de datos. La aplicación dejará de registrar transacciones automáticamente.
        </Text>
        <TouchableOpacity style={[estilos.botonRevocar, { borderColor: colores.peligro }]} onPress={revocarPermisos}>
          <Text style={[estilos.textoRevocar, { color: colores.peligro }]}>REVOCAR TODOS LOS PERMISOS</Text>
        </TouchableOpacity>
      </View>

      <View style={[estilosComunes.tarjeta, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <View style={estilos.encabezadoHistorial}>
          <Text style={[estilos.etiquetaTarjeta, { color: colores.textoPrimario }]}>Historial de IA</Text>
          <View style={[estilos.badgeLog, { backgroundColor: colores.accentVerdeTenue, borderColor: colores.accentVerde }]}>
            <Text style={[estilos.textoLog, { color: colores.accentVerde }]}>Log Activo</Text>
          </View>
        </View>
        <Text style={[estilos.descripcionTarjeta, { color: colores.textoSecundario }]}>Registro de procesamiento de datos en tiempo real.</Text>

        {historialIA.map((item) => (
          <View key={item.id} style={estilos.itemHistorial}>
            <View style={[estilos.puntito, { backgroundColor: item.color }]} />
            <View style={estilos.infoHistorial}>
              <View style={estilos.encabezadoItem}>
                <Text style={[estilos.tipoHistorial, { color: item.color }]}>{item.tipo}</Text>
                <Text style={[estilos.tiempoHistorial, { color: colores.textoSecundario }]}>{item.tiempo}</Text>
              </View>
              <Text style={[estilos.descripcionHistorial, { color: colores.textoSecundario }]}>{item.descripcion}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AjustesPrivacidadScreen;
