import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Image, Button} from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';

export default class altas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
      fileUri: '',
    };
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={styles.imagen} />;
    } else {
      return (
        <Image source={require('./imagenes/user.png')} style={styles.imagen} />
      );
    }
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
          // console.log(finalArray.uri);
        },
      );
    };

    return (
      <View>
        <ScrollView>
          <Text style={styles.titulo}>¡ Altas ! </Text>

          <View style={styles.Alta}>
            <Input
              placeholder="Nombre"
              leftIcon={<Icon name="user" size={24} color="black" />}
            />
          </View>

          <View style={styles.Alta}>
            <Input
              placeholder="Codigo"
              leftIcon={<Icon name="keyboard-o" size={24} color="black" />}
            />
          </View>

          <View style={styles.Alta}>
            <Input
              placeholder="Password"
              leftIcon={<Icon name="lock" size={24} color="black" />}
              secureTextEntry={true}
            />
          </View>

          <View>
            <Text style={{fontSize: 20, marginLeft: 20, marginTop: 20}}>
              Campus
            </Text>
            <Picker
              selectedValue={this.state.selectedValue}
              style={{height: 50, width: 150, marginLeft: 20}}>
              <Picker.Item label="CUCSH" value="CUCSH" />
              <Picker.Item label="CUCEA" value="CUCEA" />
              <Picker.Item label="CUCEI" value="CUCEI" />
              <Picker.Item label="CUTLAJO" value="CUTLAJO" />
              <Picker.Item label="CUTONALA" value="CUTONALA" />
            </Picker>
          </View>

          <View style={styles.avatar}>
            <Text style={{fontSize: 20}}>Imagen Avatar</Text>
            <TouchableOpacity onPress={accesofotos}>
              {this.renderFileUri()}
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20, width: 100, marginLeft: 150}}>
            <Button
              icon={<Icon name="user-plus" size={15} color="white" />}
              title=" Altas"
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
  avatar: {
    marginTop: 30,
  },
  imagen: {
    width: 100,
    height: 100,
    marginLeft: 20,
  },
});
