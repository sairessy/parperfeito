import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, Picker, Modal, TouchableOpacity, Alert } from "react-native";
import { Button, IconButton, Text, TextInput, Checkbox } from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import config from "../config";

import * as ImagePicker from 'expo-image-picker';

import Constants from "expo-constants";

import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Profile({route, navigation}) {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [province, setProvince] = useState("0");
  const [profileIsPublic, setProfileIsPublic] = useState(true);
  const [tel, setTel] = useState("");
  const [desc, setDesc] = useState("");
  const [interrests, setInterrests] = useState("");
  const [gender, setGender] = useState("0");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [photo, setPhoto] = useState("https://img.icons8.com/windows/50/ffffff/user.png");
  const [profession, setProfession] = useState("");
  const [zones, setZones] = useState([]);
  const [zone, setZone] = useState("0");
  const [image, setImage] = useState("");
  const [modalPhoto, setModalPhoto] = useState("");
  const [modalOpened, setModalOpened] = useState(false);

  const {lastVersion} = route.params;

  const getUserInfo = async ()=> {
    const user = await AsyncStorage.getItem("@user");
    setUser(user);
    const res = await fetch(config.server + "/privateuserinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user})
    });

    const json = await res.json();

    if(json.photo != undefined) {
      setPhoto(json.photo);
    }

    if(!json.profileUpdated) {
      setEmail(json.email);
      const zonesAux = config.provinces.filter(p => p.id == 0)[0].zones;
      setZones(zonesAux);
    } else {
      setEmail(json.email);
      setName(json.name);
      setBirthday(json.birthday);
      setProvince(json.province);
      setTel(json.tel);
      setDesc(json.desc);
      setGender(json.gender);
      setInterrests(json.interrests);
      setProfileIsPublic(json.profileIsPublic);
      if(json.profession) {
        setProfession(json.profession);
      }
      if(json.zone) {
        setZone(json.zone);
      }
      const zonesAux = config.provinces.filter(p => p.id == json.province)[0].zones;
      setZones(zonesAux);
    }
  }
  

  const update = async ()=> {
    const user = await AsyncStorage.getItem("@user");
    const data = {email, name, birthday, province, zone, profileIsPublic, tel, desc, interrests, gender, profession, user};
    
    const res = await fetch(config.server + "/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    alert("Perfil actualizado com sucesso!");
  }

  const updatePhoto = async ()=> {
    
    if(modalPhoto != "") {
      const res = await fetch(config.server + "/uploadprofilephoto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({user, modalPhoto})
      });
  
      const json = await res.json();
      alert("Foto de perfil actualizada com sucesso!");
      setImage("");
    }
  }

  const uploadPhoto = async ()=> {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      setImage(result.uri);
      setModalPhoto(result.uri);
    }
  }

  const logout = async ()=> {
    // Alert.alert('Terminar sessão', 'Deseja realmente terminar a sessão?', [
    //   {
    //     text: 'Não',
    //     onPress: () => { },
    //     style: 'cancel',
    //   },
    //   {
    //     text: 'SIM', onPress: async () => {
    //       await AsyncStorage.removeItem("@user");
    //       navigation.navigate("Login");
    //     }
    //   },
    // ]);

    await AsyncStorage.removeItem("@user");
    navigation.navigate("LoginMode", {lastVersion});
    
  }

  useEffect(()=> {
    getUserInfo();
  }, [image]);


	return (
		<View style={{ flex: 1, backgroundColor: "#fff", paddingTop: Constants.statusBarHeight }}>
      <View style={{height: 120, justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#ddd", backgroundColor: "#fff"}}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", position: "absolute", top: 0, left: 0, right: 0, padding: 5}}>
          <Ionicons size={20} name="home"  onPress={()=> navigation.navigate("Home", {lastVersion})} />
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Ionicons size={20} name="settings" style={{marginRight: 10}} onPress={()=> navigation.navigate("Settings")}/>
            <Ionicons name="log-out" size={20} onPress={()=> logout()}/>
          </View>
        </View>
        <TouchableOpacity
            onPress={()=>setModalOpened(true)}
        >
          <Image 
            style={{
              width: 80, height: 80, borderRadius: 5, backgroundColor: "#ddd"
            }} 
            source={{uri:photo}}
          />
        </TouchableOpacity>
        
      </View>
        <ScrollView style={{padding: 10, backgroundColor: "#fff"}}>
        <TextInput mode='outlined' value={email} label='Email' activeOutlineColor={config.colors.primary} onChangeText={((text) => setEmail(text))}
          style={{ margin: 5, backgroundColor: '#FFF' }}
        />
        <TextInput mode='outlined' value={name} label='Nome completo' activeOutlineColor={config.colors.primary} onChangeText={((text) => setName(text))}
          style={{ margin: 5, backgroundColor: '#FFF' }}
        />
        <TextInput mode='outlined' value={birthday} label='Data de nascimento' activeOutlineColor={config.colors.primary} onChangeText={((text) => setBirthday(text))}
          style={{ margin: 5, backgroundColor: '#FFF' }}
        />

        <Picker
          selectedValue={gender}
          onValueChange={(item, index)=> setGender(item)}
          style={{
            padding: 10,
            margin: 5,
            fontFamily: "main"
          }}
        >
          {config.genders.map(g => (
            <Picker.Item key={g.id} label={g.label} value={g.id} />
          ))} 
        </Picker>
        <Picker
          selectedValue={province}
          onValueChange={(item, index)=> {
            setProvince(item); 
            const zonesAux = config.provinces.filter(p => p.id == item)[0].zones;
            setZones(zonesAux);
            setZone("0");
          }}
          style={{
            padding: 10,
            margin: 5,
            fontFamily: "main"
          }}
        >
          {config.provinces.map(p => (
            <Picker.Item key={p.id} label={p.label} value={p.id} />
          ))} 
        </Picker>
        <Picker
          selectedValue={zone}
          onValueChange={(item, index)=> setZone(item)}
          style={{
            padding: 10,
            margin: 5,
            fontFamily: "main",
            display: zones.length > 0 ? "flex" : "none"
          }}
        >
          {zones.length > 0 ? zones.map(z => (
            <Picker.Item key={z.idd}  label={z.label} value={z.idd} />
          )): null} 
        </Picker>
        <TextInput mode='outlined' value={profession} label='Profissão' activeOutlineColor={config.colors.primary} onChangeText={((text) => setProfession(text))}
          style={{ margin: 5, backgroundColor: '#FFF' }}
        />
        
        <TextInput mode='outlined' value={tel} label='Contacto' activeOutlineColor={config.colors.primary} onChangeText={((text) => setTel(text))}
          style={{ margin: 5, backgroundColor: '#FFF' }}
        />
        <TextInput multiline={true} numberOfLines={5} mode='outlined' value={desc} label='Sobre mim' activeOutlineColor={config.colors.primary} onChangeText={((text) => setDesc(text))}
          style={{ margin: 5, backgroundColor: '#FFF' }}
        />
        <TextInput mode='outlined' value={interrests} label='Meus interresses' activeOutlineColor={config.colors.primary} onChangeText={((text) => setInterrests(text))}
          style={{ margin: 5, backgroundColor: '#FFF' }}
        />
        <Checkbox.Item status={profileIsPublic ? "checked" : "unchecked"} label="Perfil público" color={config.colors.primary} 
          onPress={()=> setProfileIsPublic(!profileIsPublic)}
        />
        <Button mode='contained' style={{ margin: 5, padding: 5, marginBottom: 20, backgroundColor: config.colors.primary }}
          labelStyle={{ textTransform: 'capitalize' }}
          onPress={() => update()}
        >
          Actualizar
        </Button>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalOpened}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
            <View  style={{padding: 10}}>
              <IconButton size={20} icon="arrow-left" onPress={()=> {setModalOpened(false), setImage(""), setModalPhoto("")}} />
              <View style={{justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity
                onPress={()=>uploadPhoto()}
                style={{
                  justifyContent: "center", alignItems: "center"
                }} 
              >
                <Image 
                  style={{
                    width: 80, height: 80,backgroundColor: "#ddd", borderRadius: 5
                  }} 
                  source={{uri: modalPhoto}}
                />
              </TouchableOpacity>
              </View>
              
              <Button mode='contained' style={{ margin: 5, padding: 5, backgroundColor: config.colors.primary, marginTop: 20 }}
                labelStyle={{ textTransform: 'capitalize' }}
                onPress={() => updatePhoto()}
              >
                Actualizar foto
              </Button>
            </View>
          </Modal>
      </ScrollView>
		</View>
	);
}