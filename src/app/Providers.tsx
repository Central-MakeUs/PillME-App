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
        <FontProvider>
          <SafeAreaContext>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={{ flex: 1 }}
            >
              {children}
            </KeyboardAvoidingView>
          </SafeAreaContext>
        </FontProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

const FontProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);

  return children;
};
