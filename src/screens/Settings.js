import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {Text} from "react-native-paper";
import config from "../../src/config";
import Constants from "expo-constants";


export default function Settings({navigation}) {

	return (
		<View style={{ flex: 1, backgroundColor: "#fff", paddingTop: Constants.statusBarHeight, alignItems: "center", justifyContent: "center" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 5 }}>
				
			</ScrollView>
		</View>
	);
}