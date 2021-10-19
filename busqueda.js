import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, FlatList} from 'react-native';
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
      let _this = this;
       var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          var temp = JSON.parse(xhttp.responseText);
          _this.setState({ datos: temp });
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
        <Text style={{fontSize:22, fontWeight:'400', textAlign:'center'}}>Busqueda</Text>
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





          <FlatList
          data={this.state.datos}
          contentContainerStyle={{
            padding: 20,
          }}
          renderItem={({item}) => {
              return <View style={{flexDirection: 'row', padding:15, marginBottom:15, backgroundColor:'#dcdde1', borderRadius:12,
                shadowColor: "#000",
                shadowOffset: {width:0, height:10},
                shadowOpacity:.4,
                shadowRadius:20

                  }}>

                <Image 
                     source={{uri: item.Imagen}}
                    style={{width: 90, height:90, borderRadius:90, marginRight:30}}
                />

                  <View>
                       <Text style={{fontSize:22, fontWeight:'400'}}>{item.Nombre}</Text>
                       <Text style={{fontSize:20, opacity:.8}}>{item.Codigo}</Text>
                        <Text style={{fontSize:22, opacity:.8, color:'#2c3e50'}}>{item.Centro}</Text>
                   </View>


                   </View>

                  }}
                  />            
        
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
