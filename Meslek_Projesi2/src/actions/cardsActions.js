import { CONSTANTS } from "../actions"; // Aksiyon türlerini içe aktarır (örneğin: ADD_CARD, EDIT_CARD)
import uuid from "uuidv4"; // Her kart için benzersiz bir ID üretmek için uuid paketi kullanılır

export const addCard = (listID, text) => { // Yeni kart ekleme işlemi için action creator
  const id = uuid(); // Benzersiz bir ID oluştur
  return {
    type: CONSTANTS.ADD_CARD, // Redux'a "ADD_CARD" türünde aksiyon gönder
    payload: { text, listID, id } // Kartın içeriğini, ait olduğu listeyi ve ID'yi gönder
  };
};

export const editCard = (id, listID, newText) => { // Var olan bir kartı düzenlemek için action creator
  return {
    type: CONSTANTS.EDIT_CARD, // Redux'a "EDIT_CARD" türünde aksiyon gönder
    payload: { id, listID, newText } // Düzenlenecek kartın ID'si, listesi ve yeni metni
  };
};

export const deleteCard = (id, listID) => { // Kart silme işlemi için action creator
  return {
    type: CONSTANTS.DELETE_CARD, // Redux'a "DELETE_CARD" türünde aksiyon gönder
    payload: { id, listID } // Silinecek kartın ID'si ve ait olduğu liste
  };
};
