import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, Pressable, Image } from 'react-native'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'

const defaultUsers = [
        { id: 1, name: 'Alex', avatar: require('../assets/cat.jpg') },
        { id: 2, name: 'Sara', avatar: require('../assets/cat1.jpeg') },
        { id: 3, name: 'Max', avatar: require('../assets/cat2.jpeg') },
]

const HomeScreen = () => {
        const navigation = useNavigation()

        const handleSignOut = () => {
                signOut(auth)
                        .then(() => {
                                navigation.replace("Login")
                        })
                        .catch(error => alert(error.message))
        }

        const renderUser = ({ item }) => {
                return <Pressable onPress={() => { navigation.navigate("Chat", { latex: "e" }) }} style={styles.row}>
                        <Image style={styles.avatar} source={item.avatar} />
                        <Text> {item.name} </Text>
                </Pressable>
        };

        return (
                <>
                        <View>

                                <FlatList
                                        data={defaultUsers}
                                        renderItem={renderUser}
                                        keyExtractor={item => item.id.toString()} />

                        </View>

                        <View style={styles.container}>
                                <TouchableOpacity
                                        onPress={handleSignOut}
                                        style={styles.button}
                                >
                                        <Text style={styles.buttonText}>Sign out</Text>
                                </TouchableOpacity>
                        </View>

                </>

        )
}

export default HomeScreen

const styles = StyleSheet.create({
        container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
        },
        list: {
                flex: 1,
                justifyContent: 'left',
                alignItems: 'left'
        },

        button: {
                backgroundColor: 'blue',
                width: '60%',
                padding: 15,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 40,
                position: 'absolute',
                bottom: 20,
        },

        buttonText: {
                color: 'white',
                fontWeight: '700',
                fontSize: 16,

        },

        buttonOutline: {
                backgroundColor: 'white',
                marginTop: 5,
                borderColor: 'blue',
                borderWidth: 2,

        },

        buttonOutlineText: {
                color: 'blue',
                fontWeight: '700',
                fontSize: 16,

        },
        row: {
                flexDirection: 'row',
                padding: 10,
                alignItems: 'center',
                borderBottomColor: '#cacaca',
                borderBottomWidth: 1,
        },
        avatar: {
                width: 50,
                height: 50,
                marginRight: 10,
        },

})
