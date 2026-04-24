import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ route, navigation }) => {
  const { nombreUsuario } = route.params || { nombreUsuario: 'Invitado' };
  const Logueado = nombreUsuario !== 'Invitado';
  const [menuAbierto, establecerMenuAbierto] = useState(false);

  const manejarPerfil = () => {
    if (Logueado) {
      navigation.navigate('Perfil', { nombreUsuario });
    } else {
      navigation.navigate('Ingreso');
    }
  };

  return (
    <View style={styles.contenedorPrincipal}>
      <ScrollView contentContainerStyle={styles.contenedor} showsVerticalScrollIndicator={false}>
        <View style={styles.cabecera}>
          <TouchableOpacity onPress={() => establecerMenuAbierto(true)} style={styles.botonCabecera}>
            <Ionicons name="menu" size={32} color="#333333" />
          </TouchableOpacity>

          <TouchableOpacity onPress={manejarPerfil} style={styles.botonCabecera}>
            <Ionicons
              name={Logueado ? "person-circle" : "person-circle-outline"}
              size={36}
              color="#007AFF"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contenedorCuadricula}>
          <View style={styles.filaCuadricula}>
            <View style={[styles.cuadro, { backgroundColor: '#6C8DF6' }]}>
              <Text style={styles.textoCuadro}>Ingresos</Text>
              <Text style={styles.montoCuadro}>$ 20,000</Text>
              <Text style={styles.textoTotal}>Total</Text>
            </View>
            <View style={[styles.cuadro, { backgroundColor: '#F78C9D' }]}>
              <Text style={styles.textoCuadro}>Gastos</Text>
              <Text style={styles.montoCuadro}>$ 5,000</Text>
              <Text style={styles.textoTotal}>Total</Text>
            </View>
          </View>
          <View style={styles.filaCuadricula}>
            <View style={[styles.cuadro, { backgroundColor: '#65ADF6' }]}>
              <Text style={styles.textoCuadro}>Créditos</Text>
              <Text style={styles.montoCuadro}>$ 10,000</Text>
              <Text style={styles.textoTotal}>Total</Text>
            </View>
            <View style={[styles.cuadro, { backgroundColor: '#55D6A3' }]}>
              <Text style={styles.textoCuadro}>Otros</Text>
              <Text style={styles.montoCuadro}>$ 2,000</Text>
              <Text style={styles.textoTotal}>Total</Text>
            </View>
          </View>
        </View>

        <Text style={styles.subtituloTarjetas}>Tarjetas</Text>

      </ScrollView>

      {menuAbierto && (
        <View style={styles.superposicionMenu}>
          <TouchableOpacity
            style={styles.fondoCierreMenu}
            activeOpacity={1}
            onPress={() => establecerMenuAbierto(false)}
          />
          <View style={styles.barraLateral}>
            <Text style={styles.tituloApp}>FinanZapp</Text>
            <View style={styles.separador} />
            <TouchableOpacity style={styles.opcionMenu}>
              <Text style={styles.textoOpcionMenu}>Tarjetas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.opcionMenu}>
              <Text style={styles.textoOpcionMenu}>Gastos</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contenedor: {
    padding: 25,
    paddingTop: 50,
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  botonCabecera: {
    padding: 5,
  },
  contenedorCuadricula: {
    marginBottom: 30,
  },
  filaCuadricula: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cuadro: {
    width: '47%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textoCuadro: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.9,
  },
  montoCuadro: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textoTotal: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.7,
  },
  subtituloTarjetas: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },

  // Estilos del Menú Lateral

  superposicionMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    flexDirection: 'row',
    zIndex: 10,
  },
  fondoCierreMenu: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  barraLateral: {
    width: width * 0.7,
    height: height,
    backgroundColor: '#FFFFFF',
    padding: 30,
    paddingTop: 60,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  tituloApp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
  },
  separador: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginBottom: 20,
  },
  opcionMenu: {
    paddingVertical: 15,
  },
  textoOpcionMenu: {
    fontSize: 18,
    color: '#333333',
  },
});

export default HomeScreen;

