import React, { useCallback, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { GiftedChat, InputToolbar, Actions } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/core";
import MathJax from "react-native-mathjax";
import WebView from "react-native-webview";



const LaTeXScreen = () => {
  const navigation = useNavigation();
  const [messsage, setMessage] = useState('');

  return (
    <SafeAreaView>
    <View style={styles.wrapper}>
      <View style={styles.compiled_wrapper}>
        <View style={styles.compiled}>
          <MathJax style={styles.latex} mathJaxOptions={mmlOptions} html={messsage} />
        </View>
        </View>
    <View style={styles.textarea_wrapper}>
      <TextInput
        multiline
        numberOfLines={1}
        style={styles.input}
        onChangeText={(text) => {setMessage(text);console.log(text)}}
        placeholder="useless placeholder"
      />
      </View>



    </View>
    </SafeAreaView>
  );
};

// const renderMessage = (text) =>


const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    
    // flex: 1,
  },
  compiled_wrapper: {
    height: '30%'
  },
  textarea_wrapper: {
    height: '70%',
    justifyContent: 'flex-end',
  },

  input: {
    width: '100%',
    minHeight: 50,
    maxHeight: 150,
    display: 'flex',
    borderWidth: 1,
    // borderColor: 'gray',
    fontSize: 16,
    padding: 5,

  }



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
