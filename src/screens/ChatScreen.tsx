import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Button,
  Modal,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,

} from "react-native";
import { GiftedChat, InputToolbar, Actions } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/core";
import MathJax from "react-native-mathjax";

// options for MathJax
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


  
 const formluasWindow = () => {
    const formulas = [
  'Pythagorean theorem: a² + b² = c²',
  'Quadratic formula: x = (-b ± sqrt(b² - 4ac)) / 2a',
  'Sum of angles in a triangle: 180°',
  'Area of a circle: A = πr²',
  // add more formulas as needed
];
    return (
    <View style={styles.container}>
      {formulas.map((formula, index) => (
        <View key={index} style={styles.formulaContainer}>
          <Text style={styles.formulaText}>{formula}</Text>
        </View>
      ))}
    </View>
  );
  }
  
handleActionPress =() => {
   return (
    <View
      style={{
        flexDirection: 'row',
        height: 100,
        padding: 20,
      }}>
      <View style={{backgroundColor: 'blue', flex: 0.3}} />
      <View style={{backgroundColor: 'red', flex: 0.5}} />
      <Text>Hello World!</Text>
    </View>
  );
  

  };
  
  const renderActions =  (props) => {
    return (
    <Actions
            {...props}
            options={{
                ['Document']: async (props) => {
                    try {
                        const result = await DocumentPicker.pick({
                            type: [DocumentPicker.types.pdf],
                        });
                       console.log("image file",result)
                    } catch (e) {
                        if (DocumentPicker.isCancel(e)) {
                            console.log("User cancelled!")
                        } else {
                            throw e;
                        }
                    }

                },
                Cancel: (props) => { console.log("Cancel") }
            }}
            onSend={args => console.log(args)}
        />
    );
  };


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
       renderActions={() => renderActions()}
        renderMessageText={({ currentMessage }) => (
          <CustomMessage message={currentMessage} />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
formulas : {
  height: 500,
    width: 500,
    position: "absolute",
    backgroundColor: 'powderblue',
},

container: {
    flex: 1,
    padding: 20,
  },
  formulaContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  formulaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },


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
