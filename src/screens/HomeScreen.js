import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ route, navigation }) => {
  const { nombreUsuario } = route.params || { nombreUsuario: 'Invitado' };
  const estaLogueado = nombreUsuario !== 'Invitado';
  const [menuAbierto, establecerMenuAbierto] = useState(false);

  const manejarPerfil = () => {
    if (estaLogueado) {
      navigation.navigate('Perfil', { nombreUsuario });
    } else {
      navigation.navigate('Ingreso');
    }
  };

  return (
    <View style={estilos.contenedorPrincipal}>
      <ScrollView contentContainerStyle={estilos.contenedor} showsVerticalScrollIndicator={false}>
        <View style={estilos.cabecera}>
          <TouchableOpacity onPress={() => establecerMenuAbierto(true)} style={estilos.botonCabecera}>
            <Ionicons name="menu" size={32} color="#333333" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={manejarPerfil} style={estilos.botonCabecera}>
            <Ionicons 
              name={estaLogueado ? "person-circle" : "person-circle-outline"} 
              size={36} 
              color="#007AFF" 
            />
          </TouchableOpacity>
        </View>

        <View style={estilos.contenedorCuadricula}>
          <View style={estilos.filaCuadricula}>
            <View style={[estilos.cuadro, { backgroundColor: '#6C8DF6' }]}>
              <Text style={estilos.textoCuadro}>Ingresos</Text>
              <Text style={estilos.montoCuadro}>$ 20,000</Text>
              <Text style={estilos.textoTotal}>Total</Text>
            </View>
            <View style={[estilos.cuadro, { backgroundColor: '#F78C9D' }]}>
              <Text style={estilos.textoCuadro}>Gastos</Text>
              <Text style={estilos.montoCuadro}>$ 5,000</Text>
              <Text style={estilos.textoTotal}>Total</Text>
            </View>
          </View>
          <View style={estilos.filaCuadricula}>
            <View style={[estilos.cuadro, { backgroundColor: '#65ADF6' }]}>
              <Text style={estilos.textoCuadro}>Créditos</Text>
              <Text style={estilos.montoCuadro}>$ 10,000</Text>
              <Text style={estilos.textoTotal}>Total</Text>
            </View>
            <View style={[estilos.cuadro, { backgroundColor: '#55D6A3' }]}>
              <Text style={estilos.textoCuadro}>Otros</Text>
              <Text style={estilos.montoCuadro}>$ 2,000</Text>
              <Text style={estilos.textoTotal}>Total</Text>
            </View>
          </View>
        </View>

        <Text style={estilos.subtituloTarjetas}>Tarjetas</Text>
        
        {/* Aquí iría la gráfica, pero por ahora solo está el título como se solicitó */}

      </ScrollView>

      {menuAbierto && (
        <View style={estilos.superposicionMenu}>
          <TouchableOpacity 
            style={estilos.fondoCierreMenu} 
            activeOpacity={1} 
            onPress={() => establecerMenuAbierto(false)} 
          />
          <View style={estilos.barraLateral}>
            <Text style={estilos.tituloApp}>FinanZapp</Text>
            <View style={estilos.separador} />
            <TouchableOpacity style={estilos.opcionMenu}>
              <Text style={estilos.textoOpcionMenu}>Tarjetas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.opcionMenu}>
              <Text style={estilos.textoOpcionMenu}>Gastos</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const estilos = StyleSheet.create({
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

