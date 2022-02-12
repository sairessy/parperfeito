import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, Linking } from "react-native";
import { Button, IconButton } from "react-native-paper";
import config from "../config";
import {Ionicons} from "@expo/vector-icons";

import Constants from "expo-constants";

export default function PublicProfile({navigation, route}) {
  const {id, name, birthday, province, tel, photo, gender, desc, interrests} = route.params;

  const updateViewsNumber = async ()=> {
    const res = await fetch(config.server + "/updateviewsnumber/" + id);
    const json = await res.json();
  }

  useEffect(()=> {
    updateViewsNumber();
  }, [])

	return (
		<View style={{ flex: 1, backgroundColor: "#fff", paddingTop: Constants.statusBarHeight }}>
      <View style={{height: 120, justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#ddd"}}>
        <IconButton size={20} icon="arrow-left" style={{position: "absolute", top: 0, left: 0, margin: 5}} 
          onPress={()=> navigation.goBack()}
        />
        <Image 
          style={{
            width: 80, height: 80, borderRadius: 5, backgroundColor: "#ddd"
          }} 
          source={{uri: photo == null ? "https://img.icons8.com/windows/50/ffffff/user.png" : photo}}
        />
      </View>
      <View style={{padding: 10}}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Ionicons name={config.genders.filter(g => g.id == gender)[0].icon} size={10} color="#ccc" />
          <Text style={{fontFamily: "main", marginLeft: 5}}>{name}</Text>
        </View>
        <Text style={{color: "#666", fontSize: 14, fontFamily: "main"}}>{new Date().getFullYear() - birthday + " anos"}</Text>
        <Text style={{color: "#666", fontSize: 14, fontFamily: "main"}}>{config.provinces.filter(p=> p.id == province)[0].label}</Text>
        <View style={{ marginTop: 10, display: interrests == "" && desc=="" ? "none" : "flex"}}>
          <Text style={{color: "#666", fontSize: 14, fontFamily: "main"}}>{desc}</Text>
          <Text style={{ fontSize: 12, marginTop: 5, fontFamily: "main"}}>Interresses</Text>
          <Text style={{color: "#666", fontSize: 12, fontFamily: "main"}}>{interrests}</Text>
        </View>
        <Button icon="whatsapp" mode="contained" style={{marginTop: 10, backgroundColor: config.colors.primary}}
          labelStyle={{textTransform: "capitalize"}}
          onPress={()=> Linking.openURL("https://wa.me/+258" + tel)}
        >Iniciar chat</Button>
      </View>
		</View>
	);
}