import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ALTAS from './altas';
import LISTAS from './listas';
import listas from './listas';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BUSQUEDA from './busqueda';
import BAJAS from './bajas';
import CAMBIOS from './cambios';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function menu() {
  return (
    <NavigationContainer>
       <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Altas') {
              iconName = focused
                ? 'person-add'
                : 'person-add-outline';
            } else if (route.name === 'Listas') {
              iconName = focused ? 'list' : 'list-outline';
            }else if (route.name === 'Busqueda') {
              iconName = focused ? 'body' : 'body-outline';
            }else if (route.name === 'Modificar'){
              iconName = focused ? 'md-brush' : 'md-brush-outline';
            }else if (route.name === 'Bajas'){
              iconName = focused ? 'backspace' : 'backspace-outline';
            }
            
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'brown',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Altas" component={ALTAS} />
        <Tab.Screen name="Listas" component={LISTAS} />
        <Tab.Screen name="Busqueda" component={BUSQUEDA} />
        <Tab.Screen name="Modificar" component={CAMBIOS} />
        <Tab.Screen name="Bajas" component={BAJAS} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}