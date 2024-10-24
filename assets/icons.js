import { AntDesign } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
export const icons = {
  home: (props) => <Entypo name="home" size={26} {...props} />,
  track: (props) => (
    <MaterialIcons name="local-laundry-service" size={26} {...props} />
  ),
  payment: (props) => <MaterialIcons name="payments" size={26} {...props} />,
  inbox: (props) => <AntDesign name="message1" size={26} {...props} />,
  profile: (props) => <FontAwesome5 name="user-alt" size={24} {...props} />,
  delivery: (props) => (
    <MaterialIcons name="delivery-dining" size={24} {...props} />
  ),
  pickup: (props) => <Entypo name="location" size={24} {...props} />,
};
