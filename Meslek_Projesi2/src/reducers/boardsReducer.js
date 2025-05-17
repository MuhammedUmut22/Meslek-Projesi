// `CONSTANTS` sabitlerini içeri aktarır (action type'lar)
import { CONSTANTS } from "../actions";

// Başlangıç durumu (state), tek bir board içeren bir obje olarak tanımlanır
const initialState = {
  "board-0": {
    id: "board-0",
    lists: ["list-0"], // board içinde bir liste var
    title: "myboard" // board'ın başlığı
  }
};

// Board'ları yöneten reducer
const boardsReducer = (state = initialState, action) => {
  // Gelen action'a göre state güncellenir
  switch (action.type) {
    
    // Yeni bir liste eklemek için kullanılan action
    case CONSTANTS.ADD_LIST: {
      const { boardID, id } = action.payload;
      const board = state[boardID]; // board'ı state'ten alır
      const newListID = `list-${id}`; // Yeni liste ID'sini oluşturur
      const newLists = [...board.lists, newListID]; // Yeni listeyi mevcut listelere ekler
      board.lists = newLists; // Board'ın listesini günceller
      return { ...state, [boardID]: board }; // Board güncellenmiş olarak döndürülür
    }

    // Drag & Drop işlemi sonrası liste sıralama
    case CONSTANTS.DRAG_HAPPENED: {
      const { boardID } = action.payload;
      const board = state[boardID]; // Board'ı alır
      const lists = board.lists; // Board içindeki listeleri alır
      const { droppableIndexEnd, droppableIndexStart, type } = action.payload;

      // Eğer "list" tipi bir işlemse (yani liste sıralanıyorsa)
      if (type === "list") {
        // Sırasını değiştirecek listeyi çıkarır ve yeni pozisyona ekler
        const pulledOutList = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...pulledOutList);
        board.lists = lists; // Board içindeki listeleri günceller

        return { ...state, [boardID]: board }; // Board güncellenmiş olarak döndürülür
      }
      return state; // Diğer durumlar için state'i değiştirme
    }

    // Bir listeyi silmek için kullanılan action
    case CONSTANTS.DELETE_LIST: {
      const { listID, boardID } = action.payload;
      const board = state[boardID]; // Board'ı alır
      const lists = board.lists; // Board içindeki listeleri alır
      const newLists = lists.filter(id => id !== listID); // Silinecek listeyi çıkarır
      board.lists = newLists; // Board içindeki listeleri günceller
      return { ...state, [boardID]: board }; // Board güncellenmiş olarak döndürülür
    }

    // Yeni bir board eklemek için kullanılan action
    case CONSTANTS.ADD_BOARD: {
      const { title, id } = action.payload;
      const newID = `board-${id}`; // Yeni board ID'sini oluşturur
      const newBoard = {
        id: newID,
        title,
        lists: [] // Yeni board için başta hiç liste yok
      };

      return { ...state, [newID]: newBoard }; // Yeni board eklenmiş olarak döndürülür
    }

    // Diğer durumlar için mevcut state'i döndürür
    default:
      return state;
  }
};

// Reducer dışa aktarılır
export default boardsReducer;
