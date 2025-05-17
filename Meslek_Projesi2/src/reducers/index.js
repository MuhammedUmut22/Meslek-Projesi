// Redux'ta birden fazla reducer'ı birleştirmek için combineReducers fonksiyonu kullanılır
import { combineReducers } from "redux";

// Farklı reducer'lar import edilir
import listsReducer from "./listsReducer";
import cardsReducer from "./cardsReducer";
import boardsReducer from "./boardsReducer";
import boardOrderReducer from "./boardOrderReducer";
import activeBoardReducer from "./activeBoardReducer";

// Farklı reducer'ları tek bir root reducer olarak birleştirir
export default combineReducers({
  lists: listsReducer, // Lists ile ilgili işlemleri yöneten reducer
  cards: cardsReducer, // Cards ile ilgili işlemleri yöneten reducer
  boards: boardsReducer, // Boards ile ilgili işlemleri yöneten reducer
  boardOrder: boardOrderReducer, // Board sırasını yöneten reducer
  activeBoard: activeBoardReducer // Aktif board'ı yöneten reducer
});
