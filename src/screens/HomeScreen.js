import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, Pressable, Image, TextInput, Button} from 'react-native'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'
import React, {useEffect, useState } from "react";
import {
    getDatabase,
    get,
    ref,
    set,
    onValue,
    push,
    update,
  } from 'firebase/database';

const defaultUsers = [
    {id: 1, name:'Alex', avatar: require('../assets/cat.jpg')},
    {id: 2, name:'Sara', avatar: require('../assets/cat1.jpeg')},
    {id: 3, name:'Max', avatar: require('../assets/cat2.jpeg')},
]

const HomeScreen = ({route}) => {
    const [users, setUsers] = useState([]);
    const [userToAdd, setUserToAdd] = useState(null);
    const [myData, setMyData] = useState(null);
    const navigation = useNavigation()
    const { username, avatar } = route.params;
    console.log("welcome", username);

    
    useEffect(() => {
       
        const database = getDatabase();

        const myUserRef = ref(database, `users/${username}`);
        onValue(myUserRef, snapshot => {
            const data = snapshot.val();
            setUsers(data.friends);
        });
    }, [])

   

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    const renderUser=({item}) => {
        return <Pressable onPress={()=> { navigation.navigate("Chat", { firstUser:username, firstAvatar: avatar, secondUser: item.username, secondAvatar: item.avatar, chatroomId: item.chatroomId });
        } } style = {styles.row}>
            <Image style={styles.avatar} source={{uri: item.avatar}}/>
            <Text> {item.username} </Text>
        </Pressable>
    };

    const findUser = async name => {
        const database = getDatabase();
    
        const mySnapshot = await get(ref(database, `users/${name}`));
    
        return mySnapshot.val();
      };

    const onAddFriend = async name => {
        try {

            const database = getDatabase();
            const me = await findUser(username);            
            setMyData(me);
            const user = await findUser(name);
            console.log("add", name, user);

            if (user) {
                if (user.username == me.username) {
                    //console.log("git");
                    return;
                }
                // sprawdzenie czy juz nie dodalismy 
                const newChatroomRef = push(ref(database, 'chatrooms'), {
                    firstUser: me.username,
                    secondUser: user.username,
                    messages: [],
                  });
          
                  const newChatroomId = newChatroomRef.key;
          
                  const userFriends = user.friends || [];
                  //join myself to this user friend list
                  update(ref(database, `users/${user.username}`), {
                    friends: [
                      ...userFriends,
                      {
                        username: me.username,
                        avatar: me.avatar,
                        chatroomId: newChatroomId,
                      },
                    ],
                  });
          
                  const myFriends = users || [];
                  //add this user to my friend list
                  update(ref(database, `users/${me.username}`), {
                    friends: [
                      ...myFriends,
                      {
                        username: user.username,
                        avatar: user.avatar,
                        chatroomId: newChatroomId,
                      },
                    ],
                  });
                
            }


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>


        <View style={styles.addUser}>
            <TextInput
            style={styles.input}
            onChangeText={setUserToAdd}
            value={userToAdd}
            />
            <Button title={'Add User'} onPress={() => onAddFriend(userToAdd)} />
        </View>
        <View>
         
            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={item=>item.username.toString()} />
        
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
        bottom:20,
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
        flexDirection:'row',
        padding:10,
        alignItems:'center',
        borderBottomColor:'#cacaca',
        borderBottomWidth:1,
    },
    avatar: {
        width:50,
        height:50,
        marginRight:10,
    },
    addUser: {
        flexDirection: 'row',
        padding: 10,
    },
    input: {
        backgroundColor: '#cacaca',
        flex: 1,
        marginRight: 10,
        padding: 10,
    },

})
