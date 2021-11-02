import React, { Component } from 'react';
import { View, Text, Picker, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Image, Button} from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';

export default class cambios extends Component {
  constructor(props) {
    super(props);
    this.state = {
        codigo:'',
        nombre:'',
        nombreP:'',
        password:'',
        centro:'',
        fileUri:'',
        rutai:'',
        refreshing: true,
    };
  }

  textHandler = (event) =>{
      this.setState({codigo: event.target.codigo});
  }

  updateCentro = centro => {
    this.setState({centro: centro});
  };

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={styles.imagen} />;
    } else {
      return (
        <Image source={require('./imagenes/user.png')} style={styles.imagen} />
      );
    }
  }

  uploadImageToServer = async () => {
    const response = await fetch(this.state.fileUri);
    const blob = await response.blob();
    var reader = new FileReader();
    reader.onload = () => {
    
    var InsertAPI = 'http://zekt1209.000webhostapp.com/upload.php';
    console.log(reader.result);
    var Data={img:reader.result};
    var headers={
    'Accept':'application/json',
    'Content-Type':'application.json'
    }
    fetch(InsertAPI,{
    method:'POST',
    headers:headers,
    body:JSON.stringify(Data),
    }).then((response)=>response.json()).then((response)=>{
    console.log("server "+response);
    this.setState({
        rutai: 'https://zekt1209.000webhostapp.com/' + response,
        });
    })
    .catch(err=>{
    console.log(err);
    
    })
    }
    reader.readAsDataURL(blob);
    }
  
  render() {

    const accesofotos = () => {
        ImagePicker.launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
          },
          response => {
            console.log(response);
            var source = response;
            var array = Object.keys(source).map(function (key) {
              return source[key];
            });
            var finalArray = array[0][0];
            this.setState({fileUri: finalArray.uri});
            this.uploadImageToServer();
            // console.log(finalArray.uri);
          },
        );
      };




      const btnBusqueda = () => {
        let _this = this;
         const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            var temp = JSON.parse(xhttp.responseText);
            _this.setState({ nombre: temp[0]['Nombre'] });
            _this.setState({ centro: temp[0]['Centro'] });
            _this.setState({ fileUri: temp[0]['Imagen'] });
            _this.setState({ rutai: temp[0]['Imagen'] });
            _this.setState({ nombreP: temp[0]['Nombre'] });
          }
        };
        xhttp.open(
          'GET',
          'https://zekt1209.000webhostapp.com/buscar.php?codigo='+
            this.state.codigo,
          true
        );
        xhttp.send(); 
        this.setState({refreshing: false});
      }
      

      const AltaDatos = () => {
        var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
           console.log(xhttp.responseText);
         }
       };
       xhttp.open(
         'GET',
         'https://zekt1209.000webhostapp.com/modificar.php?nom='+ this.state.nombre + '&codigo=' + this.state.codigo + '&pass=' + this.state.password + '&centro=' + this.state.centro + '&imagen=' + this.state.rutai,
         true
       );
       xhttp.send(); 
       this.setState({refreshing: true});
      }


      if (this.state.refreshing){
          return (
        <View>
            <Text style={styles.h1}> Modificar </Text>

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
        </View>
          );
      }

    return (
        <View>

        <ScrollView>
          <View style={styles.Alta}>
            <Input
              placeholder={this.state.nombreP}
              leftIcon={<Icon name="user" size={24} color="black" />}
              onChangeText={nombre => this.setState({nombre})}
            />
          </View>
          <View style={styles.Alta}>
            <Input
              placeholder="Contraseña"
              leftIcon={<Icon name="lock" size={24} color="black" />}
              secureTextEntry={true}
              onChangeText={password => this.setState({password})}
            />
          </View>
          <View>
            <Text style={{fontSize: 20, marginLeft: 20, marginTop: 20}}>
              Campus
            </Text>
            <Picker
              selectedValue={this.state.centro}
              onValueChange={this.updateCentro}
              style={{height: 50, width: 150, marginLeft: 20}}>
              <Picker.Item label="CUCEI" value="CUCEI" />
              <Picker.Item label="CUCEA" value="CUCEA" />
              <Picker.Item label="CUTLAJO" value="CUTLAJO" />
              <Picker.Item label="CUTONALA" value="CUTONALA" />
            </Picker>
          </View>

          <View>
            <View style={{marginLeft: 20, marginTop: 20}}>
              <Text>Imagen Avatar</Text>
            </View>
            <TouchableOpacity onPress={accesofotos}>
              {this.renderFileUri()}
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20, width: 100, marginLeft: 150}}>
            <Button
              icon={<Icon name="user-plus" size={15} color="white" />}
              title="Modificar"
              onPress={AltaDatos}
            />
          </View>
          
          </ScrollView>

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
    imagen: {
      width: 100,
      height: 100,
      marginLeft: 20,
      marginTop: 20,
    },
    boton: {
      marginTop: 20,
      width: 100,
      marginLeft: 150,
    },
    h1:{
      fontSize: 22,
      fontWeight:'400', 
      textAlign:'center',
    },
  });
