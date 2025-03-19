import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useAuth } from "@/hooks";

export default function AppLayout() {
  const { isLogin } = useAuth();
  if (!isLogin) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerRight: () => (
          <Link href="/settings" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="gear"
                  size={25}
                  color="blue"
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(plaid)"
        options={{
          title: "Plaid Link Setup",
          tabBarIcon: ({ color }) => <TabBarIcon name="bank" color={color} />,
        }}
      />
    </Tabs>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
