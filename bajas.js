import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import {Input, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class bajas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        codigo: '',
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



    const btnBajas = () => {
        let _this = this;
        var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
           console.log(xhttp.responseText);
           var temp = xhttp.responseText;
           _this.setState({ datos: temp });
         }
       };
       xhttp.open(
         'GET',
         'https://zekt1209.000webhostapp.com/eliminar.php?codigo='+
           this.state.codigo,
         true
       );
       xhttp.send(); 
    }




    return (
      <View>
        <Text style={{fontSize:22, fontWeight:'400', textAlign:'center'}}> Bajas </Text>

        <View style={{marginTop:40}}>

            <Text style={{fontSize:22, fontWeight:'400', textAlign:'center'}}> Eliminar por codigo </Text>

            <Input
                placeholder="Codigo"
                leftIcon={<Icon name="user" size={24} color="black" />}
                onChangeText={codigo => this.setState({codigo})}
                />

             
            <Button 
            icon={<Icon name="user-plus" size={15} color="white" />}
            title="Buscar"
            onPress={btnBusqueda}
            color="#d12626"
            />   

            
          <FlatList
          data={this.state.datos}
          contentContainerStyle={{
            padding: 20,
          }}
          renderItem={({item}) => {
              return <View style={{justifyContent:'center', alignItems:'center', padding:15, marginBottom:15, backgroundColor:'#dcdde1', borderRadius:12,
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


                    <View style={{marginTop:20}}>
                    <Text style={{fontSize:22, fontWeight:'400'}}>¿Eliminar este usuario?</Text>
                    </View>


                    <Button 
                    icon={<Icon name="user-plus" size={15} color="white" />}
                    title="Eliminar"
                    onPress={btnBajas}
                    />




                   </View>





                  }}  // Fin de la flatlist: linea 112
                  //keyExtractor={item => item.Codigo}
                  />
                  



            <View>
                <Text style={{fontSize:22, fontWeight:'400'}}>Usuario </Text>
            </View>

        </View>




      </View>
    );
  }
}
