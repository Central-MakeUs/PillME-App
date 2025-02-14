import { type PropsWithChildren } from 'react';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export const getInsets = () => {
  return useSafeAreaInsets();
};

export const SafeAreaContext = ({ children }: PropsWithChildren) => {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
};
