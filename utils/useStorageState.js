import { useEffect, useCallback, useReducer, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

function useAsyncState(initialValue = [true, null]) {
  return useReducer((state, action = null) => [false, action], initialValue);
}

export async function setStorageItemAsync(key, value) {
  if (value == null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

export function useStorageState(key) {
  const [state, setState] = useAsyncState();

  useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => {
      setState(value);
    });
  }, [key]);

  const setValue = useCallback(
    (value) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
