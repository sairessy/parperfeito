import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, Checkbox } from 'react-native-paper';

import Constants from 'expo-constants';

import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo from '../components/Logo';
import config from '../../src/config';

export default function Login({route, navigation}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {lastVersion} = route.params;

  const login = async ()=> {
    setIsLoading(true);
    const data = {email, pass};

    const res = await fetch(config.server + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    if(json.success) {
      await AsyncStorage.setItem("@user", json.user);
      navigation.navigate("Profile", {lastVersion});
    } else {
      setErrorMessage("Email ou senha incorrecta!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
    setIsLoading(false);
  }

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
        <Text style={{color: "#ff0000", fontSize: 14, marginLeft: 10, height: 10}}>{errorMessage}</Text>
        <Checkbox.Item status={showPassword ? "checked" : "unchecked"} label="Mostrar senha" disabled={isLoading} color={ isLoading ? "#aaa" : config.colors.primary} onPress={()=> setShowPassword(!showPassword)} />
        <Button mode='contained' style={{ margin: 5, padding: 5, backgroundColor: isLoading ? "#aaa" : config.colors.primary }}
          labelStyle={{ textTransform: 'capitalize' }} loading={isLoading} disabled={isLoading}
          onPress={() => login()}
        >
          Entrar
        </Button>
        <Text style={{color: config.colors.primary, textAlign: "center", margin: 5}} onPress={() => navigation.navigate("SignUp", {lastVersion})}>Ainda não tenho uma conta!</Text>

        <Text style={{color: config.colors.primary, textAlign: "center", margin: 5}} onPress={() => {}}>Esqueci a senha!!</Text>
      </View>
    </View >
  );
}