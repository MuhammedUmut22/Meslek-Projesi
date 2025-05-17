// `CONSTANTS` sabitlerini içeri aktarır (action type'lar)
import { CONSTANTS } from "../actions";

// Başlangıç durumu (state), tek bir kart içeren bir obje olarak tanımlanır
const initialState = {
  "card-0": {
    text: "Last Episode", // Kartın metni
    id: `card-0`, // Kartın benzersiz ID'si
    list: "list-0" // Kartın ait olduğu liste
  }
};

// Kartları yöneten reducer
const cardsReducer = (state = initialState, action) => {
  // Gelen action'a göre state güncellenir
  switch (action.type) {
    
    // Yeni bir kart eklemek için kullanılan action
    case CONSTANTS.ADD_CARD: {
      const { text, listID, id } = action.payload;

      // Yeni bir kart oluşturur
      const newCard = {
        text, // Kartın metni
        id: `card-${id}`, // Kartın benzersiz ID'si
        list: listID // Kartın ait olduğu liste
      };

      // Yeni kartı state'e ekler ve geri döner
      return { ...state, [`card-${id}`]: newCard };
    }

    // Kartın metnini düzenlemek için kullanılan action
    case CONSTANTS.EDIT_CARD: {
      const { id, newText } = action.payload;
      const card = state[id]; // Düzenlenecek kartı alır
      card.text = newText; // Kartın metnini günceller
      return { ...state, [`card-${id}`]: card }; // Kartı güncellenmiş olarak döndürür
    }

    // Bir kartı silmek için kullanılan action
    case CONSTANTS.DELETE_CARD: {
      const { id } = action.payload;
      const newState = state;
      delete newState[id]; // Kartı state'ten siler
      return newState; // Yeni state'i döndürür
    }

    // Diğer durumlar için mevcut state'i döndürür
    default:
      return state;
  }
};

// Reducer dışa aktarılır
export default cardsReducer;
