import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/TemaContext';
import { loginEstilos } from '../styles/LoginScreenEstilos';

const LoginScreen = ({ navigation }) => {
  const { iniciarSesion } = useAuth();
  const { colores } = useTema();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [cargando, setCargando] = useState(false);

  const estilos = loginEstilos(colores);

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
            <Ionicons name="mail-outline" size={18} color={colores.textoSecundario} style={estilos.iconoInput} />
            <TextInput
              style={estilos.entrada}
              placeholder="carlos@ejemplo.com"
              placeholderTextColor={colores.textoSecundario}
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
            <Ionicons name="lock-closed-outline" size={18} color={colores.textoSecundario} style={estilos.iconoInput} />
            <TextInput
              style={estilos.entrada}
              placeholder="••••••••"
              placeholderTextColor={colores.textoSecundario}
              value={contrasena}
              onChangeText={setContrasena}
              secureTextEntry={!mostrarContrasena}
            />
            <TouchableOpacity onPress={() => setMostrarContrasena(!mostrarContrasena)}>
              <Ionicons
                name={mostrarContrasena ? 'eye-outline' : 'eye-off-outline'}
                size={18}
                color={colores.textoSecundario}
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

export default LoginScreen;
