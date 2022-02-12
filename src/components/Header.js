import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import Logo from "./Logo";
import {Ionicons, MaterialIcons} from "@expo/vector-icons"


import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Header({toggleModal, lastVersion, navigation}) {

	return (
		<View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#ddd", height: 50, padding: 5 }}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <TouchableOpacity style={{marginRight: 20}} onPress={()=> navigation.navigate("Profile", {lastVersion})}>
          <Avatar.Image size={30} source={{uri:"https://img.icons8.com/windows/50/ffffff/user.png"}} 
          style={{backgroundColor: "#000"}}/>
        </TouchableOpacity>
        <Logo size={30} />
      </View>
    
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <IconButton size={20} icon="filter" onPress={()=> toggleModal()} />
        <Ionicons name="log-out" size={20} style={{marginRight: 10}} onPress={async ()=> {
          await AsyncStorage.removeItem("@user");
          navigation.navigate("LoginMode", {lastVersion});
        }} style={{marginRight: 10}}/>
        {/* <MaterialIcons name="more-vert" size={20} onPress={()=> {}}/> */}
      </View>
		</View>
	);
}