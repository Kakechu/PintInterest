import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={focused ? 28 : 22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="beer-list"
        options={{
          title: "My Beers",
        }}
      />
      <Tabs.Screen
        name="add-beer"
        options={{
          title: "Add",
        }}
      />
    </Tabs>
  );
}
