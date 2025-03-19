import React, { useEffect } from "react";
import { Text, View } from "react-native";

import { usePlaid } from "@/hooks";

import { styles } from "../styles";

const PlaidSuccess = () => {
  const { data, getBalance } = usePlaid();

  useEffect(() => {
    if (data === null) {
      getBalance();
    }
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.heading}>
        <Text style={styles.titleText}>Balance Response</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.baseText}>
          {data ? JSON.stringify(data) : "loading"}
        </Text>
      </View>
    </View>
  );
};

export default PlaidSuccess;
