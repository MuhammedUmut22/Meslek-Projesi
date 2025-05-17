// Verilen board ID'sine göre, o board'daki tüm listeleri döndüren fonksiyon
export const getListsByBoardId = (boards, boardID) => {
  // Board ID'sine göre ilgili board'ı alır
  const board = boards[boardID];
  // İlgili board'daki listeleri alır
  const lists = board.lists;
  // Listeleri döndürür
  return lists;
};
