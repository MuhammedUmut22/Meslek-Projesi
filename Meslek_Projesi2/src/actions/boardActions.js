// "../actions" dosyasından sabitler (action türleri) içeren CONSTANTS nesnesi içe aktarılıyor
import { CONSTANTS } from "../actions";

// uuidv4 paketinden benzersiz ID oluşturmak için fonksiyon içe aktarılıyor
import uuid from "uuidv4";

// Bu fonksiyon, aktif tahtayı (board) belirlemek için bir aksiyon döner
export const setActiveBoard = id => {
  return {
    // Action türü (hangi işlem yapılacağı)
    type: CONSTANTS.SET_ACTIVE_BOARD,
    // Payload: aktif olması gereken board'un ID'si
    payload: id
  };
};

// Bu fonksiyon, yeni bir board (tahta/pano) eklemek için aksiyon döner
export const addBoard = title => {
  // Her board'a özel benzersiz bir ID oluşturuluyor
  const id = uuid();
  return {
    // Action türü: board ekleme işlemi
    type: CONSTANTS.ADD_BOARD,
    // Payload: board'un başlığı ve oluşturulan ID
    payload: { title, id }
  };
};
