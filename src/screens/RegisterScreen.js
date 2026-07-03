import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { useTema } from '../context/TemaContext';
import { registroEstilos } from '../styles/RegisterScreenEstilos';

const TOTAL_PASOS = 3;

const RegisterScreen = ({ navigation }) => {
  const { colores } = useTema();
  const [paso, setPaso] = useState(1);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [pais, setPais] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const estilos = registroEstilos(colores);

  const validarPaso = () => {
    setMensajeError('');
    if (paso === 1) {
      if (!nombre.trim() || !correo.trim()) {
        setMensajeError('Completa todos los campos');
        return false;
      }
      const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formatoCorreo.test(correo)) {
        setMensajeError('El formato del correo no es válido');
        return false;
      }
    }
    if (paso === 2) {
      if (!contrasena.trim() || !confirmarContrasena.trim()) {
        setMensajeError('Completa todos los campos');
        return false;
      }
      if (contrasena !== confirmarContrasena) {
        setMensajeError('Las contraseñas no coinciden');
        return false;
      }
      if (contrasena.length < 6) {
        setMensajeError('La contraseña debe tener al menos 6 caracteres');
        return false;
      }
    }
    if (paso === 3) {
      if (!fechaNacimiento.trim() || !pais.trim()) {
        setMensajeError('Completa todos los campos');
        return false;
      }
    }
    return true;
  };

  const avanzar = () => {
    if (!validarPaso()) return;
    if (paso < TOTAL_PASOS) {
      setPaso(paso + 1);
    } else {
      navigation.navigate('Ingreso');
    }
  };

  const renderPaso1 = () => (
    <>
      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Nombre Completo</Text>
        <View style={estilos.contenedorInput}>
          <Ionicons name="person-outline" size={18} color={colores.textoSecundario} style={estilos.iconoInput} />
          <TextInput
            style={estilos.entrada}
            placeholder="Ej. Carlos Mendoza"
            placeholderTextColor={colores.textoSecundario}
            value={nombre}
            onChangeText={setNombre}
          />
        </View>
      </View>
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
    </>
  );

  const renderPaso2 = () => (
    <>
      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Contraseña</Text>
        <View style={estilos.contenedorInput}>
          <Ionicons name="lock-closed-outline" size={18} color={colores.textoSecundario} style={estilos.iconoInput} />
          <TextInput
            style={estilos.entrada}
            placeholder="Contraseña"
            placeholderTextColor={colores.textoSecundario}
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
          />
        </View>
      </View>
      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Repite Contraseña</Text>
        <View style={estilos.contenedorInput}>
          <Ionicons name="lock-closed-outline" size={18} color={colores.textoSecundario} style={estilos.iconoInput} />
          <TextInput
            style={estilos.entrada}
            placeholder="Repite Contraseña"
            placeholderTextColor={colores.textoSecundario}
            value={confirmarContrasena}
            onChangeText={setConfirmarContrasena}
            secureTextEntry
          />
        </View>
      </View>
    </>
  );

  const renderPaso3 = () => (
    <>
      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Fecha de Nacimiento</Text>
        <View style={estilos.contenedorInput}>
          <Ionicons name="calendar-outline" size={18} color={colores.textoSecundario} style={estilos.iconoInput} />
          <TextInput
            style={estilos.entrada}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={colores.textoSecundario}
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>País</Text>
        <View style={estilos.contenedorInput}>
          <Ionicons name="globe-outline" size={18} color={colores.textoSecundario} style={estilos.iconoInput} />
          <TextInput
            style={estilos.entrada}
            placeholder="Perú"
            placeholderTextColor={colores.textoSecundario}
            value={pais}
            onChangeText={setPais}
          />
        </View>
      </View>
    </>
  );

  return (
    <KeyboardAvoidingView
      style={estilos.fondoPrincipal}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={estilos.scroll} keyboardShouldPersistTaps="handled">
        <View style={estilos.indicadorContenedor}>
          {Array.from({ length: TOTAL_PASOS }).map((_, i) => (
            <View
              key={i}
              style={[estilos.indicadorPaso, i + 1 <= paso && estilos.indicadorActivo]}
            />
          ))}
        </View>

        <Text style={estilos.pasoBadge}>PASO {paso} DE {TOTAL_PASOS}</Text>
        <Text style={estilos.titulo}>Comenzar</Text>
        <Text style={estilos.subtitulo}>Configuración de perfil de seguridad</Text>

        {mensajeError !== '' && (
          <View style={estilos.contenedorError}>
            <Text style={estilos.textoError}>{mensajeError}</Text>
          </View>
        )}

        {paso === 1 && renderPaso1()}
        {paso === 2 && renderPaso2()}
        {paso === 3 && renderPaso3()}

        <CustomButton
          titulo={paso < TOTAL_PASOS ? 'CONTINUAR →' : 'FINALIZAR →'}
          alPresionar={avanzar}
        />

        <TouchableOpacity style={estilos.volverContenedor} onPress={() => navigation.navigate('Ingreso')}>
          <Text style={estilos.textoVolver}>Volver al inicio</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
