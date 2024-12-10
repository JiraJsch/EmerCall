import { ReactNode, useContext } from "react";
import { View, StyleSheet, StyleProp } from "react-native";
import styleUniform, { themeContext } from "./StyleUniform";

const Card = (props: {
  isPrimary?: boolean;
  style?: StyleProp<any>;
  children: ReactNode;
}) => {
  const { isPrimary = true, style, children } = props;
  const theme = useContext(themeContext);
  return (
    <View
      style={[
        styleUniform.card,
        {
          backgroundColor: isPrimary
            ? theme.cardColorPrimary
            : theme.cardColorSecondary,
        },
        style,
      ]}
    >
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
});

export default Card;
