import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [nombre, establecerNombre] = useState('');
  const [correo, establecerCorreo] = useState('');
  const [contrasena, establecerContrasena] = useState('');
  const [confirmarContrasena, establecerConfirmarContrasena] = useState('');
  const [mensajeError, establecerMensajeError] = useState('');

  const validarYRegistrar = () => {
    establecerMensajeError('');

    if (!nombre.trim() || !correo.trim() || !contrasena.trim() || !confirmarContrasena.trim()) {
      establecerMensajeError('Todos los campos son obligatorios');
      return;
    }

    const formatoCorreoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreoValido.test(correo)) {
      establecerMensajeError('El formato del correo no es válido');
      return;
    }

    if (contrasena !== confirmarContrasena) {
      establecerMensajeError('Las contraseñas no coinciden');
      return;
    }

    navigation.navigate('Ingreso');
  };

  return (
    <ScrollView contentContainerStyle={styles.contenedorScroll}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Crear Cuenta</Text>
        <Text style={styles.subtitulo}>Regístrate para empezar a ahorrar</Text>

        {mensajeError !== '' && <Text style={styles.error}>{mensajeError}</Text>}

        <TextInput
          style={styles.entrada}
          placeholder="Nombre completo"
          placeholderTextColor="#999"
          value={nombre}
          onChangeText={establecerNombre}
        />

        <TextInput
          style={styles.entrada}
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          value={correo}
          onChangeText={establecerCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.entrada}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={contrasena}
          onChangeText={establecerContrasena}
          secureTextEntry
        />

        <TextInput
          style={styles.entrada}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#999"
          value={confirmarContrasena}
          onChangeText={establecerConfirmarContrasena}
          secureTextEntry
        />

        <CustomButton titulo="Registrarse" alPresionar={validarYRegistrar} />

        <View style={styles.contenedorEnlace}>
          <Text style={styles.textoEnlace}>¿Ya tienes una cuenta? </Text>
          <Text
            style={styles.enlace}
            onPress={() => navigation.navigate('Ingreso')}
          >
            Inicia sesión
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedorScroll: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  contenedor: {
    padding: 30,
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
  contenedorEnlace: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textoEnlace: {
    fontSize: 15,
    color: '#666666',
  },
  enlace: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default RegisterScreen;
