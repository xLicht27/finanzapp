import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { COLORES } from '../constants/theme';

const AjustesScreen = ({ navigation }) => {
  const { usuario } = useAuth();

  const confirmarEliminarCuenta = () => {
    Alert.alert(
      "Eliminar Cuenta",
      "¿Estás seguro de que deseas eliminar tu cuenta permanentemente? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive" }
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
        <Text style={estilos.titulo}>Ajustes</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={estilos.contenedorPerfil}>
        <View style={estilos.avatarContainer}>
          <Ionicons name="person" size={40} color={COLORES.accentVerde} />
        </View>
        <Text style={estilos.nombreUsuario}>{usuario?.nombre || 'Usuario'}</Text>
        <Text style={estilos.correoUsuario}>{usuario?.correo || 'usuario@correo.com'}</Text>
      </View>

      <Text style={estilos.tituloSeccion}>Ajustes Generales</Text>

      <View style={estilos.tarjetaMenu}>
        <TouchableOpacity
          style={estilos.itemMenu}
          onPress={() => navigation.navigate('EditarPerfil')}
        >
          <View style={estilos.iconoContenedor}>
            <Ionicons name="person-outline" size={20} color={COLORES.accentVerde} />
          </View>
          <Text style={estilos.textoItem}>Editar Perfil</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORES.textoSecundario} />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemMenu}
          onPress={() => navigation.navigate('AjustesPrivacidad')}
        >
          <View style={estilos.iconoContenedor}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORES.accentVerde} />
          </View>
          <Text style={estilos.textoItem}>Privacidad y Control</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORES.textoSecundario} />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemMenu}
          onPress={() => navigation.navigate('AjustesNotificaciones')}
        >
          <View style={estilos.iconoContenedor}>
            <Ionicons name="notifications-outline" size={20} color={COLORES.accentVerde} />
          </View>
          <Text style={estilos.textoItem}>Notificaciones</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORES.textoSecundario} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.itemMenu, { borderBottomWidth: 0 }]}
          onPress={() => navigation.navigate('AjustesAccesibilidad')}
        >
          <View style={estilos.iconoContenedor}>
            <Ionicons name="eye-outline" size={20} color={COLORES.accentVerde} />
          </View>
          <Text style={estilos.textoItem}>Accesibilidad</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORES.textoSecundario} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={estilos.botonEliminar}
        onPress={confirmarEliminarCuenta}
      >
        <Ionicons name="trash-outline" size={18} color={COLORES.peligro} />
        <Text style={estilos.textoEliminar}>Eliminar mi Cuenta</Text>
      </TouchableOpacity>
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
  contenedorPerfil: {
    alignItems: 'center',
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 14,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORES.accentVerdeTenue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORES.accentVerde,
  },
  nombreUsuario: {
    color: COLORES.textoPrimario,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  correoUsuario: {
    color: COLORES.textoSecundario,
    fontSize: 13,
  },
  tituloSeccion: {
    color: COLORES.textoPrimario,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    paddingLeft: 4,
  },
  tarjetaMenu: {
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORES.borde,
    marginBottom: 28,
    overflow: 'hidden',
  },
  itemMenu: {
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
  textoItem: {
    color: COLORES.textoPrimario,
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
    borderColor: COLORES.peligro,
  },
  textoEliminar: {
    color: COLORES.peligro,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AjustesScreen;
