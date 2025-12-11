import { Platform, StyleSheet } from "react-native";
import { Colors } from "./theme";

export const createThemedStyles = (isDark: boolean = true) => {
  const theme = isDark ? Colors.dark : Colors.light;

  const basicFlex = {
    flexDirection: "column",
    flexWrap: "nowrap",
  } as const;

  return StyleSheet.create({
    beerIconColor: {
      color: theme.lightForeground,
    },
    beerItem: {
      margin: 16,
      backgroundColor: theme.lightBackground,
      borderRadius: 8,
      elevation: 4,
      shadowColor: theme.mediumBackground,
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      overflow: Platform.OS === "android" ? "hidden" : "visible",
    },
    button: {
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: theme.lightBackground,
      borderWidth: 4,
      borderColor: theme.lightForeground,
      padding: 4,
      marginVertical: 6,
    },
    buttonLabel: {
      color: theme.lightForeground,
    },
    buttonLarge: {
      width: 225,
      fontSize: 16,
    },
    buttonSmall: {
      width: 150,
      fontSize: 14,
    },
    buttonPressed: {
      opacity: 0.72,
    },
    checkBox: {
      color: theme.lightForeground,
      marginRight: 4,
    },
    checkBoxContainer: {
      flexDirection: "row",
      marginVertical: 12,
      paddingRight: 4,
    },
    container: {
      ...basicFlex,
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 25,
      backgroundColor: theme.darkBackground,
    },
    formContainer: {
      ...basicFlex,
      backgroundColor: theme.darkBackground,
      marginTop: 64,
      marginHorizontal: 32,
      padding: 16,
    },
    beerContainer: {
      borderRadius: 8,
      overflow: "hidden",
    },
    bottomSheetContainer: {
      flex: 1,
      padding: 10,
      alignItems: "center",
      gap: 10,
    },
    listContainer: {
      flex: 1,
      padding: 16,
    },
    frontPageSectionContainer: {
      margin: 16,
      backgroundColor: theme.lightBackground,
      borderRadius: 8,
      overflow: Platform.OS === "android" ? "hidden" : "visible",
      padding: 8,
      flexDirection: "row",
    },
    header: {
      backgroundColor: theme.darkBackground,
    },
    iconButton: {
      color: theme.darkBackground,
    },

    image: {
      width: 150,
      height: 150,
      borderRadius: 18,
      marginVertical: 12,
    },
    imageLarge: {
      width: 300,
      height: 300,
      borderRadius: 18,
      marginVertical: 12,
    },
    inputBase: {
      backgroundColor: theme.lightBackground,
      color: theme.lightForeground,
      paddingHorizontal: 6,
      paddingVertical: 10,
      fontSize: 18,
      borderRadius: 6,
      textAlignVertical: "top",
    },
    inputLong: {
      minHeight: 90,
      maxHeight: 200,
    },
    inputContainer: {
      ...basicFlex,
      marginVertical: 6,
    },
    label: {
      color: theme.lightForeground,
      marginBottom: 6,
    },
    ratingContainer: {
      flexDirection: "row",
      marginVertical: 6,
    },
    tabBarActive: {
      color: theme.darkBackground,
    },
    textBase: {
      color: theme.lightForeground,
      fontSize: 16,
      padding: 4,
    },
    textScreenTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 12,
    },
    textTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 8,
    },
    textLabel: { fontSize: 16, marginBottom: 4 },
    textBody: { fontSize: 16 },
    textPressable: {
      fontSize: 14,
      opacity: 0.85,
      textDecorationLine: "underline",
      paddingVertical: 4,
    },
    textLink: {
      textDecorationLine: "underline",
    },
    textPlaceholder: { color: theme.darkBackground },
    title: {
      color: theme.lightForeground,
      fontSize: 20,
      fontWeight: "bold",
    },
  });
};
