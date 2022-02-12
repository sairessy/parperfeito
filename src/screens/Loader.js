import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import {Text} from "react-native-paper";
import config from "../../src/config";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Loader({navigation}) {

	const checkVersion = async () => {
		const res = await fetch(config.server + "/version");
		const json = await res.json();
		const appV = Constants.manifest.version;
		return json.version == appV
	}

	const checkAuth = async () => {
    const user = await AsyncStorage.getItem("@user");
		const lastVersion = await checkVersion();
    if(user != null) {
      navigation.navigate("Home", {lastVersion});
    } else {
			navigation.navigate("LoginMode", {lastVersion});
		}
  }
	
	
	const checkConnection = async () => {
		const res = await fetch(config.server + "/test");
		const json = await res.json();

		if(json.success) {
			checkAuth();
		}
	}
	
	useEffect(()=> {
		checkConnection();
	}, [])

	return (
		<View style={{ flex: 1, backgroundColor: "#fff", paddingTop: Constants.statusBarHeight, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={config.colors.primary} />
      <Text style={{color: "#666", marginTop: 10}}>Carregando...</Text>
		</View>
	);
}