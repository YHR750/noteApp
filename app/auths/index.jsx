import { useState } from "react";
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert} from "react-native"
import { useRouter } from "expo-router";

const AuthScreen = () => {
    const router = useRouter();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    return(
        <View style = {styles.container}>
            <Text style = {styles.header}>"login"</Text>
            <TextInput
                style = {styles.input}
                placeholder="email"
                placeholderTextColor= '#AAA'
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                keyboardType='email-address'
            />
            <TextInput style = {styles.input}
                placeholder="password"
                placeholderTextColor='#AAA'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType='none'
            />
            <TouchableOpacity style = {styles.button}>
                <Text style = {styles.buttonText}>"Login"</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style = {styles.switchText}>"Don't Have An Account? Sign-Up"</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {

    },
    header: {

    },
    input: {

    },
    button:{

    },
    buttonText:{

    },
    switchText:{

    },
});
export default AuthScreen();