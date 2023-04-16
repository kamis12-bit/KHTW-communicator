import React, { useCallback, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/core";
import MathJax from "react-native-mathjax";

//options for MathJax
const mmlOptions = {
  messageStyle: "none",
  extensions: ["tex2jax.js"],
  jax: ["input/TeX", "output/HTML-CSS"],
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
  },
  TeX: {
    extensions: [
      "AMSmath.js",
      "AMSsymbols.js",
      "noErrors.js",
      "noUndefined.js",
    ],
  },
};

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const customtInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "white",
      }}
    />
  );

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "<p>Hello developer, check out this equation: $ \\frac{(n^2+n)(2n+1)}{6}$  </p>",
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

  function CustomMessage({ message }) {
    const { text, user } = message;

    return (
      <View style={styles.message}>
        {/* <Text> hi</Text> */}
        <MathJax style={styles.latex} mathJaxOptions={mmlOptions} html={text} />
      </View>
    );
  }

  return (
    <>
      <Pressable
        onPress={() => {
          navigation.replace("Home");
        }}
        style={styles.actionBar}
      >
        <Image source={require("../assets/back.png")} />
      </Pressable>

      <GiftedChat
        renderInputToolbar={(props) => customtInputToolbar(props)}
        messages={messages}
        onSend={(messages) => {
          onSend(messages);
        }}
        user={{ _id: 1 }}
        renderMessageText={({ currentMessage }) => (
          <CustomMessage message={currentMessage} />
        )}
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
  // container: {
  //   position:'relative',
  //   height: 30,
  //   flex: 1,
  //   margin: 30,
  // },
  // text: {
  //   fontSize: 20,
  //   fontWeight: "500",
  //   marginTop: 20,
  // },
  message: {
    flex: 0,
    // margin: 30,
    // backgroundColor: colors.chatPurple,
    // borderRadius: 30,
    // borderBottomRightRadius: 30,
    // marginBottom: 10,
    padding: 5,
    right: 15,
    justifyContent: "flex-end",
    alignSelf: "stretch",
    marginLeft: 10,
  },
  latex: {
    minWidth: 150,

    fontSize: 10,
    backgroundColor: 0,
  },
});

