import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORES } from '../constants/theme';

const AjustesNotificacionesScreen = ({ navigation }) => {
  const [notificaciones, setNotificaciones] = useState(true);
  const [promociones, setPromociones] = useState(false);
  const [gastosExcesivos, setGastosExcesivos] = useState(true);
  const [nuevasPoliticas, setNuevasPoliticas] = useState(true);

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
        <Text style={estilos.titulo}>Notificaciones</Text>
        <View style={{ width: 30 }} />
      </View>

      <Text style={estilos.tituloSeccion}>Preferencias de Alertas</Text>
      <Text style={estilos.descripcionSeccion}>
        Elige qué notificaciones deseas recibir en tu dispositivo móvil.
      </Text>

      <View style={estilos.tarjeta}>
        <View style={estilos.itemFila}>
          <View style={estilos.iconoContenedor}>
            <Ionicons name="notifications-outline" size={20} color={COLORES.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={estilos.tituloItem}>Notificaciones generales</Text>
            <Text style={estilos.descripcionItem}>Activar o desactivar avisos principales</Text>
          </View>
          <Switch
            value={notificaciones}
            onValueChange={setNotificaciones}
            trackColor={{ false: COLORES.borde, true: COLORES.accentVerde }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={estilos.itemFila}>
          <View style={estilos.iconoContenedor}>
            <Ionicons name="pricetag-outline" size={20} color={COLORES.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={estilos.tituloItem}>Promociones</Text>
            <Text style={estilos.descripcionItem}>Descuentos y beneficios de aliados</Text>
          </View>
          <Switch
            value={promociones}
            onValueChange={setPromociones}
            trackColor={{ false: COLORES.borde, true: COLORES.accentVerde }}
            thumbColor="#FFFFFF"
            disabled={!notificaciones}
          />
        </View>

        <View style={estilos.itemFila}>
          <View style={estilos.iconoContenedor}>
            <Ionicons name="trending-up-outline" size={20} color={COLORES.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={estilos.tituloItem}>Gastos excesivos</Text>
            <Text style={estilos.descripcionItem}>Alertas cuando superas presupuestos diarios</Text>
          </View>
          <Switch
            value={gastosExcesivos}
            onValueChange={setGastosExcesivos}
            trackColor={{ false: COLORES.borde, true: COLORES.accentVerde }}
            thumbColor="#FFFFFF"
            disabled={!notificaciones}
          />
        </View>

        <View style={[estilos.itemFila, { borderBottomWidth: 0 }]}>
          <View style={estilos.iconoContenedor}>
            <Ionicons name="document-text-outline" size={20} color={COLORES.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={estilos.tituloItem}>Nuevas políticas</Text>
            <Text style={estilos.descripcionItem}>Cambios en términos de condiciones legales</Text>
          </View>
          <Switch
            value={nuevasPoliticas}
            onValueChange={setNuevasPoliticas}
            trackColor={{ false: COLORES.borde, true: COLORES.accentVerde }}
            thumbColor="#FFFFFF"
            disabled={!notificaciones}
          />
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
    borderWidth: 1,
    borderColor: COLORES.borde,
    overflow: 'hidden',
  },
  itemFila: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORES.borde,
  },
  iconoContenedor: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORES.accentVerdeTenue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContenedor: {
    flex: 1,
  },
  tituloItem: {
    color: COLORES.textoPrimario,
    fontSize: 13,
    fontWeight: '500',
  },
  descripcionItem: {
    color: COLORES.textoSecundario,
    fontSize: 11,
    marginTop: 2,
  },
});

export default AjustesNotificacionesScreen;
