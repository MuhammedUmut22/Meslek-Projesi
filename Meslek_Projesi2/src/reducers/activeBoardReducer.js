// `CONSTANTS` sabitlerini içeri aktarır (action type'lar)
import { CONSTANTS } from "../actions";

// Başlangıç durumu (state) null olarak tanımlanır
const initialState = null;

// Aktif board'ı yöneten reducer
const activeBoardReducer = (state = initialState, action) => {
  // Gelen action'a göre state güncellenir
  switch (action.type) {
    // Eğer action türü SET_ACTIVE_BOARD ise, aktif board'ı payload ile güncelleriz
    case CONSTANTS.SET_ACTIVE_BOARD: {
      return action.payload; // Aktif board ID'sini payload'dan alır
    }

    // Diğer durumlar için mevcut state'i döndürür
    default:
      return state;
  }
};

// Reducer dışa aktarılır
export default activeBoardReducer;
