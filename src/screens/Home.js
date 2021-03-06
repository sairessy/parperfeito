import React, { useEffect, useState } from "react";
import { ScrollView, View, Modal, Picker, Linking } from "react-native";
import { Button, TextInput, Text, IconButton } from "react-native-paper";
import config from "../../src/config";
import Header from "../components/Header";
import User from "../components/User";

import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home({route, navigation}) {
  const [ageUnder, setAgeUnder] = useState("36");
  const [modalOpened, setModalOpened] = useState(false);
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(1);
  const [limitReached, setLimitReached] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filterActive, setFilterActive] = useState(true);

  const [filterProvince, seFilterProvince] = useState(0);

  const {lastVersion} = route.params;

  const toggleModal = () => {
    setModalOpened(!modalOpened);
  }
  
  const filter = async () => {
    const user = await AsyncStorage.getItem("@user");
    const data = {maxAge: ageUnder, province: filterProvince, user, lmt: limit};

    const res = await fetch(config.server + "/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    setModalOpened(false);
  }

  const getUsers = async ()=> {
    setLoadingMore(true);
    const user = await AsyncStorage.getItem("@user");

    const res = await fetch(config.server + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user, lmt: limit})
    });

    const json = await res.json();

    setUsers(json.users);
    setLimitReached(json.reached);
    setLoadingMore(false);
  }

  useEffect(()=> {
    getUsers();
  }, [limit]);

	return (
		<View style={{ flex: 1, backgroundColor: "#fff", paddingTop: Constants.statusBarHeight }}>
      <Header toggleModal={toggleModal} lastVersion={lastVersion} navigation={navigation} />
      <View style={{display: lastVersion ? "none" : "flex", backgroundColor: "#f9f9f9", alignItems: "center", padding: 5}}>
      <Text style={{textAlign: "center", color: "#2bccb1"}}
				onPress={()=> Linking.openURL(config.server + "/update")}
			>Baixar actualiza????o</Text>
      </View>
      <ScrollView>
        {users.length > 0 ? users.map(user => (
          <User key={user._id} id={user._id} name={user.name} gender={user.gender} birthday={user.birthday} tel={user.tel} province={user.province} desc={user.desc} interrests={user.interrests} photo={user.photo} zone={user.zone} numberOfViews={user.numberOfViews} navigation={navigation} />
        )) :null}

        <Button icon="chevron-down" mode="contained"
        labelStyle={{textTransform: "capitalize"}}
          style={{
            backgroundColor: loadingMore ? "#aaa" : config.colors.primary,
            margin: 15, display: !limitReached ? "flex" : "none"
          }}
          disabled={loadingMore} loading={loadingMore}
          onPress={()=> setLimit(limit + 1)}
        >Mais</Button>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalOpened}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
            <View  style={{padding: 10}}>
              <IconButton size={20} icon="arrow-left" onPress={()=> setModalOpened(false)} />
              {/* <Checkbox.Item status={filterActive ? "checked" : "unchecked"} label={!filterActive ? "Activar filtro" : "Desactivar filtro"} color={ config.colors.primary} onPress={()=> setFilterActive(!filterActive)} /> */}
              <TextInput mode='outlined' disabled={!filterActive} value={ageUnder} label='Idade abaixo de' activeOutlineColor={config.colors.primary}onChangeText={((text) => setAgeUnder(text))}
                style={{ margin: 5, backgroundColor: '#FFF' }}
              />
               <Picker
                  selectedValue={filterProvince}
                  onValueChange={(item, index)=> seFilterProvince(item)}
                  style={{
                    padding: 10,
                    margin: 5,
                    fontFamily: "main"
                  }}
                  disabled={!filterActive}
                >
                  {config.provinces.map(p => (
                    <Picker.Item key={p.id} label={p.label} value={p.id} />
                  ))} 
                </Picker>
              
              <Button mode='contained' disabled={!filterActive} style={{ margin: 5, padding: 5, backgroundColor: filterActive ? config.colors.primary : "#aaa", marginTop: 20 }}
                labelStyle={{ textTransform: 'capitalize' }}
                onPress={() => filter()}
              >
                Filtrar
              </Button>
            </View>
          </Modal>
      </ScrollView>
		</View>
	);
}