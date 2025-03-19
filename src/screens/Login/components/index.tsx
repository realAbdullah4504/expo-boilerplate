import * as AppleAuthentication from "expo-apple-authentication";
import { useState } from "react";
import { Button, Platform, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import { useAuth, useFireStoreDb } from "@/hooks";
import { AuthCredentialsType } from "@/hooks/types";
import { useTheme } from "@/hooks/useTheme";

const Login = () => {
  const theme = useTheme();
  const { addData, fetchData } = useFireStoreDb();
  const { signUpUser, signInUser, googleAuth, appleAuth } = useAuth();
  const [credentials, setCredentials] = useState<AuthCredentialsType>({
    email: "",
    password: "",
  });

  // email: "abc@def.com",
  //   password: "12345678",

  return (
    <SafeAreaView style={{ flex: 1, gap: 10, paddingHorizontal: 10 }}>
      <Text>Hello</Text>
      <Button title="Click" onPress={addData} />
      <Button title="fetch" onPress={fetchData} />
      <TextInput
        style={{ color: theme.colors.text }}
        placeholderTextColor={theme.colors.text}
        placeholder="Enter text"
        value={credentials.email}
        onChangeText={(value) =>
          setCredentials({ ...credentials, email: value })
        }
      />
      <TextInput
        placeholder="Enter text"
        style={{ color: theme.colors.text}}
        placeholderTextColor={theme.colors.text}
        secureTextEntry
        value={credentials.password}
        onChangeText={(value) =>
          setCredentials({ ...credentials, password: value })
        }
      />
      <Button title="signUp" onPress={() => signUpUser(credentials)} />
      <Button title="sign in" onPress={() => signInUser(credentials)} />
      {Platform.OS === "android" && <GoogleSigninButton onPress={googleAuth} />}
      {Platform.OS === "ios" && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          onPress={appleAuth}
        />
      )}
    </SafeAreaView>
  );
};

export default Login;
