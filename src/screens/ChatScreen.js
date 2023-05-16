import React, { useCallback, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, SafeAreaView } from "react-native";
import { GiftedChat, InputToolbar, Actions } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/core";

export default function ChatScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
 
  const customtInputToolbar = (props) => {
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
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: require("../assets/cat.jpg"),
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderActions = (props) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("LaTeX");
        }}
        style={styles.latexButton}
      ><Text>
        LaTeX
        </Text>
      </Pressable>
    );
  };

  return (
    <>
      <Text>{JSON.stringify(latex)}</Text>
      <Pressable
        onPress={() => {
          navigation.replace("Home");
        }}
        style={styles.actionBar}
      >
      </Pressable>

      <GiftedChat
        renderInputToolbar={(props) => customtInputToolbar(props)}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderActions={() => renderActions()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  actionBar: {
    backgroundColor: "#cacaca",
    height: 41,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  latexButton: {
    // backgroundColor: '#880000',
    height: "200%",
  },
});
