import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/TemaContext';
import { perfilEstilos } from '../styles/ProfileScreenEstilos';

const ProfileScreen = ({ navigation }) => {
  const { usuario, cerrarSesion } = useAuth();
  const { colores } = useTema();
  const estilos = perfilEstilos(colores);

  return (
    <ScrollView style={estilos.fondoPrincipal} contentContainerStyle={estilos.scroll}>
      <View style={estilos.cabecera}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonVolver}>
          <Ionicons name="chevron-back" size={22} color={colores.textoPrimario} />
        </TouchableOpacity>
        <Text style={[estilos.titulo, { color: colores.textoPrimario }]}>Perfil</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={estilos.contenedorAvatar}>
        <View style={[estilos.avatar, { backgroundColor: colores.accentVerdeTenue, borderColor: colores.accentVerde }]}>
          <Ionicons name="person" size={40} color={colores.accentVerde} />
        </View>
        <Text style={[estilos.nombre, { color: colores.textoPrimario }]}>{usuario?.nombre || 'Usuario'}</Text>
        <Text style={[estilos.correo, { color: colores.textoSecundario }]}>{usuario?.correo || 'usuario@correo.com'}</Text>
      </View>

      <View style={[estilos.tarjeta, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <Text style={[estilos.etiquetaTarjeta, { color: colores.textoSecundario }]}>Información de Cuenta</Text>
        <View style={[estilos.filaInfo, { borderBottomColor: colores.borde }]}>
          <Ionicons name="person-outline" size={16} color={colores.textoSecundario} />
          <Text style={[estilos.textoInfo, { color: colores.textoPrimario }]}>{usuario?.nombre || 'Sin nombre'}</Text>
        </View>
        <View style={[estilos.filaInfo, { borderBottomColor: colores.borde, borderBottomWidth: 0 }]}>
          <Ionicons name="mail-outline" size={16} color={colores.textoSecundario} />
          <Text style={[estilos.textoInfo, { color: colores.textoPrimario }]}>{usuario?.correo || 'Sin correo'}</Text>
        </View>
      </View>

      <TouchableOpacity style={[estilos.botonCerrarSesion, { borderColor: colores.peligro }]} onPress={cerrarSesion}>
        <Ionicons name="log-out-outline" size={18} color={colores.peligro} />
        <Text style={[estilos.textoCerrarSesion, { color: colores.peligro }]}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
