import { useEffect } from "react";
import { Text, View } from "react-native";
import PlaidLink, { LinkExit } from "react-native-plaid-link-sdk";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePlaid } from "@/hooks";

// eslint-disable-next-line import/namespace
import { useStyles } from "../styles";

const PlaidSetup = () => {
  const { linkToken, createLinkToken, handleSuccess } = usePlaid();
  const styles = useStyles();
  useEffect(() => {
    if (linkToken === null) {
      createLinkToken();
    }
  }, [linkToken]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PlaidLink
        tokenConfig={{
          token: linkToken as string,
          noLoadingState: false,
        }}
        onSuccess={handleSuccess}
        onExit={(response: LinkExit) => {
          console.error(response);
        }}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Link Account</Text>
        </View>
      </PlaidLink>
    </SafeAreaView>
  );
};

export default PlaidSetup;
