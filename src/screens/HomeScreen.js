import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'

const HomeScreen = () => {
    const navigation = useNavigation()

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }


    return (
        <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        backgroundColor: 'blue',
        width: '60%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 40,
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

    }

})
