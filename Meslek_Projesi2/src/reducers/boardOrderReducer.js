// `CONSTANTS` sabitlerini içeri aktarır (action type'lar)
import { CONSTANTS } from "../actions";
// `uuidv4` kütüphanesini içeri aktarır, benzersiz ID'ler oluşturmak için kullanılır
import uuid from "uuidv4";

// UUID'yi konsola yazdırır (test amaçlı)
console.log(uuid());

// Başlangıç durumu (state), ilk board ID'sini içeren bir array olarak tanımlanır
const initialState = ["board-0"];

// Board'ların sırasını yöneten reducer
const boardOrderReducer = (state = initialState, action) => {
  // Gelen action'a göre state güncellenir
  switch (action.type) {
    // Eğer action türü ADD_BOARD ise, yeni board ID'sini state'e ekler
    case CONSTANTS.ADD_BOARD: {
      return [...state, `board-${action.payload.id}`]; // Yeni board ID'si eklenir
    }
    // Diğer durumlar için mevcut state'i döndürür
    default:
      return state;
  }
};

// Reducer dışa aktarılır
export default boardOrderReducer;
