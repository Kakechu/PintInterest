import { StyleSheet } from "react-native";

export const createThemedStyles = () => {
  const basicFlex = {
    flexDirection: "column",
    flexWrap: "nowrap",
  } as const;

  return StyleSheet.create({
    container: {
      ...basicFlex,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
