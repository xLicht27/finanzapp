import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { COLORES } from '../constants/theme';

const TOTAL_PASOS = 3;

const RegisterScreen = ({ navigation }) => {
  const [paso, setPaso] = useState(1);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [pais, setPais] = useState('');
  const [mensajeError, setMensajeError] = useState('');

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
          <Ionicons name="person-outline" size={18} color={COLORES.textoSecundario} style={estilos.iconoInput} />
          <TextInput
            style={estilos.entrada}
            placeholder="Ej. Carlos Mendoza"
            placeholderTextColor={COLORES.textoSecundario}
            value={nombre}
            onChangeText={setNombre}
          />
        </View>
      </View>
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
    </>
  );

  const renderPaso2 = () => (
    <>
      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Contraseña</Text>
        <View style={estilos.contenedorInput}>
          <Ionicons name="lock-closed-outline" size={18} color={COLORES.textoSecundario} style={estilos.iconoInput} />
          <TextInput
            style={estilos.entrada}
            placeholder="Contraseña"
            placeholderTextColor={COLORES.textoSecundario}
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
          />
        </View>
      </View>
      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Repite Contraseña</Text>
        <View style={estilos.contenedorInput}>
          <Ionicons name="lock-closed-outline" size={18} color={COLORES.textoSecundario} style={estilos.iconoInput} />
          <TextInput
            style={estilos.entrada}
            placeholder="Repite Contraseña"
            placeholderTextColor={COLORES.textoSecundario}
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
          <Ionicons name="calendar-outline" size={18} color={COLORES.textoSecundario} style={estilos.iconoInput} />
          <TextInput
            style={estilos.entrada}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={COLORES.textoSecundario}
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>País</Text>
        <View style={estilos.contenedorInput}>
          <Ionicons name="globe-outline" size={18} color={COLORES.textoSecundario} style={estilos.iconoInput} />
          <TextInput
            style={estilos.entrada}
            placeholder="Perú"
            placeholderTextColor={COLORES.textoSecundario}
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
  indicadorContenedor: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  indicadorPaso: {
    width: 28,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORES.borde,
  },
  indicadorActivo: {
    backgroundColor: COLORES.accentVerde,
  },
  pasoBadge: {
    color: COLORES.accentVerde,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 6,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORES.textoPrimario,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 13,
    color: COLORES.textoSecundario,
    textAlign: 'center',
    marginBottom: 28,
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
  volverContenedor: {
    alignItems: 'center',
    marginTop: 16,
  },
  textoVolver: {
    color: COLORES.textoSecundario,
    fontSize: 13,
  },
});

export default RegisterScreen;
