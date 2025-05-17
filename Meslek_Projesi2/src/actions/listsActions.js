// `CONSTANTS` sabitlerini içeri aktarır (action type'lar)
import { CONSTANTS } from "../actions";
// `uuid` kütüphanesini içeri aktarır, her yeni liste için benzersiz bir ID oluşturur
import uuid from "uuidv4";

// Yeni bir liste eklemek için kullanılan action creator
export const addList = title => {
  return (dispatch, getState) => {
    // Aktif board ID'sini state'ten alır
    const boardID = getState().activeBoard;
    // Yeni bir UUID oluşturur
    const id = uuid();
    // Yeni listeyi store'a eklemek için dispatch edilir
    dispatch({
      type: CONSTANTS.ADD_LIST, // Action type
      payload: { title, boardID, id } // Yeni liste bilgileri
    });
  };
};

// Bir öğenin sırasını değiştirme (drag and drop) işlemi için kullanılan action creator
export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return (dispatch, getState) => {
    // Aktif board ID'sini state'ten alır
    const boardID = getState().activeBoard;
    // Drag & drop işlemiyle ilgili bilgileri store'a iletmek için dispatch edilir
    dispatch({
      type: CONSTANTS.DRAG_HAPPENED, // Action type
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
        boardID // Aktif board ID'si
      }
    });
  };
};

// Bir listenin başlığını düzenlemek için kullanılan action creator
export const editTitle = (listID, newTitle) => {
  return {
    type: CONSTANTS.EDIT_LIST_TITLE, // Action type
    payload: {
      listID, // Düzenlenecek listenin ID'si
      newTitle // Yeni başlık
    }
  };
};

// Bir listeyi silmek için kullanılan action creator
export const deleteList = listID => {
  return (dispatch, getState) => {
    // Aktif board ID'sini state'ten alır
    const boardID = getState().activeBoard;
    // Silinecek listeyi store'dan kaldırmak için dispatch edilir
    return dispatch({
      type: CONSTANTS.DELETE_LIST, // Action type
      payload: {
        listID, // Silinecek listenin ID'si
        boardID // Aktif board ID'si
      }
    });
  };
};
