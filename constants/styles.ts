import { Platform, StyleSheet } from "react-native";
import { Colors } from "./theme";

export const createShadow = (elevation: number = 4, color: string = "#000") => {
  if (Platform.OS === "android") {
    return { elevation };
  } else {
    return {
      shadowColor: color,
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: 0.25,
      shadowRadius: elevation,
    };
  }
};

export const createThemedStyles = (isDark: boolean = true) => {
  const theme = isDark ? Colors.dark : Colors.light;

  const basicFlex = {
    flexDirection: "column",
    flexWrap: "nowrap",
  } as const;

  // Containers
  const containers = StyleSheet.create({
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
    listContainer: {
      flex: 1,
      padding: 16,
    },
    bottomSheetContainer: {
      flex: 1,
      padding: 10,
      alignItems: "center",
      gap: 10,
    },
  });

  // Card styles
  const cards = StyleSheet.create({
    beerItem: {
      margin: 16,
      backgroundColor: theme.lightBackground,
      borderRadius: 8,
      ...createShadow(4, theme.mediumBackground),
      overflow: Platform.OS === "android" ? "hidden" : "visible",
    },
    frontPageSectionContainer: {
      margin: 16,
      backgroundColor: theme.lightBackground,
      borderRadius: 8,
      ...createShadow(3, theme.mediumBackground),
      overflow: Platform.OS === "android" ? "hidden" : "visible",
      padding: 8,
      flexDirection: "row",
    },
  });

  // Button styles
  const buttons = StyleSheet.create({
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
    secondaryButton: {
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: theme.lightForeground,
      borderWidth: 4,
      borderColor: theme.lightBackground,
      padding: 4,
      marginVertical: 6,
    },
    buttonLabel: {
      color: theme.lightForeground,
    },
    buttonLabelSecondary: {
      color: theme.lightBackground,
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

    iconButton: {
      margin: 8,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      color: theme.lightForeground,
    },
  });

  // Text styles
  const text = StyleSheet.create({
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
  });

  // Input styles
  const inputs = StyleSheet.create({
    inputBase: {
      backgroundColor: theme.lightBackground,
      color: theme.lightForeground,
      paddingHorizontal: 6,
      paddingVertical: 10,
      fontSize: 18,
      borderRadius: 6,
      textAlignVertical: "top",
      flex: 1,
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
    inputWrapper: {
      position: "relative",
    },
    inputWithIcon: {
      paddingRight: 44,
    },
    iconOverlay: {
      position: "absolute",
      right: 8,
      top: 0,
      bottom: 0,
      justifyContent: "center",
    },
  });

  // Image/media styles
  const images = StyleSheet.create({
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
    imageWrapper: {
      borderRadius: 18,
      ...createShadow(5, theme.mediumBackground),
      overflow: "hidden",
    },
  });

  // Other UI styles
  const ui = StyleSheet.create({
    checkBox: {
      color: theme.lightForeground,
      marginRight: 4,
    },
    checkBoxContainer: {
      flexDirection: "row",
      marginVertical: 12,
      paddingRight: 4,
    },
    rowContainer: {
      flexDirection: "row",
      marginVertical: 6,
    },
    beerIconColor: {
      color: theme.lightForeground,
    },
    tabBarActive: {
      color: theme.darkBackground,
    },
    header: {
      backgroundColor: theme.darkBackground,
    },
  });

  return {
    ...containers,
    ...cards,
    ...buttons,
    ...text,
    ...inputs,
    ...images,
    ...ui,
  };
};
