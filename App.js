import { View, Text,Button,SafeAreaView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons' 
import { createDrawerNavigator } from '@react-navigation/drawer' 

import {NavigationContainer,DefaultTheme} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


const MyTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary:'rgb(255,45,85)'
  }
};


function HomeScreen({navigation}){
  return(
    <View style = {{flex : 1 ,justifyContent:'center',alignItems:'center'}}>
      <Ionicons name='home' size={30} color='#51B38E'/>
      <Text>Home Screen</Text>
    </View>
  )
}

function SettingScreen({navigation}){
  return(
    <View style = {{flex : 1 ,justifyContent:'center',alignItems:'center'}}>
      <Text>Setting Screen</Text>
      <Button title='go to Home' 
              onPress={() => navigation.goBack()} />
    </View>
  )
}



const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Mytabs(){
  return(
    <Tab.Navigator
      screenOptions={({route})=>({
        tabBarIcon: ({focused,color,size})=>{
          let iconName;
          if(route.name==='Home'){
            iconName = focused
            ?'ios-information-circle'
            :'ios-information-circle-outline'
          }else if(route.name==='Setting'){
            iconName = focused
            ?'ios-list-box'
            :'ios-list'
          }
          //you can return any component that you like here
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor:'tomato',
        tabBarInactiveTintColor:'gray',

      })}
    >
      <Tab.Screen name ='Home' component = {HomeScreen}/>
      <Tab.Screen name ='Setting' component = {SettingScreen}/>
    </Tab.Navigator>
  )
}


function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name='Home' component={Mytabs} />
      <Drawer.Screen name='Setting' component={SettingScreen} />
    </Drawer.Navigator>
  );
}


const App = () => {
  return (
   <NavigationContainer theme={MyTheme}>
      <MyDrawer/>
   </NavigationContainer>
  )
}

export default App