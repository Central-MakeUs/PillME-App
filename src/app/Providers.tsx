import { ErrorBoundary } from '@suspensive/react';
import { PropsWithChildren, Suspense, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaContext } from '~/shared/bridge/safe-area';
import { KeyboardAvoidingView, Platform } from 'react-native';

export const Provider = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <FontProvider>{children}</FontProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

const FontProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    async function hideSplashAfterDelay() {
      await SplashScreen.preventAutoHideAsync();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    }

    hideSplashAfterDelay();
  }, []);

  return children;
};
