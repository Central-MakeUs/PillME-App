import { useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import type WebView from 'react-native-webview';
import { Provider } from '~/app/Providers';
import { WebView as PillMeWebView } from '~/shared/bridge';

const BASE_URL = __DEV__
  ? process.env.EXPO_PUBLIC_DEV_WEBVIEW_URL ?? ''
  : 'https://d2jk5p6q83gaab.cloudfront.net/';

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

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
  };

  return (
    <Provider>
      <PillMeWebView
        ref={webViewRef}
        source={{ uri: 'https://d2jk5p6q83gaab.cloudfront.net/' }}
        style={{ flex: 1 }}
        mixedContentMode={'always'}
        javaScriptEnabled={true}
        allowsBackForwardNavigationGestures={true}
        onNavigationStateChange={onNavigationStateChange}
      />
    </Provider>
  );
}
