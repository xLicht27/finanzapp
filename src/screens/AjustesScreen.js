import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/TemaContext';
import { obtenerEstilosGlobales } from '../styles/globales';
import { ajustesEstilos } from '../styles/AjustesScreenEstilos';

const AjustesScreen = ({ navigation }) => {
  const { usuario } = useAuth();
  const { colores, t } = useTema();
  const estilosComunes = obtenerEstilosGlobales(colores);
  const estilos = ajustesEstilos(colores);

  const eliminarCuenta = () => {
    navigation.navigate('AjustesEliminarCuenta');
  };

  return (
    <ScrollView
      style={estilosComunes.fondoPrincipal}
      contentContainerStyle={estilosComunes.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={estilosComunes.cabecera}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={estilosComunes.botonVolver}>
          <Ionicons name="chevron-back" size={22} color={colores.textoPrimario} />
        </TouchableOpacity>
        <Text style={estilosComunes.titulo}>{t('ajustes')}</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={[estilos.contenedorPerfil, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <View style={[estilos.avatarContainer, { backgroundColor: colores.accentVerdeTenue, borderColor: colores.accentVerde }]}>
          <Ionicons name="person" size={40} color={colores.accentVerde} />
        </View>
        <Text style={[estilos.nombreUsuario, { color: colores.textoPrimario }]}>{usuario?.nombre || 'Usuario'}</Text>
        <Text style={[estilos.correoUsuario, { color: colores.textoSecundario }]}>{usuario?.correo || 'usuario@correo.com'}</Text>
      </View>

      <Text style={estilosComunes.tituloSeccion}>{t('ajustesGenerales')}</Text>

      <View style={[estilos.tarjetaMenu, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <TouchableOpacity
          style={[estilos.itemMenu, { borderBottomColor: colores.borde }]}
          onPress={() => navigation.navigate('EditarPerfil')}
        >
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="person-outline" size={20} color={colores.accentVerde} />
          </View>
          <Text style={[estilos.textoItem, { color: colores.textoPrimario }]}>{t('editarPerfil')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colores.textoSecundario} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.itemMenu, { borderBottomColor: colores.borde }]}
          onPress={() => navigation.navigate('AjustesPrivacidad')}
        >
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="lock-closed-outline" size={20} color={colores.accentVerde} />
          </View>
          <Text style={[estilos.textoItem, { color: colores.textoPrimario }]}>{t('privacidadControl')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colores.textoSecundario} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.itemMenu, { borderBottomColor: colores.borde }]}
          onPress={() => navigation.navigate('AjustesNotificaciones')}
        >
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="notifications-outline" size={20} color={colores.accentVerde} />
          </View>
          <Text style={[estilos.textoItem, { color: colores.textoPrimario }]}>{t('notificaciones')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colores.textoSecundario} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.itemMenu, { borderBottomWidth: 0 }]}
          onPress={() => navigation.navigate('AjustesAccesibilidad')}
        >
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="eye-outline" size={20} color={colores.accentVerde} />
          </View>
          <Text style={[estilos.textoItem, { color: colores.textoPrimario }]}>{t('accesibilidad')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colores.textoSecundario} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[estilos.botonEliminar, { borderColor: colores.peligro }]}
        onPress={eliminarCuenta}
      >
        <Ionicons name="trash-outline" size={18} color={colores.peligro} />
        <Text style={[estilos.textoEliminar, { color: colores.peligro }]}>{t('eliminarCuenta')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AjustesScreen;
