import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';

const ProfileScreen = ({ route, navigation }) => {
  const { nombreUsuario } = route.params || { nombreUsuario: 'Invitado' };

  const cerrarSesion = () => {
    navigation.navigate('Inicio', { nombreUsuario: 'Invitado' });
  };

  const guardarCambios = () => {

  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>Perfil</Text>
        <TouchableOpacity onPress={cerrarSesion} style={styles.botonCerrarSesion}>
          <Ionicons name="log-out-outline" size={32} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <View style={styles.informacion}>
        <View style={styles.avatar} />
        <Text style={styles.nombre}>{nombreUsuario}</Text>
        <Text style={styles.correo}>usuario@correo.com</Text>
      </View>

      <View style={styles.espaciador} />

      <CustomButton titulo="Guardar Cambios" alPresionar={guardarCambios} />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 30,
    paddingTop: 60,
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  botonCerrarSesion: {
    padding: 5,
  },
  informacion: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
  },
  nombre: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
  },
  correo: {
    fontSize: 16,
    color: '#666666',
  },
  espaciador: {
    flex: 1,
  },
});

export default ProfileScreen;

