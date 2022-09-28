import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

const App = () => {
  
  const [isLoading,setLoading]=useState(true);
  const [data,setData]=useState([]);
  
  const getMovie = async ()=>{
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies)
    } catch (error) {
      alert(error.message);
    }finally{
      setLoading(false);
    }
  }
  
  useEffect(()=>{
    getMovie();
  },[])
  
  
  return (
    <View style={{flex:1,padding:20}}>
      { isLoading
      ?<ActivityIndicator/>
      :(
        <FlatList
          data={data}
          keyExtractor={({id},index)=>id}
          renderItem={({item})=>(
              <Text>{item.title}, {item.releaseYear}</Text>
          )}
        />
      )

      }
    </View>
  );
}

export default App