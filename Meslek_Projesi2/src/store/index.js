// Redux store oluşturulurken kullanılan gerekli kütüphaneleri import ederiz.
import { createStore, applyMiddleware } from "redux"; // `createStore` ile store oluşturulur, `applyMiddleware` ise middleware ekler
import rootReducer from "../reducers"; // Tüm reducer'ları birleştiren rootReducer
import thunk from "redux-thunk"; // Async işlemler için `redux-thunk` middleware'i

// Redux Persist, store'daki verilerin tarayıcıda saklanmasını sağlar
import { persistStore, persistReducer } from "redux-persist"; // Redux Persist için gerekli fonksiyonlar
import storage from "redux-persist/lib/storage"; // Tarayıcıda veriyi saklamak için `localStorage` ya da `sessionStorage` kullanılır

// Redux Persist için gerekli yapılandırma
const persistConfig = {
  key: "root", // `key`, verinin saklanacağı anahtar adıdır.
  storage // Veriyi `localStorage`'da saklamak için `storage` kullanılır.
};

// `persistedReducer`, reducer'ımızı persist ile sarar. Bu, state'in tarayıcıda saklanmasını sağlar.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux store'unu ve persist işlemini başlatan fonksiyon
export default () => {
  // Store, reducer'ı ve middleware'i (thunk) kullanarak oluşturulur.
  let store = createStore(persistedReducer, applyMiddleware(thunk));

  // `persistStore`, store'u saklamak için gereken işlemleri başlatır.
  let persistor = persistStore(store);

  // Store ve persistor nesnelerini döndürür.
  return { store, persistor };
};
