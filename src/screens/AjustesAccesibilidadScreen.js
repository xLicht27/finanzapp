import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/TemaContext';
import { obtenerEstilosGlobales } from '../styles/globales';
import { accesibilidadEstilos } from '../styles/AjustesAccesibilidadScreenEstilos';

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

  const estilosComunes = obtenerEstilosGlobales(colores);
  const estilos = accesibilidadEstilos(colores);

  const [nivelTexto, setNivelTexto] = useState(3);
  const [lectorPantalla, setLectorPantalla] = useState(false);
  const [idiomaMenuAbierto, setIdiomaMenuAbierto] = useState(false);

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
        <Text style={estilosComunes.titulo}>{t('accesibilidad')}</Text>
        <View style={{ width: 30 }} />
      </View>

      <Text style={estilosComunes.tituloSeccion}>{t('modoVisual')}</Text>
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

      <Text style={estilosComunes.tituloSeccion}>{t('tamanoTexto')}</Text>
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

      <Text style={estilosComunes.tituloSeccion}>{t('ajustesVision')}</Text>
      <View style={estilosComunes.tarjeta}>
        <View style={[estilosComunes.itemFila, { borderBottomWidth: 0, paddingHorizontal: 0, paddingVertical: 0 }]}>
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="contrast-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilosComunes.infoContenedor}>
            <Text style={estilosComunes.tituloItem}>{t('altoContraste')}</Text>
            <Text style={estilosComunes.descripcionItem}>{t('descripcionContraste')}</Text>
          </View>
          <Switch
            value={altoContraste}
            onValueChange={cambiarAltoContraste}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <Text style={estilosComunes.tituloSeccion}>{t('asistenciaTecnica')}</Text>
      <View style={estilosComunes.tarjeta}>
        <View style={[estilosComunes.itemFila, { borderBottomWidth: 0, paddingHorizontal: 0, paddingVertical: 0 }]}>
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="volume-medium-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilosComunes.infoContenedor}>
            <Text style={estilosComunes.tituloItem}>{t('lectorPantalla')}</Text>
            <Text style={estilosComunes.descripcionItem}>{t('descripcionLector')}</Text>
          </View>
          <Switch
            value={lectorPantalla}
            onValueChange={setLectorPantalla}
            trackColor={{ false: colores.borde, true: colores.accentVerde }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <Text style={estilosComunes.tituloSeccion}>{t('regionIdioma')}</Text>
      <View style={estilosComunes.tarjetaDropdown}>
        <TouchableOpacity
          style={estilosComunes.itemFilaDropdown}
          onPress={() => setIdiomaMenuAbierto(!idiomaMenuAbierto)}
        >
          <View style={estilosComunes.iconoContenedor}>
            <Ionicons name="language-outline" size={20} color={colores.accentVerde} />
          </View>
          <View style={estilosComunes.infoContenedor}>
            <Text style={estilosComunes.tituloItem}>{t('idioma')}</Text>
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

export default AjustesAccesibilidadScreen;
