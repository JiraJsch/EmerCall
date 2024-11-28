import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import GradientBackground from "@/components/GredientBackground";
import Card from "@/components/Card";
import { router } from "expo-router";
import styleUniform from "@/components/StyleUniform";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const goToCall: Function = (phoneNumber: string) => {
  return Linking.openURL(`tel:${phoneNumber}`);
};

const DepartmentLine = (departmentName: string, hotLine: string) => {
  const handleConfirmCall = (hotLine: String) => {
    Alert.alert("Are you sure?", "You're calling " + hotLine, [
      {
        text: "Yes",
        onPress: () => goToCall(hotLine)
      },
      {
        text: "No",
        onPress: () => {return null}
      }
    ]);
  };

  return (
    <Card style={{ backgroundColor: "#aaaaaa", width: 200 }}>
      <Text numberOfLines={2} style={{ lineHeight: 15, height: 30 }}>
        {departmentName}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text numberOfLines={1} style={[styles.numberText, {flex: 1 - (200 - 24)}]}>{hotLine}</Text>
        <TouchableOpacity
          onPress={() => {
            return(
              handleConfirmCall(hotLine)
            )
          }}
        >
          <Feather name="phone" size={24} color={"#222"} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const HomePage = () => {
  const errorAlert = (errorMsg: string) => {
    Alert.alert("Error", errorMsg, [
      {
        text: "OK",
        onPress: () => {return null},
      },
    ]);
  };

  const handleToMapSearchPage = async () => {
    const { status: Permissionstatus } = await Location.requestForegroundPermissionsAsync();
    if (Permissionstatus !== "granted") {
      return errorAlert("Permission to access location was denied");
    }
    const locationStatus = await Location.getProviderStatusAsync();
    if (!locationStatus.locationServicesEnabled) {
      return errorAlert("Location services are disabled. Please enable GPS.");
    }
    router.navigate("/map-search")
  }

  return (
    <GradientBackground>
      <View style={{
        flex: 1 - ( 87 / windowHeight ),
        marginHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text numberOfLines={1} style={styleUniform.PageHeadText}>
            {"สวัสดีครับ"}
          </Text>
          <Image
            source={require("@/assets/images/logo-wording.png")}
            style={styleUniform.subLogoImage}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity onPress={handleToMapSearchPage}>
          <Card style={{ width: windowWidth - 48 }}>
            <Text style={{ textAlign: "center" }}>
              🚨📍ค้นหาสถานที่ฉุกเฉินใกล้เคียง📍🚨
            </Text>
          </Card>
        </TouchableOpacity>
        <Text style={styleUniform.subHeaderText}>
          เบอร์โทรของหน่วยงานภาครัฐ
        </Text>
        <ScrollView showsVerticalScrollIndicator={true}>
          <Card style={styleUniform.card1}>
            <Text>แจ้งเหตุด่วนเหตุร้าย</Text>
            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
              {DepartmentLine("เหตุด่วน - เหตุร้าย", "191")}
              {DepartmentLine("เหตุอัคคีภัย - สัตว์เข้าบ้าน", "199")}
              {DepartmentLine("ศุนย์ความปลอดภัย กรมทางหลวงชนบท", "1146")}
              {DepartmentLine("ตำรวจท่องเที่ยว", "1155")}
              {DepartmentLine("ศูนย์ปราบปรามการโจรกรรมรถยนต์/จักรยานยนต์", "1192")}
              {DepartmentLine("กองปราบปราม", "1195")}
              {DepartmentLine("อุบัติเหตุทางน้ำ กองบัญชาการตำรวจ", "1196")}
              {DepartmentLine("เหตุด่วนทางน้ำ กรมเจ้าท่า", "1199")}
              {DepartmentLine("(กอ.รมน.) กองอำนวยการรักษาความมั่นคงภายในราชอาณาจักร", "022412051")}
              {DepartmentLine("กรมควบคุมมลพิษ", "1650")}
              {DepartmentLine("ศุนย์สนับสนุนการปฎิบัติการฉุกเฉินสารเคมี", "022982387")}
              {DepartmentLine("กรมป้องกันและบรรเทาสาธารณภัย", "1784")}
              {DepartmentLine("ศูนย์พิทักษ์เด็ก เยาวชนและสตรี", "1677")}
            </ScrollView>
          </Card>
          <Card style={styleUniform.card1}>
            <Text>เหตุฉุกเฉิน - กู้ชีพ - กู้ภัย</Text>
            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
              {DepartmentLine("ศูนย์ประชาบดี แจ้งคนหาย", "1300")}
              {DepartmentLine("ศูนย์ปลอดภัยคมนาคม", "1356")}
              {DepartmentLine("หน่วยแพทย์กู้ชีวิต วชิรพยาบาล", "1554")}
              {DepartmentLine("ศูนย์ร้องทุกข์กรุงเทพมหานคร", "1555")}
              {DepartmentLine("ศูนย์เอราวัณ สำนักการแพทย์ กรุงเทพมหานคร","1646")}
              {DepartmentLine("สถาบันการแพทย์ฉุกเฉินแห่งชาติ", "1669")}
              {DepartmentLine("ศูนย์เตือนภัยพิบัติแห่งชาติ", "192")}
            </ScrollView>
          </Card>
          <Card style={styleUniform.card1}>
            <Text>บริการทางการแพทย์ (ไม่ฉุกเฉิน)</Text>
            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
              {DepartmentLine("สายด่วนยาเสพติด กรมการแพทย์", "1165")}
              {DepartmentLine("สำนักงานหลักประกันสุขภาพแห่งชาติ", "1330")}
              {DepartmentLine("ศูนย์พิษวิทยา ร.พ.รามาธิบดี", "1367")}
              {DepartmentLine("(อย.) สำนักงานคณะกรรมการอาหารและยา", "1556")}
              {DepartmentLine("สำนักงานอาสากาชาด สภากาชาดไทย", "022510385")}
              {DepartmentLine("ศูนย์รับบริจาคอวัยวะ สภากาชาดไทย", "1666")}
              {DepartmentLine("กรมสุขภาพจิต", "1667")}
            </ScrollView>
          </Card>
          <Card style={styleUniform.card1}>
            <Text>สาธารณูปโภค</Text>
            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
              {DepartmentLine("การประปานครหลวง", "1125")}
              {DepartmentLine("การไฟฟ้านครหลวง", "1130")}
              {DepartmentLine("การประปาส่วนภูมิภาค", "1662")}
              {DepartmentLine("การไฟฟ้าส่วนภูมิภาค", "1129")}
              {DepartmentLine("ชลประทานบริการประชาชน", "1460")}
            </ScrollView>
          </Card>
          <Card style={styleUniform.card1}>
            <Text>หน่วยงานราชการ</Text>
            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
              {DepartmentLine("ศูนย์บริการภาครัฐเพื่อประชาชน", "1111")}
              {DepartmentLine("วุฒิสภา", "1102")}
              {DepartmentLine("กรมศุลกากร", "1164")}
              {DepartmentLine("(สคบ.) สำนักงานคณะกรรมการคุ้มครองผู้บริโภค","1166")}
              {DepartmentLine("สายด่วนประกันภัย", "1186")}
              {DepartmentLine("กรมอุทยานแห่งชาติ สัตว์ป่า และพันธุ์พืช", "1362")}
              {DepartmentLine("สายด่วนศาลปกครอง", "1355")}
              {DepartmentLine("สถาบันพัฒนาข้าราชการพลเรือน", "025471806")}
              {DepartmentLine("กรมการค้าต่างประเทศ", "1385")}
              {DepartmentLine("สำนักงานประกันสังคม", "1506")}
              {DepartmentLine("กรมการปกครอง สำนักทะเบียนราษฎร์", "1548")}
              {DepartmentLine("ศูนย์ดำรงธรรม กระทรวงมหาดไทย", "1567")}
              {DepartmentLine("กระทรวงศึกษาธิการ", "1579")}
              {DepartmentLine("กระทรวงพลังงาน", "021293344")}
              {DepartmentLine("ศูนย์บริการร่วม กระทรวงพลังงาน", "021407000")}
              {DepartmentLine("(ททท.) การท่องเที่ยวแห่งประเทศไทย", "1672")}
              {DepartmentLine("ผู้ตรวจการแผ่นดินรัฐสภา", "1676")}
              {DepartmentLine("กรมการจัดหางาน", "1694")}
              {DepartmentLine("ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร กระทรวงการคลัง", "1689")}
              {DepartmentLine("กรมสรรพสามิต", "1713")}
              {DepartmentLine("กระทรวงวัฒนธรรม", "1765")}
              {DepartmentLine("ศูนย์บริการข่าวอากาศ กรมอุตุนิยมวิทยา", "1182")}
              {DepartmentLine("สำนักงานคณะกรรมการการเลือกตั้ง", "1171")}
            </ScrollView>
          </Card>
          <Card style={styleUniform.card1}>
            <Text>ผู้ให้บริการโทรคมนาคม</Text>
            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
              {DepartmentLine("TOT", "1100")}
              {DepartmentLine("AIS", "1175")}
              {DepartmentLine("TRUE", "1331")}
              {DepartmentLine("DTAC", "1678")}
            </ScrollView>
          </Card>
          <Card style={styleUniform.card1}>
            <Text>สถาบันการเงิน</Text>
            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
              {DepartmentLine("ธนาคารออมสิน", "1115")}
              {DepartmentLine("ธนาคารพัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย","1357")}
              {DepartmentLine("ธนาคารกรุงเทพ", "1333")}
              {DepartmentLine("ธนาคารกรุงไทย", "1551")}
              {DepartmentLine("ธนาคารกรุงศรีอยุธยา", "1572")}
              {DepartmentLine("ธนาคารซิตี้แบงก์", "1588")}
              {DepartmentLine("ธนาคารสแตนดาร์ด ชาร์เตอร์ด (ไทย)", "1595")}
              {DepartmentLine("ธนาคารกสิกรไทย", "028888888")}
              {DepartmentLine("ธนาคารซีไอเอ็มบี ไทย", "026267777")}
              {DepartmentLine("ธนาคารไทยพาณิชย์", "027777777")}
              {DepartmentLine("ธนาคารอาคารสงเคราะห์", "026459000")}
              {DepartmentLine("ธนาคารยูโอบี", "022851555")}
            </ScrollView>
          </Card>
          <Card style={styleUniform.card1}>
            <Text>สอบถามข้อมูลการขนส่ง</Text>
            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
              {DepartmentLine("ตำรวจทางหลวง", "1193")}
              {DepartmentLine("ศูนย์ควบคุมและสั่งการจราจร", "1197")}
              {DepartmentLine("(ขสมก.) องค์การขนส่งมวลชนกรุงเทพ", "1348")}
              {DepartmentLine("(บขส.) บริษัท ขนส่ง จำกัด", "1490")}
              {DepartmentLine("การทางพิเศษแห่งประเทศไทย", "1543")}
              {DepartmentLine("ศูนย์บริการประชาชนสายด่วนกรมทางหลวง", "1586")}
              {DepartmentLine("การรถไฟแห่งประเทศไทย", "1690")}
              {DepartmentLine("การรถไฟฟ้าขนส่งมวลชนแห่งประเทศไทย", "026245200")}
              {DepartmentLine("บริษัท โอเรียนท์ ไทย แอร์ไลน์ จำกัด", "1126")}
              {DepartmentLine("บริษัท สายการบินนกแอร์ จำกัด", "1318")}
              {DepartmentLine("ศูนย์ข้อมูลข่าวสาร การบินไทย", "025453321")}
              {DepartmentLine("บริษัท บางกอก แอร์เวย์ จำกัด", "1771")}
              {DepartmentLine("TAXI-RADIO", "1681")}
              {DepartmentLine("แอร์พอร์ต ลิงค์", "021315700*1301#")}
              {DepartmentLine("ศูนย์ประชาสัมพันธ์ ท่าอากาศยานสุวรรณภูมิ", "021321888")}
              {DepartmentLine("ศูนย์ปลอดภัยคมนาคม การท่าเรือแห่งประเทศไทย", "022693191" /* ถึง 9 */)}
              {DepartmentLine("แผนกสื่อสาร การท่าเรือแห่งประเทศไทย", "022693481" /* ถึง 4 */)}
              {DepartmentLine("กรมการบินพลเรือน", "022860506")}
            </ScrollView>
          </Card>
          <Card style={styleUniform.card1}>
            <Text>{"อื่น ๆ"}</Text>
            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
              {DepartmentLine("สอบถามเวลามาตรฐานประเทศไทย สถาบันมาตรวิทยาแห่งชาติ", "025775100")}
              {DepartmentLine("สถานีวิทยุ จส.100", "*1808")}
              {DepartmentLine("สถานีวิทยุ สวพ.91", "1644")}
              {DepartmentLine("สถานีวิทยุร่วมด้วยช่วยกัน", "1677")}
              {DepartmentLine("สมาคมเสริมสร้างครอบครัว", "1761")}
              {DepartmentLine("ศูนย์รับแจ้งการเงินนอกระบบ", "1359")}
            </ScrollView>
          </Card>
        </ScrollView>
      </View>
    </GradientBackground>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  numberText: {
    fontSize: 24,
  },
  map: {
    width: "100%",
    height: windowHeight / 2,
  },
});
