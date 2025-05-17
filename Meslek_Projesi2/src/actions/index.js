// `listsActions` dosyasındaki tüm fonksiyonları dışa aktarır
export * from "./listsActions"; 

// `cardsActions` dosyasındaki tüm fonksiyonları dışa aktarır
export * from "./cardsActions"; 

// `boardActions` dosyasındaki tüm fonksiyonları dışa aktarır
export * from "./boardActions";  

// Uygulama genelinde kullanılan sabitler (constants) burada tanımlanır
export const CONSTANTS = {
  
  // Yeni bir kart ekleme işlemi için kullanılan sabit
  ADD_CARD: "ADD_CARD",  
  
  // Yeni bir liste ekleme işlemi için kullanılan sabit
  ADD_LIST: "ADD_LIST",  
  
  // Bir kart sürüklendiğinde gerçekleşen işlem için kullanılan sabit
  DRAG_HAPPENED: "DRAG_HAPPENED",  
  
  // Kart düzenleme işlemi için kullanılan sabit
  EDIT_CARD: "EDIT_CARD",  
  
  // Kart silme işlemi için kullanılan sabit
  DELETE_CARD: "DELETE_CARD",  
  
  // Liste başlığını düzenleme işlemi için kullanılan sabit
  EDIT_LIST_TITLE: "EDIT_LIST_TITLE",  
  
  // Liste silme işlemi için kullanılan sabit
  DELETE_LIST: "DELETE_LIST",  
  
  // Aktif olan board (tahta) belirlenmesi için kullanılan sabit
  SET_ACTIVE_BOARD: "SET_ACTIVE_BOARD",  
  
  // Yeni bir board (tahta) ekleme işlemi için kullanılan sabit
  ADD_BOARD: "ADD_BOARD",  
};
