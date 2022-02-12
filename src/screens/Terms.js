import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {Text} from "react-native-paper";
import config from "../../src/config";
import Constants from "expo-constants";


export default function Terms({navigation}) {

	return (
		<View style={{ flex: 1, backgroundColor: "#fff", paddingTop: Constants.statusBarHeight, alignItems: "center", justifyContent: "center" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
				<Text>O Par Perfeito é uma aplicação Moçambicana criada com o intuito de ajudar na procura de uma cara metade para compartilhar as emoções da vida. O usuário tem a possibilidade de tornar o perfil privado a qualquer momento, permitindo assim que os seus dados não sejam mais vistos pelo o público.</Text>
			</ScrollView>
		</View>
	);
}