import { View, Text, Button } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons';
import {
    HeaderButtons,
    HeaderButton,
    Item,
    HiddenItem,
    OverflowMenu,
  } from 'react-navigation-header-buttons';

  const IoniconsHeaderButton = (props) => (
    // the `props` here come from <Item ... />
    // you may access them and pass something else to `HeaderButton` if you like
    <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
  );
  
  const ReusableItem = ({ onPress }) => <Item title="Edit" onPress={onPress} />;
  
  const ReusableHiddenItem = ({ onPress }) => <HiddenItem title="hidden2" onPress={onPress} />;

const HomeScreen = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
          // in your app, you can extract the arrow function into a separate component
          // to avoid creating a new one every time you update the options
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              <Item title="register" iconName="person-add" onPress={() => alert('search')} />
              
            </HeaderButtons>
          ),
        });
      }, [navigation]);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name='home' size={30} color='#008b8b'/>
            <Text>HomeScreen</Text>
            <Button
                title='Open drawer'
                onPress={() => navigation.openDrawer()
                }
            />
        </View>
    )
}

export default HomeScreen