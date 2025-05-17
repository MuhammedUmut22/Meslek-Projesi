import React from "react"; // React kütüphanesini import ediyoruz
import ReactDOM from "react-dom"; // React bileşenlerini DOM'a render etmek için
import { Provider } from "react-redux"; // Redux store'u React uygulamasına bağlamak için Provider
import Store from "./store"; // Redux store ve persistor objesini içeren dosya
import App from "./components/App"; // Ana React bileşeni
import * as serviceWorker from "./serviceWorker"; // Service worker işlemleri için
import "./index.css"; // Global CSS dosyası
import { createGlobalStyle } from "styled-components"; // Styled-components ile global stil yaratmak için
import $ from "jquery"; // jQuery kütüphanesi
import { PersistGate } from "redux-persist/integration/react"; // Redux persist için gate bileşeni

const { persistor, store } = Store(); // Store fonksiyonundan persistor ve store objelerini alıyoruz

// Global stil tanımı, tüm html elementine uygulanacak
const GlobalStyle = createGlobalStyle`
  html {
    background-color: orange; // Arka plan rengini turuncu yapar
    box-sizing: border-box; // Box modelini border-box olarak ayarlar
    transition: all 0.5s ease-in; // Stil değişikliklerinde yumuşak geçiş sağlar
  }
`;

// React uygulamasını DOM'daki 'root' elementine render ediyoruz
ReactDOM.render(
  <Provider store={store}> {/* Redux store'u tüm uygulamaya sağlıyor */}
    <PersistGate loading={null} persistor={persistor}> {/* Persist edilen store verisi yüklenene kadar bekletiyor */}
      <GlobalStyle /> {/* Global stilleri uyguluyor */}
      <App /> {/* Ana uygulama bileşeni */}
    </PersistGate>
  </Provider>,
  document.getElementById("root") // root id'li DOM elementine render et
);

// jQuery ile DOM'dan herhangi bir node kaldırıldığında konsola node ismini yazdırıyor
$(document).bind("DOMNodeRemoved", function(e) {
  console.log("Removed: " + e.target.nodeName);
});

// Service worker'ı devre dışı bırakıyor (offline çalışma ve hızlı yükleme için register() yapılabilir)
// unregister() kullanmak, service worker'ın kayıtlı olmadığı anlamına gelir
serviceWorker.unregister();
