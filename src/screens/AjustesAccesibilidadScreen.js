import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORES } from '../constants/theme';

const AjustesAccesibilidadScreen = ({ navigation }) => {
  const [modoVisual, setModoVisual] = useState('Oscuro');
  const [nivelTexto, setNivelTexto] = useState(3);
  const [altoContraste, setAltoContraste] = useState(false);
  const [lectorPantalla, setLectorPantalla] = useState(false);
  const [idioma, setIdioma] = useState('Español');
  const [idiomaMenuAbierto, setIdiomaMenuAbierto] = useState(false);

  return (
    <ScrollView
      style={estilos.fondoPrincipal}
      contentContainerStyle={estilos.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={estilos.cabecera}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonVolver}>
          <Ionicons name="chevron-back" size={22} color={COLORES.textoPrimario} />
        </TouchableOpacity>
        <Text style={estilos.titulo}>Accesibilidad</Text>
        <View style={{ width: 30 }} />
      </View>

      <Text style={estilos.tituloSeccion}>Modo Visual</Text>
      <View style={estilos.contenedorModoVisual}>
        {['Claro', 'Oscuro', 'Sistema'].map((modo) => (
          <TouchableOpacity
            key={modo}
            style={[
              estilos.botonModoVisual,
              modoVisual === modo && estilos.botonModoVisualActivo
            ]}
            onPress={() => setModoVisual(modo)}
          >
            <Text style={[
              estilos.textoModoVisual,
              modoVisual === modo && estilos.textoModoVisualActivo
            ]}>
              {modo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={estilos.tituloSeccion}>Tamaño de Texto</Text>
      <View style={estilos.tarjetaSlider}>
        <View style={estilos.contenedorSlider}>
          <Text style={[estilos.letraSlider, { fontSize: 12 }]}>A</Text>
          <View style={estilos.lineaSlider}>
            <View style={estilos.lineaProgreso} />
            <View style={estilos.puntosFila}>
              {[1, 2, 3, 4, 5].map((nivel) => (
                <TouchableOpacity
                  key={nivel}
                  style={[
                    estilos.puntoSlider,
                    nivelTexto === nivel && estilos.puntoSliderActivo
                  ]}
                  onPress={() => setNivelTexto(nivel)}
                />
              ))}
            </View>
          </View>
          <Text style={[estilos.letraSlider, { fontSize: 20 }]}>A</Text>
        </View>
      </View>

      <Text style={estilos.tituloSeccion}>Ajustes de Visión</Text>
      <View style={estilos.tarjeta}>
        <View style={[estilos.itemFila, { borderBottomWidth: 0 }]}>
          <View style={estilos.iconoContenedor}>
            <Ionicons name="contrast-outline" size={20} color={COLORES.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={estilos.tituloItem}>Alto Contraste</Text>
            <Text style={estilos.descripcionItem}>Aumenta el contraste de colores de la interfaz</Text>
          </View>
          <Switch
            value={altoContraste}
            onValueChange={setAltoContraste}
            trackColor={{ false: COLORES.borde, true: COLORES.accentVerde }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <Text style={estilos.tituloSeccion}>Asistencia Técnica</Text>
      <View style={estilos.tarjeta}>
        <View style={[estilos.itemFila, { borderBottomWidth: 0 }]}>
          <View style={estilos.iconoContenedor}>
            <Ionicons name="volume-medium-outline" size={20} color={COLORES.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={estilos.tituloItem}>Lector de Pantalla</Text>
            <Text style={estilos.descripcionItem}>Activa la descripción de voz para elementos visuales</Text>
          </View>
          <Switch
            value={lectorPantalla}
            onValueChange={setLectorPantalla}
            trackColor={{ false: COLORES.borde, true: COLORES.accentVerde }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <Text style={estilos.tituloSeccion}>Región e Idioma</Text>
      <View style={estilos.tarjetaDropdown}>
        <TouchableOpacity
          style={estilos.itemFilaDropdown}
          onPress={() => setIdiomaMenuAbierto(!idiomaMenuAbierto)}
        >
          <View style={estilos.iconoContenedor}>
            <Ionicons name="language-outline" size={20} color={COLORES.accentVerde} />
          </View>
          <View style={estilos.infoContenedor}>
            <Text style={estilos.tituloItem}>Idioma</Text>
          </View>
          <Text style={estilos.idiomaSeleccionado}>{idioma}</Text>
          <Ionicons
            name={idiomaMenuAbierto ? "chevron-up" : "chevron-down"}
            size={18}
            color={COLORES.textoSecundario}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>

        {idiomaMenuAbierto && (
          <View style={estilos.menuIdiomas}>
            {['Español', 'Inglés', 'Portugués'].map((opcion) => (
              <TouchableOpacity
                key={opcion}
                style={estilos.opcionIdioma}
                onPress={() => {
                  setIdioma(opcion);
                  setIdiomaMenuAbierto(false);
                }}
              >
                <Text style={[
                  estilos.textoOpcionIdioma,
                  idioma === opcion && { color: COLORES.accentVerde, fontWeight: '700' }
                ]}>
                  {opcion}
                </Text>
                {idioma === opcion && (
                  <Ionicons name="checkmark" size={16} color={COLORES.accentVerde} />
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
    backgroundColor: COLORES.fondoPrimario,
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
    color: COLORES.textoPrimario,
    fontSize: 18,
    fontWeight: '700',
  },
  tituloSeccion: {
    color: COLORES.textoPrimario,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 18,
    paddingLeft: 4,
  },
  contenedorModoVisual: {
    flexDirection: 'row',
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  botonModoVisual: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  botonModoVisualActivo: {
    backgroundColor: COLORES.accentVerdeTenue,
    borderWidth: 1,
    borderColor: COLORES.accentVerde,
  },
  textoModoVisual: {
    color: COLORES.textoSecundario,
    fontSize: 13,
    fontWeight: '600',
  },
  textoModoVisualActivo: {
    color: COLORES.accentVerde,
  },
  tarjetaSlider: {
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORES.borde,
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
    color: COLORES.textoPrimario,
    fontWeight: '600',
  },
  lineaSlider: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORES.borde,
    justifyContent: 'center',
    position: 'relative',
  },
  lineaProgreso: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: COLORES.accentVerdeTenue,
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
    backgroundColor: COLORES.borde,
    borderWidth: 2,
    borderColor: COLORES.textoSecundario,
  },
  puntoSliderActivo: {
    backgroundColor: COLORES.accentVerde,
    borderColor: COLORES.textoPrimario,
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  tarjeta: {
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORES.borde,
    overflow: 'hidden',
  },
  tarjetaDropdown: {
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORES.borde,
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
    backgroundColor: COLORES.accentVerdeTenue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContenedor: {
    flex: 1,
  },
  tituloItem: {
    color: COLORES.textoPrimario,
    fontSize: 13,
    fontWeight: '500',
  },
  descripcionItem: {
    color: COLORES.textoSecundario,
    fontSize: 11,
    marginTop: 2,
  },
  idiomaSeleccionado: {
    color: COLORES.accentVerde,
    fontSize: 13,
    fontWeight: '600',
  },
  menuIdiomas: {
    backgroundColor: '#0D1117',
    borderTopWidth: 1,
    borderTopColor: COLORES.borde,
    paddingHorizontal: 12,
  },
  opcionIdioma: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORES.borde,
    paddingHorizontal: 12,
  },
  textoOpcionIdioma: {
    color: COLORES.textoPrimario,
    fontSize: 13,
  },
});

export default AjustesAccesibilidadScreen;
