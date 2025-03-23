import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, KeyboardAvoidingView, Platform } from 'react-native';
import type WebView from 'react-native-webview';
import { Provider } from '~/app/Providers';
import { WebView as PillMeWebView } from '~/shared/bridge';
import { SafeAreaContext } from '~/shared/bridge/safe-area';
import { RefreshProvider } from '~/shared/pull-to-refresh/RefreshProvider';

const BASE_URL = 'https://pillme.kr/';

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [bgColor, setBgColor] = useState('white');

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [canGoBack, webViewRef]);

  // 웹뷰 네비게이션 상태 변경 시 canGoBack 업데이트
  const onNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);

    const url = navState.url;
    if (url === BASE_URL) {
      setBgColor('#E5EBFF');
    } else if (url.includes('home')) {
      setBgColor('#F4F8FF');
    } else {
      setBgColor('#FFFFFF');
    }
  };

  return (
    <Provider>
      <RefreshProvider webViewRef={webViewRef}>
        <SafeAreaContext backgroundColor={bgColor}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
          >
            <StatusBar style="auto" />
            <PillMeWebView
              ref={webViewRef}
              source={{ uri: BASE_URL }}
              style={{ flex: 1 }}
              mixedContentMode={'always'}
              javaScriptEnabled={true}
              allowsBackForwardNavigationGestures={true}
              onNavigationStateChange={onNavigationStateChange}
            />
          </KeyboardAvoidingView>
        </SafeAreaContext>
      </RefreshProvider>
    </Provider>
  );
}
