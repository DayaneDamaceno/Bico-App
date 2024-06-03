import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useHideTabBar = (navigation: any) => {
  const isFocused = useIsFocused();
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: isFocused ? "none" : "flex",
        height: 60 + bottom,
        paddingBottom: bottom + 10,
        paddingTop: 5,
      },
    });
  }, [isFocused, navigation]);
};
