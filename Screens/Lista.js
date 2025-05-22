import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';



import {collection, 
    getFirestore,
    query, doc,
    setDoc, getDocs, deleteDoc} from 'firebase/firestore';
import appFirebase from '../Firease'; // importando la configuracion de firebase

    const db = getFirestore(appFirebase); // inicializando la base de datos


export default function Lista() {

    const navigation = useNavigation();
    const eliminar = (cedula) => {
        Alert.alert(
            'Confirmar aliminacion',
            'Estas seguro de que deseas elimanar este cliente?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteDoc(doc(db, 'clientes', cedula))
                        
                    }
                },
            ],
            { cancelable: true}
        );
    }

    const guardarNuevo = async(nuevo) =>{ // funcion para guardar el nuevo cliente
      await setDoc(doc(db, 'clientes', nuevo.Ncedula), nuevo); // guardando el nuevo cliente en la base de datos
    }
    
    const [clientes, setClientes] = useState([
    ]);

useEffect(() => {
    LeerDatos();
}), [];

const LeerDatos = async () => {
    const q = query(collection(db, "clientes"));
    const querySnapshot = await getDocs(q);
    const d = [];
    querySnapshot.forEach((doc) => {
        const datosBD= doc.data();
        d.push(datosBD);
        
    });
    setClientes(d);
}



    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Formulario', {guardarNuevo})} >

                <FontAwesome5 name="user-plus" size={24} color="blue" />
            </TouchableOpacity>
            <Text style={styles.titulo}> Lista de clientes </Text>

            {clientes.length == 0 ? (
                <Text style={styles.mensaje}> No hay clientes</Text>

            ) : (

                <ScrollView style={styles.scroll}>
                    {clientes.map((clientes, index) => (
                        <View key={index} style={styles.card}>

                            <Text style={styles.label}> Cedula: <Text style={styles.valor}> {clientes.Ncedula} </Text> </Text>


                                <TouchableOpacity style={styles.botone} onPress={() => eliminar (clientes.Ncedula)} >

                                    <FontAwesome5 name="trash" size={24} color="blue" />
                                </TouchableOpacity>



                            <Text style={styles.label}> Nombre: <Text style={styles.valor}> {clientes.Nnombres} </Text> </Text>
                            <Text style={styles.label}> Apeliidos: <Text style={styles.valor}> {clientes.Napellidos} </Text> </Text>
                            <Text style={styles.label}> Fecha de nacimiento: <Text style={styles.valor}> {clientes.Nfechanac} </Text> </Text>
                            <Text style={styles.label}> Sexo: <Text style={styles.valor}> {clientes.Nsexo} </Text> </Text>
                        </View>

                    ))}

                </ScrollView>

            )}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    titulo: {
        fontSize: 25,
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#black',
        paddingTop: 20
    },
    card: {
        height: 130,
        width: 360,
        backgroundColor: 'white',
        alignItems: 'left',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10,
        position: 'relative',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius:30
    },
    label: {
        color: '#00000',
        marginLeft: 10,
        paddingTop: 1,

    },
    valor: {
        color: 'black'

    },
    boton: {
        height: 50,
        backgroundColor: 'white',
        width: 50,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 300,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

    },
    botone: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 32,
        height: 32,
    }
});
