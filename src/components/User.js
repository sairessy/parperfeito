import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import config from "../config";


export default function User({id, name, birthday, gender, province, zone, tel, photo, desc, interrests, numberOfViews, navigation }) {
  const [zoneLabel, setZoneLabel] = useState("");

  useEffect(() => {
    if(zone != undefined) {
      const zones = config.provinces.filter(p => p.id == province)[0].zones.filter(z => z.idd == zone);
      
      if(zones.length > 0) {
        setZoneLabel(zones[0].label);
      }
    }
  }, []);

	return (
		<TouchableOpacity style={{flexDirection: "row", margin: 10, padding: 10 }}
      onPress={()=>navigation.navigate("PublicProfile", {
        id, name, birthday, province, gender, zone, tel, desc, interrests, photo
      })}
    >
      <View style={{paddingRight: 10}}>
        <Image 
          style={{
            width: 50, height: 50, borderRadius: 5, backgroundColor: "#ddd"
          }} 
          source={{uri: photo == null ? "https://img.icons8.com/windows/64/ffffff/user.png" : photo}}
        />
      </View>
      <View style={{flex: 1}}>
        
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Ionicons name={config.genders.filter(g => g.id == gender)[0].icon} size={10} color="#ccc" />
          <Text style={{fontFamily: "main", marginLeft: 5}}>{name}</Text>
        </View>
        <Text style={{color: "#666", fontSize: 12, fontFamily: "main"}}>
          {config.provinces.filter(p=> p.id == province)[0].label}{zoneLabel !== "" ?" > " + zoneLabel : ""}
        </Text>
        
        <Text style={{color: "#666", fontSize: 12, fontFamily: "main"}}>{new Date().getFullYear() - birthday + " anos"}</Text>
      </View>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text style={{color: "#ccc", fontSize: 11, marginRight: 5}}>{numberOfViews  != undefined ? numberOfViews : 0}</Text>
        <View style={{backgroundColor: "#ddd", width: 15, height: 15, borderRadius: 2, justifyContent: "center", alignItems: "center"}}>
          <Ionicons size={10} color="#fcfcfc" name="md-eye" />
        </View>
      </View>
		</TouchableOpacity>
	);
}