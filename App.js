import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import * as yup from 'yup';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';


export default function App() {
    const [usuario, setUsuario] = useState({
      nome_usuario: "",
      email: "",
      senha: ""
    });

    const schema = yup.object({
      nome_usuario: yup.string().required("Nome Completo não pode ser vazio"),
      email: yup.string().email("Email inválido").required("Email não pode ser vazio"),
      senha: yup.string().min(6, "A senha tem de ter no mínimo 6 caracteres").required("Senha não pode ser vazio")
    })

  return (
    <RootSiblingParent>
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput 
      placeholder='Nome completo'
      placeholderTextColor={'#fff'}
      style={styles.input}
      value={usuario.nome_usuario}
      onChangeText={(value) => {
        setUsuario({...usuario, nome_usuario: value})
      }}/>

      <TextInput 
      placeholder='Email'
      placeholderTextColor={'#fff'} 
      style={styles.input}
      keyboardType='email-address'
      value={usuario.email}
      onChangeText={(value) => {
        setUsuario({...usuario, email: value})
      }}/>

      <TextInput 
      placeholder='Senha'
      placeholderTextColor={'#fff'} 
      style={styles.input}
      secureTextEntry
      value={usuario.senha}
      onChangeText={(value) => {
        setUsuario({...usuario, senha: value})
      }}
      />

      <TouchableOpacity style={styles.cadastro}
      activeOpacity={0.5}
      onPress={async () => {
        try {
          await schema.validate(usuario)
          Toast.show("Cadastro feito com sucesso.", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM
          });
        } catch (error) {
          Toast.show(error.message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM
          })
        }
      }}>
        <Text>Cadastra-se</Text>
      </TouchableOpacity>

    </View>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1C'
  },
  title:{
    textAlign: 'center',
    paddingVertical: 50,
    fontSize: 25,
    color: 'white',
    fontWeight: '700'
    },
  input: {
    borderBottomWidth: 1,
    height: 50,
    width: 300,
    fontSize: 15,
    padding: 15,
    marginBottom: 20,
    color: 'white',
    borderColor: '#fff',
  },
  cadastro: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderWidth: 1,
    margin: 20,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#3498db'
  }
});
