import { View, Text, Button } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
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