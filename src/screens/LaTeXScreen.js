import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat, InputToolbar, Actions } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/core";
import MathJax from "react-native-mathjax";

const LaTeXScreen = ({route}) => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const {firstUser, firstAvatar, secondUser, secondAvatar, chatroomId} = route.params;

  const appendText = (text) => {
    setMessage(message + " " + text);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView 
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       keyboardVerticalOffset = {60}
      style={styles.wrapper}>
        <View style={styles.compiled_wrapper}>
          <ScrollView style={styles.compiled_text_wrapper}>
          <View style={styles.compiled}>
            <MathJax
              style={styles.latex}
              mathJaxOptions={mmlOptions}
              html={message}
            />
          </View>
          </ScrollView>
        </View>

        <View style={styles.button_wrapper}>

        <Pressable
          style={styles.latexButton}
          onPress={() => {
            appendText("hi");
          }}
        >
          <Text>Integral</Text>
        </Pressable>

        
        </View>

        
        <View style={styles.textarea_wrapper}>

          <View style={styles.input_toolbar_wrapper}>
          <TextInput
            multiline
            numberOfLines={1}
            style={styles.input}
            value={message}
            spellCheck={false}

            onChangeText={(text) => {
              setMessage(text);
              //console.log(text);
            }}
            placeholder="useless placeholder"
          />
          </View>
          
        <View style={styles.back_button_wrapper}>
          <Pressable
          style={styles.backButton}
          onPress={() => {
            navigation.navigate("Chat", 
            {firstUser:firstUser, firstAvatar: firstAvatar, secondUser: secondUser, secondAvatar: secondAvatar, chatroomId: chatroomId, latex: message });
          }}>
          <Text>BChat</Text>
        </Pressable>


        </View>
          
          
          

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    // padding: 5,

    // flex: 1,
  },
  compiled_wrapper: {
    height: "30%",
  },
  button_wrapper: {
    height: "55%",
  },
  input_toolbar_wrapper: {
    width: "85%"
  },
  back_button_wrapper: {
    width: "15%",
    // flexDirection:"row",
    alignSelf:"flex-end",

  },
  compiled_text_wrapper: {
    height: "100%",
  },
  textarea_wrapper: {
    // height: "20%",
    width: "100%",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: 'column',
    justifyContent: 'space-between',

    justifyContent: "flex-end",
  },

  input: {
    width: "100%",
    height: "100%",
    // minHeight: 50,
    // maxHeight: 200,
    // display: "flex",
    borderWidth: 1,
    // borderColor: 'gray',
    fontSize: 16,
    // marginBottom: 16,

  },

  latexButton: {
    backgroundColor: "blue",
    width: "60%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 40,
    // position: 'absolute',
    bottom: 20,
  },

  backButton: {
    // width: "20%",
    height: "100%",
    backgroundColor: "blue",
    color: "white",
    // alignSelf: "flex-end",
    // width: "60%",
    // padding: 15,
    // borderRadius: 5,
    // alignItems: "center",
    // marginTop: 40,
    // position: 'absolute',
    // bottom: 20,
  },
});

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

export default LaTeXScreen;
