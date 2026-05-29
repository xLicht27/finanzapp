import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { COLORES } from '../constants/theme';

const ProfileScreen = ({ navigation }) => {
  const { usuario, cerrarSesion } = useAuth();

  return (
    <ScrollView style={estilos.fondoPrincipal} contentContainerStyle={estilos.scroll}>
      <View style={estilos.cabecera}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonVolver}>
          <Ionicons name="chevron-back" size={22} color={COLORES.textoPrimario} />
        </TouchableOpacity>
        <Text style={estilos.titulo}>Perfil</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={estilos.contenedorAvatar}>
        <View style={estilos.avatar}>
          <Ionicons name="person" size={40} color={COLORES.accentVerde} />
        </View>
        <Text style={estilos.nombre}>{usuario?.nombre || 'Usuario'}</Text>
        <Text style={estilos.correo}>{usuario?.correo || 'usuario@correo.com'}</Text>
      </View>

      <View style={estilos.tarjeta}>
        <Text style={estilos.etiquetaTarjeta}>Información de Cuenta</Text>
        <View style={estilos.filaInfo}>
          <Ionicons name="person-outline" size={16} color={COLORES.textoSecundario} />
          <Text style={estilos.textoInfo}>{usuario?.nombre || 'Sin nombre'}</Text>
        </View>
        <View style={estilos.filaInfo}>
          <Ionicons name="mail-outline" size={16} color={COLORES.textoSecundario} />
          <Text style={estilos.textoInfo}>{usuario?.correo || 'Sin correo'}</Text>
        </View>
      </View>

      <TouchableOpacity style={estilos.botonCerrarSesion} onPress={cerrarSesion}>
        <Ionicons name="log-out-outline" size={18} color={COLORES.peligro} />
        <Text style={estilos.textoCerrarSesion}>Cerrar Sesión</Text>
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
  },
  cabecera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  botonVolver: {
    padding: 4,
  },
  titulo: {
    color: COLORES.textoPrimario,
    fontSize: 18,
    fontWeight: '700',
  },
  contenedorAvatar: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORES.accentVerdeTenue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: COLORES.accentVerde,
  },
  nombre: {
    color: COLORES.textoPrimario,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  correo: {
    color: COLORES.textoSecundario,
    fontSize: 14,
  },
  tarjeta: {
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  etiquetaTarjeta: {
    color: COLORES.textoSecundario,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 14,
  },
  filaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORES.borde,
  },
  textoInfo: {
    color: COLORES.textoPrimario,
    fontSize: 14,
  },
  botonCerrarSesion: {
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
  textoCerrarSesion: {
    color: COLORES.peligro,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProfileScreen;
