import { View, Text, ActivityIndicator, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

const App = () => {

  const [isLoading,setLoading] = useState(true);
  const [data,setData] = useState([]); //array object

  const getArticles = async ()=>{
    try {
      const response = await fetch('https://newsapi.org/v2/top-headlines?country=th&apiKey=ab0d4aca4cea481e8157d31c68eb2b23');
      const json = await response.json();
      setData(json.articles);
    } catch (error) {
      console.error(error);
    }finally{
      //any condition come here
      setLoading(false);
    }
  }

  //import data after clicking
  useEffect(()=>{
    getArticles();
},[]) // ,[] prevent app from error

  //item is from Flatlist
  const _renderItem = ({item})=>{
    let urlToImage = (item.urlToImage!==null)
    ? item.urlToImage 
    :'https://pinnacleherbal.com/wp-content/uploads/2021/06/no_image_available-1.jpeg';
    return(
      <View style={{flex:1}}>
        <View style={{flex:1,flexDirection:'row',margin:5}}>
          <Image  
            resizeMode='cover'
            source={{uri:urlToImage}}
            style={{flex:1,width:'100%',height:'100%'}}
          />
          <View style={{width:200,margin:5}}>
            <Text style={{fontSize:14,marginBottom:5}}>{item.title}</Text>
            <Text style={{fontSize:10}}>{item.source.name}</Text>
            <Text style={{fontSize:10,color:'red'}}>Publish:{item.publishedAt}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{flex:1,padding:20}}>
      { isLoading
      ?<ActivityIndicator size="Large" color="#0000ff"/>
      :(
        <FlatList
          data={data}
          keyExtractor = {item =>item.title}
          renderItem = {_renderItem}
        />
      )

      }
    </View>
  );
}

export default App