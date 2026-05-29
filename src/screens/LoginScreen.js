import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Image,
  TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';
import { COLORES } from '../constants/theme';

const LoginScreen = ({ navigation }) => {
  const { iniciarSesion } = useAuth();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [cargando, setCargando] = useState(false);

  const validarYEntrar = async () => {
    setMensajeError('');
    if (!correo.trim() || !contrasena.trim()) {
      setMensajeError('Todos los campos son obligatorios');
      return;
    }
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo)) {
      setMensajeError('El formato del correo no es válido');
      return;
    }
    setCargando(true);
    await iniciarSesion({ nombre: 'Carlos Mendoza', correo });
    setCargando(false);
  };

  return (
    <KeyboardAvoidingView
      style={estilos.fondoPrincipal}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={estilos.scroll} keyboardShouldPersistTaps="handled">
        <Image
          source={require('../../assets/logo.png')}
          style={estilos.logo}
          resizeMode="contain"
        />

        <Text style={estilos.titulo}>Bienvenido</Text>
        <Text style={estilos.subtitulo}>Ingresa tus credenciales para continuar</Text>

        {mensajeError !== '' && (
          <View style={estilos.contenedorError}>
            <Text style={estilos.textoError}>{mensajeError}</Text>
          </View>
        )}

        <View style={estilos.grupoEntrada}>
          <Text style={estilos.etiqueta}>Correo Electrónico</Text>
          <View style={estilos.contenedorInput}>
            <Ionicons name="mail-outline" size={18} color={COLORES.textoSecundario} style={estilos.iconoInput} />
            <TextInput
              style={estilos.entrada}
              placeholder="carlos@ejemplo.com"
              placeholderTextColor={COLORES.textoSecundario}
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={estilos.grupoEntrada}>
          <Text style={estilos.etiqueta}>Contraseña</Text>
          <View style={estilos.contenedorInput}>
            <Ionicons name="lock-closed-outline" size={18} color={COLORES.textoSecundario} style={estilos.iconoInput} />
            <TextInput
              style={estilos.entrada}
              placeholder="••••••••"
              placeholderTextColor={COLORES.textoSecundario}
              value={contrasena}
              onChangeText={setContrasena}
              secureTextEntry={!mostrarContrasena}
            />
            <TouchableOpacity onPress={() => setMostrarContrasena(!mostrarContrasena)}>
              <Ionicons
                name={mostrarContrasena ? 'eye-outline' : 'eye-off-outline'}
                size={18}
                color={COLORES.textoSecundario}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={estilos.olvidaste}>
          <Text style={estilos.textoOlvidaste}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <CustomButton titulo="→ Ingresar" alPresionar={validarYEntrar} cargando={cargando} />

        <View style={estilos.contenedorRegistro}>
          <Text style={estilos.textoRegistro}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
            <Text style={estilos.enlaceRegistro}>Crea cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const estilos = StyleSheet.create({
  fondoPrincipal: {
    flex: 1,
    backgroundColor: COLORES.fondoPrimario,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 28,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORES.textoPrimario,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 14,
    color: COLORES.textoSecundario,
    textAlign: 'center',
    marginBottom: 32,
  },
  contenedorError: {
    backgroundColor: 'rgba(248, 81, 73, 0.12)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORES.peligro,
  },
  textoError: {
    color: COLORES.peligro,
    fontSize: 13,
    textAlign: 'center',
  },
  grupoEntrada: {
    marginBottom: 16,
  },
  etiqueta: {
    color: COLORES.textoSecundario,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  contenedorInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORES.borde,
    paddingHorizontal: 14,
    paddingVertical: 2,
  },
  iconoInput: {
    marginRight: 10,
  },
  entrada: {
    flex: 1,
    color: COLORES.textoPrimario,
    fontSize: 14,
    paddingVertical: 14,
  },
  olvidaste: {
    alignSelf: 'flex-end',
    marginBottom: 8,
    marginTop: -4,
  },
  textoOlvidaste: {
    color: COLORES.accentVerde,
    fontSize: 13,
  },
  contenedorRegistro: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textoRegistro: {
    fontSize: 14,
    color: COLORES.textoSecundario,
  },
  enlaceRegistro: {
    fontSize: 14,
    color: COLORES.accentVerde,
    fontWeight: '600',
  },
});

export default LoginScreen;
