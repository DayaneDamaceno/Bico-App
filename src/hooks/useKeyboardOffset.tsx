import { useState, useEffect } from "react";
import { Keyboard, Platform } from "react-native";

export const useKeyboardOffset = (tabBarHeight = 80) => {
  const [keyboardOffset, setKeyboardOffset] = useState(16);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS === "ios") {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        (e) => {
          setKeyboardOffset(e.endCoordinates.height - tabBarHeight);
          setKeyboardIsVisible(true);
        }
      );

      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          setKeyboardOffset(16);
          setKeyboardIsVisible(false);
        }
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
    return () => {};
  }, [tabBarHeight]);

  return { keyboardOffset, keyboardIsVisible };
};
