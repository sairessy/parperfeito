import React, { useEffect, useState } from "react";
import { Linking, View } from "react-native";
import {Button, Text} from "react-native-paper";
import config from "../../src/config";
import Constants from "expo-constants";
import Logo from "../components/Logo";

export default function LoginMode({route,navigation}) {
	const {lastVersion} = route.params;

	return (
		<View style={{ flex: 1, backgroundColor: "#fff", padding: 10, paddingTop: Constants.statusBarHeight, alignItems: "center", justifyContent: "center" }}>
			<Logo size={30} />
			<Button mode='contained' style={{ margin: 5, marginTop: 20, padding: 5, backgroundColor: config.colors.primary, width: "100%" }}
				labelStyle={{ textTransform: 'capitalize' }}
				onPress={() => navigation.navigate("Login", {lastVersion})}
			>
				Fazer Login
			</Button>
			<Button mode='contained' style={{ margin: 5, padding: 5, backgroundColor: "#666", width: "100%" }}
				labelStyle={{ textTransform: 'capitalize' }}
				onPress={() => navigation.navigate("HomeVisitor", {lastVersion})}
			>
				Entrar como visitante
			</Button>

			<Text style={{textAlign: "center", marginTop: 10, color: "#2bccb1", 		display: lastVersion ? "none" : "flex"}}
				onPress={()=> Linking.openURL(config.server + "/update")}
			>Baixar actualização</Text>
		</View>
	);
}