import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export const useHideTabBar = (navigation: any) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: isFocused ? "none" : "flex" },
    });
  }, [isFocused, navigation]);
};
