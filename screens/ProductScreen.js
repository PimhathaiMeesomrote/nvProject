import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";

const ProductScreen = ({navigation}) => {
  const [product, setProduct] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      SetLoading(true);
      const res = await axios.get("https://api.codingthailand.com/api/course");
      //console.log(res.data.data)
      //alert(JSON.stringify(res.data.data))
      setProduct(res.data.data);
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
      setError(error); //set error to error's state and tell where error from
    }
  };

  // useEffect(()=>{
  //     getData();
  // },[])

  useFocusEffect(
    //เหมาะกับ navigation
    useCallback(() => {
      getData();
    }, [])
  );

  if (error) {
    //ถ้ามี error เกิดขึ้นจะ return ui ข้างล่างนี้
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
        <Text>เกิดข้อผิดพลาด ไม่สามารถติดต่อกับเซิร์ฟเวอร์ได้</Text>
      </View>
    );
  }

  //loading setting
  if (loading === true) {
    return (
      <View>
        <ActivityIndicator color="#f4511e" size="large" />
      </View>
    );
  }

  const _onRefresh = () => {
    getData();
  };

  const _renderItem = ({ item }) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity 
        style={styles.addButtonStyle}
        onPress ={()=>{
            navigation.navigate('Detail',{
                id : item.id,
                title : item.title
            })
        }}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.container}>
              <Image
                resizeMode="cover"
                source={{ uri: item.picture }}
                style={styles.thumbnail}
              />
              <View style={styles.dataContainer}>
                <View style={styles.dataContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.detail}>{item.detail}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={product}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={_renderItem}
        refreshing={loading}
        onRefresh={_onRefresh}
        ItemSeparatorComponent={ItemSeparatorView}
      />
    </View>
  );
};

export default ProductScreen;
const ItemSeparatorView = () => {
  return (
    // Flat List Item Separator
    <View
      style={{
        height: 0.5,
        width: "100%",
        backgroundColor: "#C8C8C8",
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    elevation: 3,
    borderColor: "gray",
    borderRadius: 5,
    flexDirection: "row",
  },
  dataContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 70,
    height: 70,
  },
  dataContent: {
    marginTop: 5,
    marginLeft: 15,
  },
  title: {
    color: "#444",
    fontSize: 18,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 16,
    color: "#888",
    fontWeight: "700",
  },
  addButtonStyle: {
    width: "100%",
    marginBottom: 15,
  },
});
