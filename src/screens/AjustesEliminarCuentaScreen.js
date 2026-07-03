import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/TemaContext';
import { obtenerEstilosGlobales } from '../styles/globales';
import { eliminarCuentaEstilos } from '../styles/AjustesEliminarCuentaScreenEstilos';

const AjustesEliminarCuentaScreen = ({ navigation }) => {
  const { cerrarSesion } = useAuth();
  const { colores } = useTema();
  const estilosComunes = obtenerEstilosGlobales(colores);
  const estilos = eliminarCuentaEstilos(colores);

  const [paso, setPaso] = useState(1);
  const [digito1, setDigito1] = useState('');
  const [digito2, setDigito2] = useState('');
  const [digito3, setDigito3] = useState('');
  const [digito4, setDigito4] = useState('');
  const [errorVerificacion, setErrorVerificacion] = useState(false);
  const [intentosCount, setIntentosCount] = useState(0);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [palabraConfirmacion, setPalabraConfirmacion] = useState('');

  const manejarCambioDigito = (texto, pos) => {
    setErrorVerificacion(false);
    if (pos === 1) {
      setDigito1(texto);
      if (texto) ref2.current?.focus();
    } else if (pos === 2) {
      setDigito2(texto);
      if (texto) {
        ref3.current?.focus();
      } else {
        ref1.current?.focus();
      }
    } else if (pos === 3) {
      setDigito3(texto);
      if (texto) {
        ref4.current?.focus();
      } else {
        ref2.current?.focus();
      }
    } else if (pos === 4) {
      setDigito4(texto);
      if (!texto) {
        ref3.current?.focus();
      }
    }
  };

  const verificarCodigo = () => {
    const codigoCompleto = `${digito1}${digito2}${digito3}${digito4}`;
    if (intentosCount === 0) {
      setIntentosCount(1);
      setErrorVerificacion(true);
      setDigito1('');
      setDigito2('');
      setDigito3('');
      setDigito4('');
      ref1.current?.focus();
    } else {
      if (codigoCompleto === '1234') {
        setErrorVerificacion(false);
        setPaso(4);
      } else {
        setErrorVerificacion(true);
        setDigito1('');
        setDigito2('');
        setDigito3('');
        setDigito4('');
        ref1.current?.focus();
      }
    }
  };

  const reenviarCodigo = () => {
    Alert.alert("Código Enviado", "Se ha reenviado un nuevo código de verificación al número ******45.");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={estilosComunes.fondoPrincipal}
        contentContainerStyle={estilosComunes.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilosComunes.cabecera}>
          {paso < 5 && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={estilosComunes.botonVolver}>
              <Ionicons name="chevron-back" size={22} color={colores.textoPrimario} />
            </TouchableOpacity>
          )}
          <Text style={estilosComunes.titulo}>Eliminar Cuenta</Text>
          <View style={{ width: 30 }} />
        </View>

        {paso === 1 && (
          <View style={estilos.contenedorPaso}>
            <View style={estilos.advertenciaIconoContainer}>
              <Ionicons name="warning-outline" size={60} color={colores.peligro} />
            </View>
            <Text style={[estilos.tituloPaso, { color: colores.textoPrimario }]}>¿Estás completamente seguro?</Text>
            <Text style={[estilos.descripcionPaso, { color: colores.textoSecundario }]}>
              Esta acción es irreversible y eliminará de forma permanente tus datos, historial de transacciones y configuraciones de cuenta de FinanZaap.
            </Text>
            <TouchableOpacity
              style={[estilos.botonPrimario, { backgroundColor: colores.peligro }]}
              onPress={() => setPaso(2)}
            >
              <Text style={[estilos.textoBotonPrimario, { color: '#FFFFFF' }]}>Sí, deseo Continuar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[estilos.botonSecundario, { borderColor: colores.borde }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={[estilos.textoBotonSecundario, { color: colores.textoPrimario }]}>No, conservar mi cuenta</Text>
            </TouchableOpacity>
          </View>
        )}

        {paso === 2 && (
          <View style={estilos.contenedorPaso}>
            <Text style={[estilos.tituloPaso, { color: colores.textoPrimario }]}>Verificación de Identidad</Text>
            <Text style={[estilos.descripcionPaso, { color: colores.textoSecundario }]}>
              Hemos enviado un código de verificación por SMS al número terminado en ******45.
            </Text>

            {errorVerificacion && (
              <View style={[estilos.recuadroError, { backgroundColor: 'rgba(248, 81, 73, 0.1)', borderColor: colores.peligro }]}>
                <Text style={[estilos.textoError, { color: colores.peligro }]}>CÓDIGO INCORRECTO, INGRESE NUEVAMENTE</Text>
              </View>
            )}

            <View style={estilos.filaInputs}>
              <TextInput
                ref={ref1}
                style={[estilos.inputCodigo, { backgroundColor: colores.fondoTarjeta, borderColor: errorVerificacion ? colores.peligro : colores.borde, color: colores.textoPrimario }]}
                keyboardType="number-pad"
                maxLength={1}
                value={digito1}
                onChangeText={(t) => manejarCambioDigito(t, 1)}
              />
              <TextInput
                ref={ref2}
                style={[estilos.inputCodigo, { backgroundColor: colores.fondoTarjeta, borderColor: errorVerificacion ? colores.peligro : colores.borde, color: colores.textoPrimario }]}
                keyboardType="number-pad"
                maxLength={1}
                value={digito2}
                onChangeText={(t) => manejarCambioDigito(t, 2)}
              />
              <TextInput
                ref={ref3}
                style={[estilos.inputCodigo, { backgroundColor: colores.fondoTarjeta, borderColor: errorVerificacion ? colores.peligro : colores.borde, color: colores.textoPrimario }]}
                keyboardType="number-pad"
                maxLength={1}
                value={digito3}
                onChangeText={(t) => manejarCambioDigito(t, 3)}
              />
              <TextInput
                ref={ref4}
                style={[estilos.inputCodigo, { backgroundColor: colores.fondoTarjeta, borderColor: errorVerificacion ? colores.peligro : colores.borde, color: colores.textoPrimario }]}
                keyboardType="number-pad"
                maxLength={1}
                value={digito4}
                onChangeText={(t) => manejarCambioDigito(t, 4)}
              />
            </View>

            <TouchableOpacity style={[estilos.botonVerificar, { backgroundColor: colores.accentVerde }]} onPress={verificarCodigo}>
              <Text style={[estilos.textoBotonVerificar, { color: colores.fondoPrimario }]}>Verificar Código</Text>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.enlaceReenviar} onPress={reenviarCodigo}>
              <Text style={[estilos.textoEnlaceReenviar, { color: colores.accentVerde }]}>Reenviar código</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[estilos.botonSecundario, { borderColor: colores.borde }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={[estilos.textoBotonSecundario, { color: colores.textoPrimario }]}>Cancelar y Salir</Text>
            </TouchableOpacity>
          </View>
        )}

        {paso === 4 && (
          <View style={estilos.contenedorPaso}>
            <Text style={[estilos.tituloPaso, { color: colores.textoPrimario }]}>Confirmación de Seguridad</Text>
            <Text style={[estilos.descripcionPaso, { color: colores.textoSecundario }]}>
              Para confirmar que realmente deseas proceder, acepta los términos finales y escribe la palabra ELIMINAR en el campo inferior.
            </Text>

            <TouchableOpacity
              style={estilos.filaCheckbox}
              onPress={() => setAceptoTerminos(!aceptoTerminos)}
            >
              <View style={[
                estilos.checkbox,
                { borderColor: colores.borde },
                aceptoTerminos && { backgroundColor: colores.peligro, borderColor: colores.peligro }
              ]}>
                {aceptoTerminos && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
              <Text style={[estilos.textoCheckbox, { color: colores.textoPrimario }]}>
                Entiendo que esta acción es irreversible y acepto eliminar mi cuenta
              </Text>
            </TouchableOpacity>

            <Text style={[estilos.etiquetaInput, { color: colores.textoSecundario }]}>
              Escribe la palabra "ELIMINAR" en mayúsculas:
            </Text>
            <TextInput
              style={[estilos.inputTexto, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde, color: colores.textoPrimario }]}
              value={palabraConfirmacion}
              onChangeText={setPalabraConfirmacion}
              autoCapitalize="characters"
              placeholder="ELIMINAR"
              placeholderTextColor={colores.textoSecundario}
            />

            <TouchableOpacity
              style={[
                estilos.botonEliminarPermanente,
                { backgroundColor: colores.peligro },
                (!aceptoTerminos || palabraConfirmacion !== 'ELIMINAR') && estilos.botonEliminarDeshabilitado
              ]}
              disabled={!aceptoTerminos || palabraConfirmacion !== 'ELIMINAR'}
              onPress={() => setPaso(5)}
            >
              <Text style={[estilos.textoBotonEliminarPermanente, { color: '#FFFFFF' }]}>Eliminar Cuenta para siempre</Text>
            </TouchableOpacity>
          </View>
        )}

        {paso === 5 && (
          <View style={estilos.contenedorPaso}>
            <View style={estilos.exitoIconoContainer}>
              <Ionicons name="checkmark-circle-outline" size={80} color={colores.accentVerde} />
            </View>
            <Text style={[estilos.tituloPaso, { color: colores.textoPrimario }]}>Cuenta Eliminada con Éxito</Text>
            <Text style={[estilos.descripcionPaso, { color: colores.textoSecundario }]}>
              Tu cuenta ha sido eliminada permanentemente. Esperamos volver a verte pronto.
            </Text>
            <TouchableOpacity
              style={[estilos.botonPrimario, { backgroundColor: colores.accentVerde }]}
              onPress={cerrarSesion}
            >
              <Text style={[estilos.textoBotonPrimario, { color: colores.fondoPrimario }]}>Salir</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AjustesEliminarCuentaScreen;
