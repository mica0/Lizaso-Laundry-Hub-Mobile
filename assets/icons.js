import { AntDesign } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
export const icons = {
  home: (props) => <Entypo name="home" size={26} {...props} />,
  explore: (props) => <AntDesign name="search1" size={26} {...props} />,
  payment: (props) => <MaterialIcons name="payments" size={26} {...props} />,
  profile: (props) => <FontAwesome5 name="user-alt" size={24} {...props} />,
};
