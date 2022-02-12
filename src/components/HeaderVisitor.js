import React, { useState } from "react";
import { View } from "react-native";
import {IconButton } from "react-native-paper";
import Logo from "./Logo";
import {Ionicons, MaterialIcons} from "@expo/vector-icons"


export default function HeaderVisitor({toggleModal, navigation}) {

	return (
		<View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#ddd", height: 50, padding: 5 }}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <IconButton icon="arrow-left" size={20} style={{marginRight: 10}} onPress={async ()=> {
          navigation.goBack()
        }} style={{marginRight: 10}}/>
        <Logo size={30} />
      </View>
    
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <IconButton size={20} icon="filter" onPress={()=> toggleModal()} />
       
        {/* <MaterialIcons name="more-vert" size={20} onPress={()=> {}}/> */}
      </View>
		</View>
	);
}