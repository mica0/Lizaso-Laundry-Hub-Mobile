import { useNavigation } from "expo-router";

export const useHandleGoToMessage = () => {
  const navigation = useNavigation();

  return (id, name) => {
    navigation.navigate("message/chat", {
      user_id: id,
      name: name,
    });
  };
};
