import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { type PropsWithChildren } from 'react';
import { View } from 'react-native';

export const getInsets = () => {
  return useSafeAreaInsets();
};

export const SafeAreaContext = ({
  children,
  backgroundColor,
}: PropsWithChildren<{ backgroundColor: string }>) => {
  return (
    <SafeAreaProvider>
      <WebViewWithSafeArea backgroundColor={backgroundColor}>
        {children}
      </WebViewWithSafeArea>
    </SafeAreaProvider>
  );
};

const WebViewWithSafeArea = ({
  children,
  backgroundColor,
}: PropsWithChildren<{ backgroundColor: string }>) => {
  const inset = getInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: inset.top,
        backgroundColor: backgroundColor,
      }}
    >
      {children}
    </View>
  );
};
