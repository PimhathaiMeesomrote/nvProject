import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const DetailScreen = ({ navigation, route }) => {
  const { id, title } = route.params;

  const [detail, setDetail] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions(
      {
        //title:'รายละเอียดสินค้า'
        title: title,
      },
      [navigation, title]
    );
  });
  const getData = async (id) => {
    try {
      SetLoading(true);
      const res = await axios.get(
        "https://api.codingthailand.com/api/course/" + id
      );
      //console.log(res.data.data)
      //alert(JSON.stringify(res.data.data))
      setDetail(res.data.data);
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
      setError(error); //set error to error's state and tell where error from
    }
  };

  if (error) {
    //ถ้ามี error เกิดขึ้นจะ return ui ข้างล่างนี้
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
        <Text>เกิดข้อผิดพลาด ไม่สามารถติดต่อกับเซิร์ฟเวอร์ได้</Text>
      </View>
    );
  }

  const _onRefresh = () => {
    getData(id);
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  if (loading === true) {
    return (
      <View>
        <ActivityIndicator color="#f4511e" size="large" />
      </View>
    );
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
          <Text style={styles.thumbnail}>{index + 1}</Text>
          <View style={styles.dataContainer}>
            <View style={styles.dataContent}>
              <Text style={styles.title}>{item.ch_title}</Text>
              <Text note numberOfLines={1}>
                {item.ch_dateadd}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={detail}
        keyExtractor={(item, index) => item.ch_id.toString()}
        renderItem={_renderItem}
        refreshing={loading}
        onRefresh={_onRefresh}
        ItemSeparatorComponent={ItemSeparatorView}
      />
    </View>
  );
};

export default DetailScreen;

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
  thumbnail: {
    width: 30,
    height: 30,
    color: "#444",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
