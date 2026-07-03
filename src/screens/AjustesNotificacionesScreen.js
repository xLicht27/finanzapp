import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/TemaContext';

const AjustesNotificacionesScreen = ({ navigation }) => {
  const { colores, t } = useTema();
  const [notificaciones, setNotificaciones] = useState(true);
  const [promociones, setPromociones] = useState(false);
  const [gastosExcesivos, setGastosExcesivos] = useState(true);
  const [nuevasPoliticas, setNuevasPoliticas] = useState(true);

  return (
    <ScrollView
      style={[estilos.fondoPrincipal, { backgroundColor: colores.fondoPrimario }]}
      contentContainerStyle={estilos.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={estilos.cabecera}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonVolver}>
          <Ionicons name="chevron-back" size={22} color={colores.textoPrimario} />
        </TouchableOpacity>
        <Text style={[estilos.titulo, { color: colores.textoPrimario }]}>{t('notificaciones')}</Text>
        <View style={{ width: 30 }} />
      </View>

      <Text style={[estilos.tituloSeccion, { color: colores.textoPrimario }]}>Preferencias de Alertas</Text>
      <Text style={[estilos.descripcionSeccion, { color: colores.textoSecundario }]}>
        Elige qué notificaciones deseas recibir en tu dispositivo móvil.
      </Text>

      <View style={[estilos.tarjeta, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <View style={[estilos.itemFila, { borderBottomColor: colores.borde }]}>
          <View style={[estilos.iconoContenedor, { backgroundColor: colores.accentVerdeTenue }]}>
            <Ionicons name="notifications-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={[estilos.tituloItem, { color: colores.textoPrimario }]}>Notificaciones generales</Text>
            <Text style={[estilos.descripcionItem, { color: colores.textoSecundario }]}>Activar o desactivar avisos principales</Text>
          </View>
          <Switch
            value={notificaciones}
            onValueChange={setNotificaciones}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={[estilos.itemFila, { borderBottomColor: colores.borde }]}>
          <View style={[estilos.iconoContenedor, { backgroundColor: colores.accentVerdeTenue }]}>
            <Ionicons name="pricetag-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={[estilos.tituloItem, { color: colores.textoPrimario }]}>Promociones</Text>
            <Text style={[estilos.descripcionItem, { color: colores.textoSecundario }]}>Descuentos y beneficios de aliados</Text>
          </View>
          <Switch
            value={promociones}
            onValueChange={setPromociones}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
            disabled={!notificaciones}
          />
        </View>

        <View style={[estilos.itemFila, { borderBottomColor: colores.borde }]}>
          <View style={[estilos.iconoContenedor, { backgroundColor: colores.accentVerdeTenue }]}>
            <Ionicons name="trending-up-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={[estilos.tituloItem, { color: colores.textoPrimario }]}>Gastos excesivos</Text>
            <Text style={[estilos.descripcionItem, { color: colores.textoSecundario }]}>Alertas cuando superas presupuestos diarios</Text>
          </View>
          <Switch
            value={gastosExcesivos}
            onValueChange={setGastosExcesivos}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
            disabled={!notificaciones}
          />
        </View>

        <View style={[estilos.itemFila, { borderBottomWidth: 0 }]}>
          <View style={[estilos.iconoContenedor, { backgroundColor: colores.accentVerdeTenue }]}>
            <Ionicons name="document-text-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={[estilos.tituloItem, { color: colores.textoPrimario }]}>Nuevas políticas</Text>
            <Text style={[estilos.descripcionItem, { color: colores.textoSecundario }]}>Cambios en términos de condiciones legales</Text>
          </View>
          <Switch
            value={nuevasPoliticas}
            onValueChange={setNuevasPoliticas}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
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
    fontSize: 18,
    fontWeight: '700',
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  descripcionSeccion: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },
  tarjeta: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  itemFila: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  iconoContenedor: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContenedor: {
    flex: 1,
  },
  tituloItem: {
    fontSize: 13,
    fontWeight: '500',
  },
  descripcionItem: {
    fontSize: 11,
    marginTop: 2,
  },
});

export default AjustesNotificacionesScreen;
