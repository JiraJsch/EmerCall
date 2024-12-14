import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ViewStyle } from "react-native";

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
      style={[style, { flex: 1 }]}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
