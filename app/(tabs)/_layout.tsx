import { Tabs } from "expo-router";

//import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  //const { styles } = useTheme();
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={focused ? 28 : 22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-beer"
        options={{
          title: "Add",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "beer" : "beer-outline"}
              size={focused ? 28 : 22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-beers"
        options={{
          title: "My Beers",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              size={focused ? 28 : 22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="beer-view/[id]"
        options={{
          href: null,
          title: "Beer Details",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
