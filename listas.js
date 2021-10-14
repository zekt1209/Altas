import {isTemplateElement} from '@babel/types';
import React, {Component} from 'react';
import {View, Text, FlatList, Dimensions, Image} from 'react-native';

export default class listas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
    };
  }

  componentDidMount = () => {
    let _this = this;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var temp = JSON.parse(xhttp.responseText);
        _this.setState({datos: temp});
      }
    };
    xhttp.open(
      'GET',
      'https://zekt1209.000webhostapp.com/mostrar.php',
      true,
    );
    xhttp.send();
  };

  render() {
    return (
      <View>
        
        <FlatList style={{marginTop: 10}} data={this.state.datos} 
        renderItem=
        {({item}) => (
          <View style={{justifyContent: 'center', marginBottom: 10}}>
            <Text // Mostrar el Nombre
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: 10,
                width: Dimensions.get('window').width,
              }}>
            {item.Nombre} 
            </Text>

            <Text // Mostrar el codigo
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: 10,
                width: Dimensions.get('window').width,
              }}>
            {item.Codigo} 
            </Text>

            <Text // Mostrar el centro
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: 10,
                width: Dimensions.get('window').width,
              }}>
            {item.Centro} 
            </Text>
              
            <Image source={{uri: item.Imagen}}
       style={{width: 200, height: 200}} />
            

          </View>

        )}
        keyExtractor={item => item.Codigo}
        />

      </View>
    );
  }
}
