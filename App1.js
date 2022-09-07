import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';



import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
       initialRouteName='Home'
       screenOptions={{
        headerStyle:{backgroundColor:'#008b8b'},
        headerTintColor:'#ffff',
        headerTitleStyle:{fontWeight:'bold'}
       }}
      >
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='About' component={AboutScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

