import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

const LoginScreen = ({ navigation }) => {
  const [correo, establecerCorreo] = useState('');
  const [contrasena, establecerContrasena] = useState('');
  const [mensajeError, establecerMensajeError] = useState('');

  const validarYEntrar = () => {
    establecerMensajeError('');
    
    if (correo.trim() === '' || contrasena.trim() === '') {
      establecerMensajeError('Todos los campos son obligatorios');
      return;
    }

    const formatoCorreoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreoValido.test(correo)) {
      establecerMensajeError('El formato del correo no es válido');
      return;
    }

    navigation.navigate('Inicio', { nombreUsuario: 'Juan Pérez' });
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>FinanZapp</Text>
      <Text style={estilos.subtitulo}>Inicia sesión para continuar</Text>
      
      {mensajeError !== '' && <Text style={estilos.error}>{mensajeError}</Text>}

      <TextInput
        style={estilos.entrada}
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        value={correo}
        onChangeText={establecerCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={estilos.entrada}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        value={contrasena}
        onChangeText={establecerContrasena}
        secureTextEntry
      />

      <CustomButton titulo="Ingresar" alPresionar={validarYEntrar} />

      <View style={estilos.contenedorRegistro}>
        <Text style={estilos.textoRegistro}>¿No tienes una cuenta registrada? </Text>
        <Text 
          style={estilos.enlaceRegistro} 
          onPress={() => navigation.navigate('Registro')}
        >
          Regístrate
        </Text>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 30,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
  },
  entrada: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333333',
  },
  error: {
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
  },
  contenedorRegistro: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textoRegistro: {
    fontSize: 15,
    color: '#666666',
  },
  enlaceRegistro: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default LoginScreen;
