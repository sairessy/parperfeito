import React, { useEffect, useState } from 'react';
import { View, ScrollView, Modal } from 'react-native';
import { Button, Text, TextInput, IconButton } from 'react-native-paper';

import CONFIG from '../config';
import Constants from "expo-constants";

// Components
import Logo from '../components/Logo';
import config from '../../src/config';

export default function Recovery({navigation}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cPass, setCPass] = useState('');
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [modalOpened, setModalOpened] = useState(false);

  const recovery = ()=> {
    const data = {email};
    if(pass != cPass) {
      setErrorMessage("As senhas não coincidem!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    if(email == "" || pass == "" || cPass == "") {
      setErrorMessage("Preencha todos os campos!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    alert("Enviamos um código de confirmação para o seu email!");
    setModalOpened(true);
  }

  const changePass = async ()=> {
    const data = {email, pass, code};
    setErrorMessage("O código introduzido é incorrecto!");
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
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
        <TextInput mode='outlined' value={pass} label='Senha' secureTextEntry activeOutlineColor={config.colors.primary} onChangeText={((text) => setPass(text))}
          style={{ margin: 5, backgroundColor: '#FFF' }}
        />
        <TextInput mode='outlined' value={cPass} label='Confirme a senha' secureTextEntry activeOutlineColor={config.colors.primary} onChangeText={((text) => setCPass(text))}
          style={{ margin: 5, backgroundColor: '#FFF' }}
        />
        <Text style={{color: "#ff0000", fontSize: 14, marginLeft: 10, marginBottom: 10, height: 10}}>{errorMessage}</Text>
        <Button mode='contained' style={{ margin: 5, padding: 5, backgroundColor: CONFIG.colors.primary }}
          labelStyle={{ textTransform: 'capitalize' }}
          onPress={() => recovery()}
        >
          Recuperar
        </Button>

        <Text style={{color: config.colors.primary, textAlign: "center", margin: 5}} onPress={() => navigation.navigate("SignUp")}>Ainda não tenho uma conta!</Text>
        <Text style={{color: config.colors.primary, textAlign: "center", margin: 5}} onPress={() => navigation.navigate("Login")}>Já tenho uma conta!</Text>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalOpened}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
            <View  style={{padding: 10}}>
              <IconButton size={20} icon="arrow-left" onPress={()=> setModalOpened(false)} />
              <TextInput mode='outlined' value={code} label='Código de confirmação' activeOutlineColor={config.colors.primary}onChangeText={((text) => setCode(text))}
                style={{ margin: 5, backgroundColor: '#FFF' }}
              />
              <Text style={{color: "#ff0000", fontSize: 14, marginLeft: 10, marginBottom: 5, height: 10}}>{errorMessage}</Text>
              <Button mode='contained' style={{ margin: 5, padding: 5, backgroundColor: config.colors.primary, marginTop: 20 }}
                labelStyle={{ textTransform: 'capitalize' }}
                onPress={() => changePass()}
              >
                Confirmar
              </Button>
            </View>
          </Modal>
      </View>
    </View >
  );
}