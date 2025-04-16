import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  useColorScheme,
} from "react-native";

import Colors from "@/constants/Colors";
import { ComponentProps } from "react";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

// these Themed components can accept custom light/dark color and if not given,
// they can use their own dark/light color from Colors

export type TextProps = ThemeProps & ComponentProps<typeof DefaultText>;
export type ViewProps = ThemeProps & DefaultView["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];

// it returns a color, for different components, based on provided dark/light color & theme.
// if not provided, it returns color from Colors
export function useThemeColor(
  userDefinedColor: { light?: string; dark?: string },
  themeColorKey: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? "light";
  const userColor = userDefinedColor[theme];

  if (userColor) {
    return userColor;
  } else {
    return Colors[theme][themeColorKey];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "textInputBackground",
  );
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultTextInput
      style={[{ backgroundColor, color }, style]}
      {...otherProps}
    />
  );
}
