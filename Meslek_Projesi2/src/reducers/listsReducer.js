// `CONSTANTS` sabitlerini içeri aktarır (action type'lar)
import { CONSTANTS } from "../actions";

// Başlangıç durumu (state), tek bir liste içeren bir obje olarak tanımlanır
const initialState = {
  "list-0": {
    id: "list-0", // Liste ID'si
    cards: ["card-0"], // Listeye ait kartların ID'leri
    title: "myList", // Liste başlığı
    board: "board-0" // Listeyi barındıran board'ın ID'si
  }
};

// Listeleri yöneten reducer
const listsReducer = (state = initialState, action) => {
  // Gelen action'a göre state güncellenir
  switch (action.type) {
    
    // Yeni bir liste eklemek için kullanılan action
    case CONSTANTS.ADD_LIST: {
      const { title, id } = action.payload;
      const newList = {
        title: title, // Liste başlığını alır
        id: `list-${id}`, // Liste için benzersiz ID oluşturur
        cards: [] // Başlangıçta boş bir kart listesi
      };

      const newState = { ...state, [`list-${id}`]: newList }; // Yeni listeyi state'e ekler

      return newState; // Yeni state döndürülür
    }

    // Yeni bir kart eklemek için kullanılan action
    case CONSTANTS.ADD_CARD: {
      const { listID, id } = action.payload;
      const list = state[listID]; // Kart eklenecek listeyi alır
      list.cards.push(`card-${id}`); // Kartı listeye ekler
      return { ...state, [listID]: list }; // Listeyi güncellenmiş olarak döndürür
    }

    // Drag & Drop işlemi sonrası kartların sırasını değiştirme
    case CONSTANTS.DRAG_HAPPENED: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        type
      } = action.payload;

      // Listeleri yerinden oynatma - Bu işlem listOrderReducer tarafından yönetilmelidir
      if (type === "list") {
        return state;
      }

      // Kart aynı listede taşınıyorsa
      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart]; // Taşınan listeyi alır
        const card = list.cards.splice(droppableIndexStart, 1); // Kartı çıkarır
        list.cards.splice(droppableIndexEnd, 0, ...card); // Kartı yeni pozisyona ekler
        return { ...state, [droppableIdStart]: list }; // Listeyi güncellenmiş olarak döndürür
      }

      // Kart başka bir listeye taşınıyorsa
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state[droppableIdStart]; // Kartın taşındığı ilk listeyi alır
        const card = listStart.cards.splice(droppableIndexStart, 1); // Kartı çıkarır
        const listEnd = state[droppableIdEnd]; // Kartın taşındığı ikinci listeyi alır
        listEnd.cards.splice(droppableIndexEnd, 0, ...card); // Kartı yeni listeye ekler

        return {
          ...state,
          [droppableIdStart]: listStart, // Başlangıç listesini günceller
          [droppableIdEnd]: listEnd // Hedef listeyi günceller
        };
      }
      return state;
    }

    // Bir kartı silmek için kullanılan action
    case CONSTANTS.DELETE_CARD: {
      const { listID, id } = action.payload;
      const list = state[listID]; // Kartın bulunduğu listeyi alır
      const newCards = list.cards.filter(cardID => cardID !== id); // Kartı listeden çıkarır

      return { ...state, [listID]: { ...list, cards: newCards } }; // Listeyi güncellenmiş olarak döndürür
    }

    // Bir liste başlığını düzenlemek için kullanılan action
    case CONSTANTS.EDIT_LIST_TITLE: {
      const { listID, newTitle } = action.payload;
      const list = state[listID]; // Düzenlenecek listeyi alır
      list.title = newTitle; // Liste başlığını günceller
      return { ...state, [listID]: list }; // Listeyi güncellenmiş olarak döndürür
    }

    // Bir listeyi silmek için kullanılan action
    case CONSTANTS.DELETE_LIST: {
      const { listID } = action.payload;
      const newState = state;
      delete newState[listID]; // Listeden silinecek listeyi çıkarır
      return newState; // Yeni state döndürülür
    }

    // Diğer durumlar için mevcut state'i döndürür
    default:
      return state;
  }
};

// Reducer dışa aktarılır
export default listsReducer;
