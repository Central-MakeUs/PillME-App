import { bridge, createWebView } from '@webview-bridge/react-native';
import { copyClipboard } from './clipboard/copy-clipboard';
import { openExternalUrl } from './linking/open-external-url';
import { openInAppUrl } from './linking/open-in-app-url';
import { getInsets } from './safe-area';

export const appBridge = bridge({
  copyClipboard, // 웹뷰에서 텍스트 클립보드 복사
  openExternalUrl, // 웹뷰에서 외부 브라우저 열기
  openInAppUrl, // 웹뷰에서 특정 앱 내 링크 처리
  getInsets: async () => getInsets(), // 웹뷰 UI 패딩 조정 - Safe Area
});

export const { WebView, postMessage } = createWebView({
  bridge: appBridge,
  debug: true,
});
