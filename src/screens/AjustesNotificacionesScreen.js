import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { useTema } from '../context/TemaContext';
import { obtenerEstilosGlobales } from '../styles/globales';
import { notificacionesEstilos } from '../styles/AjustesNotificacionesScreenEstilos';

const AjustesNotificacionesScreen = ({ navigation }) => {
  const { colores, t } = useTema();
  const estilosComunes = obtenerEstilosGlobales(colores);
  const estilos = notificacionesEstilos(colores);

  const [notificaciones, setNotificaciones] = useState(true);
  const [promociones, setPromociones] = useState(false);
  const [gastosExcesivos, setGastosExcesivos] = useState(true);
  const [nuevasPoliticas, setNuevasPoliticas] = useState(true);

  const dispararAlerta = async (valor, setValor, etiqueta) => {
    setValor(valor);
    if (valor) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Preferencia Guardada',
            body: `Has activado las notificaciones de: ${etiqueta}`,
            sound: true,
          },
          trigger: null,
        });
      }
    }
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
        <Text style={estilosComunes.titulo}>{t('notificaciones')}</Text>
        <View style={{ width: 30 }} />
      </View>

      <Text style={estilosComunes.tituloSeccion}>Preferencias de Alertas</Text>
      <Text style={[estilos.descripcionSeccion, { color: colores.textoSecundario }]}>
        Elige qué notificaciones deseas recibir en tu dispositivo móvil.
      </Text>

      <View style={estilosComunes.tarjetaDropdown}>
        <View style={[estilosComunes.itemFila, { borderBottomWidth: 1, borderBottomColor: colores.borde }]}>
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="notifications-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilosComunes.infoContenedor}>
            <Text style={estilosComunes.tituloItem}>Notificaciones generales</Text>
            <Text style={estilosComunes.descripcionItem}>Activar o desactivar avisos principales</Text>
          </View>
          <Switch
            value={notificaciones}
            onValueChange={(val) => dispararAlerta(val, setNotificaciones, 'Notificaciones generales')}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={[estilosComunes.itemFila, { borderBottomWidth: 1, borderBottomColor: colores.borde }]}>
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="pricetag-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilosComunes.infoContenedor}>
            <Text style={estilosComunes.tituloItem}>Promociones</Text>
            <Text style={estilosComunes.descripcionItem}>Descuentos y beneficios de aliados</Text>
          </View>
          <Switch
            value={promociones}
            onValueChange={(val) => dispararAlerta(val, setPromociones, 'Promociones')}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
            disabled={!notificaciones}
          />
        </View>

        <View style={[estilosComunes.itemFila, { borderBottomWidth: 1, borderBottomColor: colores.borde }]}>
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="trending-up-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilosComunes.infoContenedor}>
            <Text style={estilosComunes.tituloItem}>Gastos excesivos</Text>
            <Text style={estilosComunes.descripcionItem}>Alertas cuando superas presupuestos diarios</Text>
          </View>
          <Switch
            value={gastosExcesivos}
            onValueChange={(val) => dispararAlerta(val, setGastosExcesivos, 'Gastos excesivos')}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
            disabled={!notificaciones}
          />
        </View>

        <View style={[estilosComunes.itemFila, { borderBottomWidth: 0 }]}>
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="document-text-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilosComunes.infoContenedor}>
            <Text style={estilosComunes.tituloItem}>Nuevas políticas</Text>
            <Text style={estilosComunes.descripcionItem}>Cambios en términos de condiciones legales</Text>
          </View>
          <Switch
            value={nuevasPoliticas}
            onValueChange={(val) => dispararAlerta(val, setNuevasPoliticas, 'Nuevas políticas')}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
            disabled={!notificaciones}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AjustesNotificacionesScreen;
