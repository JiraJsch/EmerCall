import { StyleSheet, Dimensions, ViewStyle } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styleUniform = StyleSheet.create({
  container: {
    padding: 32,
    gap: 8,
  },
  headerText: {
    alignSelf: "center",
    lineHeight: 40,
    height: 42,
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  subHeaderText: {
    lineHeight: 40,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  contentText: {
    height: 28,
    fontSize: 20,
    fontWeight: "regular",
    color: "white",
  },
  PageHeadText: {
    fontSize: 24,
    color: "white",
    width: windowWidth * 0.7,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 3,
    backgroundColor: "#222222",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  mainImage: {
    width: windowWidth * 0.8,
    height: 200,
    alignSelf: "center",
  },
  subLogoImage: {
    width: windowWidth * 0.2,
    height: 50,
    alignSelf: "flex-end",
  },
  textInput: {
    fontSize: 16,
    backgroundColor: "#eeeeee",
    padding: 8,
    borderColor: "#000000",
    borderRadius: 32,
    borderWidth: 2,
    height: 48,
    marginBottom: 8,
  },
  card1: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#dddddd",
    marginHorizontal: 8,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  numberText: {
    fontSize: 24,
  },
  map: {
    width: "100%",
    height: windowHeight / 2,
  },
});

export default styleUniform;