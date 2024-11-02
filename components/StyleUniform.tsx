import { StyleSheet, Dimensions } from "react-native"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styleUniform = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 8,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white"
  },
  contentText:{
    fontSize: 20, 
    fontWeight: "regular",
    color: "white"
  },
  PageHeadText: {
    fontSize: 24,
		color: "white",
		width: windowWidth*.7,
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
    width: windowWidth*0.8,
    height: 200,
    alignSelf: "center",
  },
  subLogoImage:{
    width: windowWidth*0.2,
    height: 50,
    alignSelf: "flex-end",
  }
})

export default styleUniform;