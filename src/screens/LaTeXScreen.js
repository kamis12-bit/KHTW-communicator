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
  FlatList,
  KeyboardAvoidingView,
  Touchable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { GiftedChat, InputToolbar, Actions } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/core";
import MathJax from "react-native-mathjax";

const formulas_pool = [
  {
    title: 'Integral',
    formula: '\\int_{a}^{b}'

  },
  {
    title: 'Sum',
    formula: '\\sum_{a}^{b}'
  },
 

]



const LaTeXScreen = ({ route }) => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const {  firstUser, firstAvatar, secondUser, secondAvatar, chatroomId , latex } = route.params;
  const [find, setFind] = useState("")
  const [formulas, setFormulas] = useState(formulas_pool)  
  console.log(latex);

  const appendText = (text) => {
    setMessage(message + " " + text);
  };

  const filterFormulas = () => {
    if(find == "") {
      setFormulas(formulas_pool);
      return;
    }
    let s = '/*' + find + '*$/';
    let regex = new RegExp(s )
    var l = []
    for(var i = 0; i < formulas_pool.length; i++) {
      if(formulas_pool[i].title.includes(find)) {
        l.push(formulas_pool[i]);
      }
    }
    // formulas_pool.forEach((name) => {
    //   if(typeof(name) != "undefined" && 
    //   regex.test(name.title))
    //   {
    //     list.push(name)
    //   }})
    setFind("")
    setFormulas(l)
  }

  const appendFormula = (formula) => {
    appendText('$' + formula + '$')

  }

  const Item = ({ item }) => (
    <Pressable onPress={() => { appendFormula(item.formula) }}>
      <View style={styles.list_item}>
        <Text style={styles.list_item_title}>{item.title}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
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
          <View style={styles.formulas_search}>

          <View style={styles.find_wrapper}>
              <TextInput
                style={styles.list_find_text}
                spellCheck={false}
                onChangeText={(text) => {
                  setFind(text);
                  console.log(find);
                }}
                value={find}
                placeholder="Find a formula"
              />
            </View>
              

            <View style={styles.find_button_wrapper}>
              <Pressable
                style={styles.find_button}
                onPress={() => {
                  filterFormulas();
                }}
                >
               <Text style={styles.find_text}>Find</Text>
              </Pressable>
              

            </View>






          </View>

          {/* <Pressable
          style={styles.latexButton}
          onPress={() => {
            appendText(latex);
          }}
        >
          <Text>Integral</Text>
        </Pressable> */}
          {/* <ScrollView style={styles.formulas_scroll}> */}
          <View style={styles.list_wrapper}>
            <FlatList
              data={formulas}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={item => item.formula}
            />
            {/* </ScrollView> */}
          </View>

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
              placeholder="Enter a message"
            />
          </View>

           <Pressable
          style={styles.latexButton}
          onPress={() => {
            appendText(latex);
          }}
        >
          <Text>Paste my last message</Text>
        </Pressable>

          <View style={styles.back_button_wrapper}>
            <Pressable
              style={styles.backButton}
              onPress={() => {
                navigation.navigate("Chat",
                  { firstUser: firstUser, firstAvatar: firstAvatar, secondUser: secondUser, secondAvatar: secondAvatar, chatroomId: chatroomId, latex: message });
              }}>
              <Text>Chat</Text>
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
    backgroundColor: 'white',
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
    alignSelf: "flex-end",

  },
  compiled_text_wrapper: {
    height: "100%",
  },
  find_wrapper: {
    
    height: '100%',
    width: '80%',
  },
  list_find_text: {
    height: '100%',
    width: '100%',
    fontSize: 16,
  },
  find_button_wrapper: {
    height: "100%",
    width: "20%",
    // textAlignVertical: 'center',
    alignSelf: "flex-end",
    // justifyContent: 'flex-end',
    position: 'absolute',
    backgroundColor: '#99cfe0'

  },
  find_button:{
    width: '100%',
    height: '100%'
  },
  find_text: {
    position: 'absolute',
    // width: '100%',
    // height: '100%',
    // textAlignVertical: 'top',
    fontSize: 20,
    alignSelf: 'center',
    backgroundColor: ''
    // alignContent: 'center',
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
  list_wrapper: {
    flex: 1
  },
  list_item: {
    width: '100%',
    height: 50,
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: 'yellow',
    padding: 5,
    borderWidth: 1,

    // backgroundColor: 'black'
  },
  list_item_title: {
    alignSelf: 'center',
  },
  formulas_search: {
    // backgroundColor: 'black',
    height: 50,
    width: '100%',
    flex: 0,
    borderTopWidth: 1,
    // backgroundColor: '#99cfe0'
    // backgroundColor: 'black'
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
    backgroundColor: "#99cfe0",
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
