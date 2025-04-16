import { ComponentProps, ReactNode } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
  View as DefaultView,
} from "react-native";
import { View, Text, useThemeColor } from "@/components/general/Themed";

type CustomButton = {
  rightIcon?: ReactNode;
  title: string;
  style?: StyleProp<ViewStyle>;
  type?: "primary" | "outline" | "link";
  color?: string;
  ref?: React.Ref<DefaultView>;
} & ComponentProps<typeof Pressable>;

const CustomButton = ({
  rightIcon,
  title,
  style,
  type = "primary",
  color,
  ref,
  ...pressableProps
}: CustomButton) => {
  const tint = color || useThemeColor({}, "tint");

  return (
    <Pressable
      ref={ref}
      {...pressableProps}
      style={[
        styles.button,
        type === "outline" && { borderColor: tint, borderWidth: 2 },
        type === "primary" && { backgroundColor: tint },
        type === "link" && { backgroundColor: "transparent" },
        style,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          type === "outline" && { color: tint },
          type === "link" && { color: tint },
        ]}
      >
        {title}
      </Text>
      {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "100%",
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  rightIconContainer: {
    position: "absolute",
    right: 20,
  },
});

export default CustomButton;
