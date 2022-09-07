import React from 'react';
import { Text, View, Button, TextInput,Image,SafeAreaView,StyleSheet} from 'react-native';
import HomeScreen from './screens/HomeScreen';

import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

const MyTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary:'rgb(255,45,85)'
  }
};

function FeedScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Feed Screen</Text>
      <Button title='open drawer' onPress={()=>navigation.openDrawer()} />
      <Button title='toggle drawer' onPress={()=>navigation.toggleDrawer()} />
    </View>
  );
}

function ArticleScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <SafeAreaView styles={{flex:1}}>
      <Image source={require('./assets/react_logo.png')}
      style={styles.sideMenuProfileIcon}
       />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label='Close drawer' 
                    onPress={() => props.navigation.closeDrawer()} />
        {/* <DrawerItem label='Toggle drawer' 
                    onPress={() => props.navigation.toggleDrawer()} /> */}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions ={{
        drawerStyle:{
          width:240
        }
      }}
    >
      <Drawer.Screen name='Home' component={HomeScreen} />
      <Drawer.Screen name='Notifications' component={ArticleScreen} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
       <MyDrawer/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
  resizeMode: 'center',
  width: 100,
  height: 100,
  borderRadius: 100 / 2,
  alignSelf: 'center',
  },
  })

export default App

