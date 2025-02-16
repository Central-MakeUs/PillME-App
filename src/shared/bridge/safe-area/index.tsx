import { type PropsWithChildren } from 'react';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export const getInsets = () => {
  return useSafeAreaInsets();
};

export const SafeAreaContext = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </SafeAreaProvider>
  );
};
