import React, { useState } from "react";
import { Text, View, Image } from "react-native";


export default function Logo({size}) {

	return (
		<View style={{flexDirection: "row", alignItems: "center" }}>
      <Image style={{width: size, height: size, marginRight: 5}} source={require("../../assets/icon.png")} />
      <Text style={{fontSize: 18, fontFamily: "title", color: "#666"}}>Par Perfeito</Text>
		</View>
	);
}