import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/TemaContext';

const AjustesAccesibilidadScreen = ({ navigation }) => {
  const {
    modoVisual,
    altoContraste,
    idioma,
    colores,
    cambiarModoVisual,
    cambiarAltoContraste,
    cambiarIdioma,
    t
  } = useTema();

  const [nivelTexto, setNivelTexto] = useState(3);
  const [lectorPantalla, setLectorPantalla] = useState(false);
  const [idiomaMenuAbierto, setIdiomaMenuAbierto] = useState(false);

  return (
    <ScrollView
      style={[estilos.fondoPrincipal, { backgroundColor: colores.fondoPrimario }]}
      contentContainerStyle={estilos.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={estilos.cabecera}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonVolver}>
          <Ionicons name="chevron-back" size={22} color={colores.textoPrimario} />
        </TouchableOpacity>
        <Text style={[estilos.titulo, { color: colores.textoPrimario }]}>{t('accesibilidad')}</Text>
        <View style={{ width: 30 }} />
      </View>

      <Text style={[estilos.tituloSeccion, { color: colores.textoPrimario }]}>{t('modoVisual')}</Text>
      <View style={[estilos.contenedorModoVisual, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        {['Claro', 'Oscuro', 'Sistema'].map((modo) => (
          <TouchableOpacity
            key={modo}
            style={[
              estilos.botonModoVisual,
              modoVisual === modo && [estilos.botonModoVisualActivo, { backgroundColor: colores.accentVerdeTenue, borderColor: colores.accentVerde }]
            ]}
            onPress={() => cambiarModoVisual(modo)}
          >
            <Text style={[
              estilos.textoModoVisual,
              { color: colores.textoSecundario },
              modoVisual === modo && { color: colores.accentVerde }
            ]}>
              {t(modo.toLowerCase())}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[estilos.tituloSeccion, { color: colores.textoPrimario }]}>{t('tamanoTexto')}</Text>
      <View style={[estilos.tarjetaSlider, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <View style={estilos.contenedorSlider}>
          <Text style={[estilos.letraSlider, { fontSize: 12, color: colores.textoPrimario }]}>A</Text>
          <View style={[estilos.lineaSlider, { backgroundColor: colores.borde }]}>
            <View style={[estilos.lineaProgreso, { backgroundColor: colores.accentVerdeTenue }]} />
            <View style={estilos.puntosFila}>
              {[1, 2, 3, 4, 5].map((nivel) => (
                <TouchableOpacity
                  key={nivel}
                  style={[
                    estilos.puntoSlider,
                    { backgroundColor: colores.borde, borderColor: colores.textoSecundario },
                    nivelTexto === nivel && [estilos.puntoSliderActivo, { backgroundColor: colores.accentVerde, borderColor: colores.textoPrimario }]
                  ]}
                  onPress={() => setNivelTexto(nivel)}
                />
              ))}
            </View>
          </View>
          <Text style={[estilos.letraSlider, { fontSize: 20, color: colores.textoPrimario }]}>A</Text>
        </View>
      </View>

      <Text style={[estilos.tituloSeccion, { color: colores.textoPrimario }]}>{t('ajustesVision')}</Text>
      <View style={[estilos.tarjeta, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <View style={[estilos.itemFila, { borderBottomWidth: 0 }]}>
          <View style={[estilos.iconoContenedor, { backgroundColor: colores.accentVerdeTenue }]}>
            <Ionicons name="contrast-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={[estilos.tituloItem, { color: colores.textoPrimario }]}>{t('altoContraste')}</Text>
            <Text style={[estilos.descripcionItem, { color: colores.textoSecundario }]}>{t('descripcionContraste')}</Text>
          </View>
          <Switch
            value={altoContraste}
            onValueChange={cambiarAltoContraste}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <Text style={[estilos.tituloSeccion, { color: colores.textoPrimario }]}>{t('asistenciaTecnica')}</Text>
      <View style={[estilos.tarjeta, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <View style={[estilos.itemFila, { borderBottomWidth: 0 }]}>
          <View style={[estilos.iconoContenedor, { backgroundColor: colores.accentVerdeTenue }]}>
            <Ionicons name="volume-medium-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={[estilos.tituloItem, { color: colores.textoPrimario }]}>{t('lectorPantalla')}</Text>
            <Text style={[estilos.descripcionItem, { color: colores.textoSecundario }]}>{t('descripcionLector')}</Text>
          </View>
          <Switch
            value={lectorPantalla}
            onValueChange={setLectorPantalla}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <Text style={[estilos.tituloSeccion, { color: colores.textoPrimario }]}>{t('regionIdioma')}</Text>
      <View style={[estilos.tarjetaDropdown, { backgroundColor: colores.fondoTarjeta, borderColor: colores.borde }]}>
        <TouchableOpacity
          style={estilos.itemFilaDropdown}
          onPress={() => setIdiomaMenuAbierto(!idiomaMenuAbierto)}
        >
          <View style={[estilos.iconoContenedor, { backgroundColor: colores.accentVerdeTenue }]}>
            <Ionicons name="language-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={[estilos.tituloItem, { color: colores.textoPrimario }]}>{t('idioma')}</Text>
          </View>
          <Text style={[estilos.idiomaSeleccionado, { color: colores.accentVerde }]}>{idioma}</Text>
          <Ionicons
            name={idiomaMenuAbierto ? "chevron-up" : "chevron-down"}
            size={18}
            color={colores.textoSecundario}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>

        {idiomaMenuAbierto && (
          <View style={[estilos.menuIdiomas, { backgroundColor: colores.fondoPrimario, borderTopColor: colores.borde }]}>
            {['Español', 'Inglés'].map((opcion) => (
              <TouchableOpacity
                key={opcion}
                style={[estilos.opcionIdioma, { borderBottomColor: colores.borde }]}
                onPress={() => {
                  cambiarIdioma(opcion);
                  setIdiomaMenuAbierto(false);
                }}
              >
                <Text style={[
                  estilos.textoOpcionIdioma,
                  { color: colores.textoPrimario },
                  idioma === opcion && { color: colores.accentVerde, fontWeight: '700' }
                ]}>
                  {opcion}
                </Text>
                {idioma === opcion && (
                  <Ionicons name="checkmark" size={16} color={colores.accentVerde} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  fondoPrincipal: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  cabecera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  botonVolver: {
    padding: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
  },
  tituloSeccion: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 18,
    paddingLeft: 4,
  },
  contenedorModoVisual: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
  },
  botonModoVisual: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  botonModoVisualActivo: {
    borderWidth: 1,
  },
  textoModoVisual: {
    fontSize: 13,
    fontWeight: '600',
  },
  tarjetaSlider: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  contenedorSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  letraSlider: {
    fontWeight: '600',
  },
  lineaSlider: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    justifyContent: 'center',
    position: 'relative',
  },
  lineaProgreso: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
  },
  puntosFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  puntoSlider: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
  },
  puntoSliderActivo: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  tarjeta: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tarjetaDropdown: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  itemFila: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  itemFilaDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconoContenedor: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContenedor: {
    flex: 1,
  },
  tituloItem: {
    fontSize: 13,
    fontWeight: '500',
  },
  descripcionItem: {
    fontSize: 11,
    marginTop: 2,
  },
  idiomaSeleccionado: {
    fontSize: 13,
    fontWeight: '600',
  },
  menuIdiomas: {
    borderTopWidth: 1,
    paddingHorizontal: 12,
  },
  opcionIdioma: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    paddingHorizontal: 12,
  },
  textoOpcionIdioma: {
    fontSize: 13,
  },
});

export default AjustesAccesibilidadScreen;
