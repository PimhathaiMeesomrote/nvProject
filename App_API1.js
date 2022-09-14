import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import axios from 'axios'

const App = () => {

  const getDataUsingAxios = async ()=>{
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      alert(JSON.stringify(response.data));
        } catch (error) {
      //handle error
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20,textAlign:'center'}}>Example of axios in React Native</Text>
      <TouchableOpacity style={styles.buttonStyle}
                        onPress={getDataUsingAxios}>
        <Text>Get Data Using Axios get</Text>
        
      </TouchableOpacity>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
container:{
  justifyContent:'center',
  flex:1 ,
  padding:16,
},

buttonStyle:{
  alignItems:'center',
    backgroundColor: '#DDDDDD',
    padding:10,
      width:'100%',
  marginTop:16,
}
});