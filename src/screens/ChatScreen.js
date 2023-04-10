import React, {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, SafeAreaView} from 'react-native';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/core'


export default function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation()

    const customtInputToolbar = props => {
      return (
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: "white",
          }}
        />
      );
    };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: require('../assets/cat.jpg'),
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <>

        <Pressable onPress={()=> {navigation.replace("Home")} }style={styles.actionBar}>
            <Image source={require('../assets/back.png')} />
        </Pressable>

    <GiftedChat
            renderInputToolbar={props => customtInputToolbar(props)}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
      />
</>
  )
}


const styles = StyleSheet.create({
    actionBar: {
        backgroundColor:'#cacaca',
        height:41,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
    },
    
})