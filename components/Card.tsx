import {View, StyleSheet} from "react-native";

const Card = (props: any) => {
  return (
    <View style={[styles.defaultCard, props.style]}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultCard: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#BBBBBB",
    marginHorizontal: 8,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
});

export default Card;
