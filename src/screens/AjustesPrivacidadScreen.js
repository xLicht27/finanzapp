import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORES } from '../constants/theme';

const historialIA = [
  { id: '1', tipo: 'PROCESADO EXITOSO', descripcion: 'Transacción detectada vía SMS (Banco XYZ): Categorización: Supermercado.', tiempo: 'Hace 2 min', color: COLORES.accentVerde },
  { id: '2', tipo: 'ANÁLISIS EN PAUSA', descripcion: 'Acceso a Gmail delegado por configuración de usuario. Omitiendo escaneo de recibos.', tiempo: 'Hace 1 hora', color: '#F0A500' },
  { id: '3', tipo: 'SINCRONIZACIÓN', descripcion: 'Resumen diario generado: 3 nuevas transacciones añadidas al flujo Zero-Entry.', tiempo: 'Ayer, 23:45', color: COLORES.accentVerde },
];

const AjustesPrivacidadScreen = ({ navigation }) => {
  const [bancoPush, setBancoPush] = useState(true);
  const [gmail, setGmail] = useState(false);

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
      style={estilos.fondoPrincipal}
      contentContainerStyle={estilos.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={estilos.cabecera}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonVolver}>
          <Ionicons name="chevron-back" size={22} color={COLORES.textoPrimario} />
        </TouchableOpacity>
        <Text style={estilos.titulo}>Privacidad y Control</Text>
        <View style={{ width: 30 }} />
      </View>

      <Text style={estilos.tituloSeccion}>Privacidad y Control</Text>
      <Text style={estilos.descripcionSeccion}>
        Gestiona cómo FinanZaap accede y procesa tu información financiera.
      </Text>

      <View style={estilos.tarjeta}>
        <Text style={estilos.etiquetaTarjeta}>Fuentes de Datos</Text>
        <Text style={estilos.descripcionTarjeta}>
          Controla los canales desde donde la IA extrae información transaccional automáticamente.
        </Text>

        <View style={estilos.itemFuente}>
          <View style={estilos.iconoFuente}>
            <Ionicons name="phone-portrait-outline" size={18} color={COLORES.accentVerde} />
          </View>
          <View style={estilos.infoFuente}>
            <Text style={estilos.nombreFuente}>Notificaciones de Banco</Text>
            <Text style={estilos.descripcionFuente}>Lectura de SMS y Push</Text>
          </View>
          <Switch
            value={bancoPush}
            onValueChange={setBancoPush}
            trackColor={{ false: COLORES.borde, true: COLORES.accentVerde }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={[estilos.itemFuente, { borderBottomWidth: 0 }]}>
          <View style={estilos.iconoFuente}>
            <Ionicons name="mail-outline" size={18} color={COLORES.accentVerde} />
          </View>
          <View style={estilos.infoFuente}>
            <Text style={estilos.nombreFuente}>Gmail</Text>
            <Text style={estilos.descripcionFuente}>Análisis de recibos y facturas</Text>
          </View>
          <Switch
            value={gmail}
            onValueChange={setGmail}
            trackColor={{ false: COLORES.borde, true: COLORES.accentVerde }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View style={estilos.tarjetaPeligro}>
        <View style={estilos.encabezadoPeligro}>
          <Ionicons name="warning-outline" size={16} color="#F0A500" />
          <Text style={estilos.tituloPeligro}>Zona de Peligro</Text>
        </View>
        <Text style={estilos.descripcionPeligro}>
          Esta acción eliminará todos los accesos de la IA a tus fuentes de datos. La aplicación dejará de registrar transacciones automáticamente.
        </Text>
        <TouchableOpacity style={estilos.botonRevocar} onPress={revocarPermisos}>
          <Text style={estilos.textoRevocar}>REVOCAR TODOS LOS PERMISOS</Text>
        </TouchableOpacity>
      </View>

      <View style={estilos.tarjeta}>
        <View style={estilos.encabezadoHistorial}>
          <Text style={estilos.etiquetaTarjeta}>Historial de IA</Text>
          <View style={estilos.badgeLog}>
            <Text style={estilos.textoLog}>Log Activo</Text>
          </View>
        </View>
        <Text style={estilos.descripcionTarjeta}>Registro de procesamiento de datos en tiempo real.</Text>

        {historialIA.map((item) => (
          <View key={item.id} style={estilos.itemHistorial}>
            <View style={[estilos.puntito, { backgroundColor: item.color }]} />
            <View style={estilos.infoHistorial}>
              <View style={estilos.encabezadoItem}>
                <Text style={[estilos.tipoHistorial, { color: item.color }]}>{item.tipo}</Text>
                <Text style={estilos.tiempoHistorial}>{item.tiempo}</Text>
              </View>
              <Text style={estilos.descripcionHistorial}>{item.descripcion}</Text>
            </View>
          </View>
        ))}
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
    paddingTop: 50,
    paddingBottom: 40,
  },
  cabecera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  botonVolver: {
    padding: 4,
  },
  titulo: {
    color: COLORES.textoPrimario,
    fontSize: 18,
    fontWeight: '700',
  },
  tituloSeccion: {
    color: COLORES.textoPrimario,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  descripcionSeccion: {
    color: COLORES.textoSecundario,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },
  tarjeta: {
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  etiquetaTarjeta: {
    color: COLORES.textoPrimario,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  descripcionTarjeta: {
    color: COLORES.textoSecundario,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  itemFuente: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORES.borde,
  },
  iconoFuente: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORES.accentVerdeTenue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoFuente: {
    flex: 1,
  },
  nombreFuente: {
    color: COLORES.textoPrimario,
    fontSize: 13,
    fontWeight: '500',
  },
  descripcionFuente: {
    color: COLORES.textoSecundario,
    fontSize: 11,
    marginTop: 2,
  },
  tarjetaPeligro: {
    backgroundColor: '#1A1006',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0A500',
  },
  encabezadoPeligro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  tituloPeligro: {
    color: '#F0A500',
    fontSize: 14,
    fontWeight: '600',
  },
  descripcionPeligro: {
    color: COLORES.textoSecundario,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  botonRevocar: {
    borderWidth: 1,
    borderColor: COLORES.peligro,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textoRevocar: {
    color: COLORES.peligro,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  encabezadoHistorial: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgeLog: {
    backgroundColor: COLORES.accentVerdeTenue,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORES.accentVerde,
  },
  textoLog: {
    color: COLORES.accentVerde,
    fontSize: 10,
    fontWeight: '600',
  },
  itemHistorial: {
    flexDirection: 'row',
    marginTop: 12,
  },
  puntito: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
    marginRight: 10,
  },
  infoHistorial: {
    flex: 1,
  },
  encabezadoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  tipoHistorial: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tiempoHistorial: {
    color: COLORES.textoSecundario,
    fontSize: 10,
  },
  descripcionHistorial: {
    color: COLORES.textoSecundario,
    fontSize: 12,
    lineHeight: 17,
  },
});

export default AjustesPrivacidadScreen;
