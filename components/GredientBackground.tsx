import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ViewStyle } from "react-native";

interface GradientBackgroundProps {
  children: ReactNode;
  style?: ViewStyle;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  style,
}) => {
  return (
    <LinearGradient
      colors={["#394db3", "#db2265"]}
      style={[styles.gradient, style, { flex: 1 }]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default GradientBackground;
