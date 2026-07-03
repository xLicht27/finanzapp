import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
            onValueChange={setNotificaciones}
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
            onValueChange={setPromociones}
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
            onValueChange={setGastosExcesivos}
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
            onValueChange={setNuevasPoliticas}
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
