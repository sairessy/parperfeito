import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, Checkbox } from 'react-native-paper';

import CONFIG from '../config';

import Constants from "expo-constants";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import Logo from '../components/Logo';
import config from '../../src/config';

export default function SignUp({route, navigation}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cPass, setCPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {lastVersion} = route.params;

  const chekAucth = async () => {
    const user = await AsyncStorage.getItem("@user");
    if(user != null) {
      navigation.navigate("Home", {lastVersion});
    }
  }

  const signUp = async () => {
    setIsLoading(true);
    if(pass != cPass) {
      setErrorMessage("As senhas não coincidem!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      setIsLoading(false);
      return;
    }

    if(email == "" || pass == "" || cPass == "") {
      setErrorMessage("Preencha todos os campos!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      setIsLoading(false);
      return;
    }

    const data = {email, pass};

    const res = await fetch(config.server + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    alert("Registado com sucesso!");
    setIsLoading(false);
    navigation.navigate("Login", {lastVersion});
  }

  useEffect(()=> {
    chekAucth();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: Constants.statusBarHeight }}>
      <View style={{justifyContent: "center", alignItems: "center", padding: 10}}>
        <Logo size={30} />
      </View>
      <View style={{padding: 5}}>
        <TextInput mode='outlined' value={email} label='Email' activeOutlineColor={config.colors.primary}onChangeText={((text) => setEmail(text))}
          style={{ margin: 5, backgroundColor: '#FFF' }}
        />
        <TextInput mode='outlined' value={pass} label='Senha' secureTextEntry={!showPassword} activeOutlineColor={config.colors.primary} onChangeText={((text) => setPass(text))}
          style={{ margin: 5, backgroundColor: '#FFF' }}
        />
        <TextInput mode='outlined' value={cPass} label='Confirme a senha' secureTextEntry={!showPassword} activeOutlineColor={config.colors.primary} onChangeText={((text) => setCPass(text))}
          style={{ margin: 5, backgroundColor: '#FFF' }}
        />
        <Text style={{color: "#ff0000", fontSize: 14, marginLeft: 5, marginBottom: 10, height: 10}}>{errorMessage}</Text>
        <Checkbox.Item status={showPassword ? "checked" : "unchecked"} label="Mostrar senha" disabled={isLoading} color={ isLoading ? "#aaa" : config.colors.primary} onPress={()=> setShowPassword(!showPassword)} />
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Checkbox color={config.colors.primary} status={termsAccepted ? "checked" : "unchecked"} onPress={()=> setTermsAccepted(!termsAccepted)}/>
          <Text>Li e concordo com os <Text onPress={()=>navigation.navigate("Terms")} style={{color: config.colors.primary}}>termos de uso</Text>!</Text>
        </View>
        <Button mode='contained' style={{ margin: 5, padding: 5, backgroundColor: (isLoading || !termsAccepted) ? "#aaa" : CONFIG.colors.primary }}
          labelStyle={{ textTransform: 'capitalize' }} loading={isLoading} disabled={isLoading || !termsAccepted}
          onPress={() => signUp()}
        >
          Registar
        </Button>
       
        <Text style={{color: config.colors.primary, textAlign: "center", margin: 5}} onPress={() => navigation.navigate("Login", {lastVersion})}>Já tenho uma conta!</Text>

        <Text style={{color: config.colors.primary, textAlign: "center", margin: 5}} onPress={() => {}}>Esqueci a senha!</Text>
      </View>
    </View >
  );
}