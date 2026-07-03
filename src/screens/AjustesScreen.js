import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/TemaContext';

const AjustesScreen = ({ navigation }) => {
  const { usuario } = useAuth();
  const { colores, t } = useTema();

  const eliminarCuenta = () => {
    navigation.navigate('AjustesEliminarCuenta');
  };

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
        <Text style={[estilos.titulo, { color: colores.textoPrimario }]}>{t('ajustes')}</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={[estilos.contenedorPerfil, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <View style={[estilos.avatarContainer, { backgroundColor: colores.accentVerdeTenue, borderColor: colores.accentVerde }]}>
          <Ionicons name="person" size={40} color={colores.accentVerde} />
        </View>
        <Text style={[estilos.nombreUsuario, { color: colores.textoPrimario }]}>{usuario?.nombre || 'Usuario'}</Text>
        <Text style={[estilos.correoUsuario, { color: colores.textoSecundario }]}>{usuario?.correo || 'usuario@correo.com'}</Text>
      </View>

      <Text style={[estilos.tituloSeccion, { color: colores.textoPrimario }]}>{t('ajustesGenerales')}</Text>

      <View style={[estilos.tarjetaMenu, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <TouchableOpacity
          style={[estilos.itemMenu, { borderBottomColor: colores.borde }]}
          onPress={() => navigation.navigate('EditarPerfil')}
        >
          <View style={[estilos.iconoContenedor, { backgroundColor: colores.accentVerdeTenue }]}>
            <Ionicons name="person-outline" size={20} color={colores.accentVerde} />
          </View>
          <Text style={[estilos.textoItem, { color: colores.textoPrimario }]}>{t('editarPerfil')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colores.textoSecundario} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.itemMenu, { borderBottomColor: colores.borde }]}
          onPress={() => navigation.navigate('AjustesPrivacidad')}
        >
          <View style={[estilos.iconoContenedor, { backgroundColor: colores.accentVerdeTenue }]}>
            <Ionicons name="lock-closed-outline" size={20} color={colores.accentVerde} />
          </View>
          <Text style={[estilos.textoItem, { color: colores.textoPrimario }]}>{t('privacidadControl')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colores.textoSecundario} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.itemMenu, { borderBottomColor: colores.borde }]}
          onPress={() => navigation.navigate('AjustesNotificaciones')}
        >
          <View style={[estilos.iconoContenedor, { backgroundColor: colores.accentVerdeTenue }]}>
            <Ionicons name="notifications-outline" size={20} color={colores.accentVerde} />
          </View>
          <Text style={[estilos.textoItem, { color: colores.textoPrimario }]}>{t('notificaciones')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colores.textoSecundario} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.itemMenu, { borderBottomWidth: 0 }]}
          onPress={() => navigation.navigate('AjustesAccesibilidad')}
        >
          <View style={[estilos.iconoContenedor, { backgroundColor: colores.accentVerdeTenue }]}>
            <Ionicons name="eye-outline" size={20} color={colores.accentVerde} />
          </View>
          <Text style={[estilos.textoItem, { color: colores.textoPrimario }]}>{t('accesibilidad')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colores.textoSecundario} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[estilos.botonEliminar, { borderColor: colores.peligro }]}
        onPress={eliminarCuenta}
      >
        <Ionicons name="trash-outline" size={18} color={colores.peligro} />
        <Text style={[estilos.textoEliminar, { color: colores.peligro }]}>{t('eliminarCuenta')}</Text>
      </TouchableOpacity>
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
  contenedorPerfil: {
    alignItems: 'center',
    borderRadius: 14,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
  },
  nombreUsuario: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  correoUsuario: {
    fontSize: 13,
  },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    paddingLeft: 4,
  },
  tarjetaMenu: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 28,
    overflow: 'hidden',
  },
  itemMenu: {
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
  textoItem: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  botonEliminar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(248, 81, 73, 0.1)',
    borderRadius: 10,
    paddingVertical: 14,
    borderWidth: 1,
  },
  textoEliminar: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AjustesScreen;
