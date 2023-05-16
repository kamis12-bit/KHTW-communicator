import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/core'


const LaTeXScreen = () => {
        const navigation = useNavigation();

        return (<div>Hi
                < Pressable onPress={() => { navigation.navigate("Chat", { latex: "hi" }) }} > Back to chat</Pressable >
        </div>)
}
export default LaTeXScreen;
