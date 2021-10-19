import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Image} from 'react-native-elements';
//import * as ImagePicker from 'react-native-image-picker';

export default class busqueda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      selectedValue: '',
      fileUri: '',
      nombre:'',
      datos:[],
    };
  }









  render() {

    const btnBusqueda = () => {
       var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
        }
      };
      xhttp.open(
        'GET',
        'https://zekt1209.000webhostapp.com/buscar.php?codigo='+
          this.state.codigo,
        true
      );
      xhttp.send(); 
    }


 


    return (
      <View>
        <Text>Cambioss</Text>
        <Input
              placeholder="Codigo"
              leftIcon={<Icon name="user" size={24} color="black" />}
              onChangeText={codigo => this.setState({codigo})}
            />

        <Button
          icon={<Icon name="user-plus" size={15} color="white" />}
          title="Buscar"
          onPress={btnBusqueda}
        />

          <View style={styles.Alta}>
            <Input
              placeholder="Nombre"
              leftIcon={<Icon name="user" size={24} color="black" />}
            />
          </View>



        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
    textAlign: 'center',
  },
  Alta: {
    width: 250,
    marginTop: 20,
    marginLeft: 20,
  },
  avatar: {
    marginTop: 30,
  },
  imagen: {
    width: 100,
    height: 100,
    marginLeft: 20,
  },
});
