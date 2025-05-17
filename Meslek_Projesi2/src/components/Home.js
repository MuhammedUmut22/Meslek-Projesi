import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard } from "../actions";
import BoardThumbnail from "./BoardThumbnail";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #0f2027, #2c5364); /* yeni renk gradyanı */
  color: white;
  font-family: "Poppins", sans-serif;
`;

const Thumbnails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 3rem;
`;

const EmptyMessage = styled.p`
  color: #ccc;
  font-size: 18px;
  margin-bottom: 2rem;
`;

const CreateBoardCard = styled.div`
  background: rgba(255, 255, 255, 0.1); /* hafif şeffaf arkaplan */
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 500px;
  text-align: center;
  transition: all 0.3s ease;
`;

const CreateTitle = styled.h3`
  font-size: 32px;
  color: white; /* başlık rengi beyaz */
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const CreateInput = styled.input`
  width: 100%;
  height: 56px;
  font-size: 18px;
  padding: 0 20px;
  border: none;
  border-radius: 12px;
  outline: none;
  background-color: #fff;
  color: #333;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    transform: scale(1.02);
    outline: 2px solid #4fc3f7;
    box-shadow: 0 6px 16px rgba(79, 195, 247, 0.3);
  }
`;

const CreateButton = styled.button`
  margin-top: 1.5rem;
  padding: 14px 28px;
  font-size: 17px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  background-color: #4fc3f7;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #03a9f4;
    transform: scale(1.04);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: #b2ebf2;
    cursor: not-allowed;
    transform: none;
  }
`;

const Home = ({ boards, boardOrder, dispatch }) => {
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBoardTitle.trim()) return;
    setIsSubmitting(true);
    await dispatch(addBoard(newBoardTitle.trim()));
    setIsSubmitting(false);
    setNewBoardTitle("");
  };

  return (
    <HomeContainer>
      <Thumbnails>
        {boardOrder.length === 0 && (
          <EmptyMessage>You haven't created any boards yet.</EmptyMessage>
        )}
        {boardOrder.map((boardID) => (
          <Link key={boardID} to={`/${boardID}`} style={{ textDecoration: "none" }}>
            <BoardThumbnail {...boards[boardID]} />
          </Link>
        ))}
      </Thumbnails>

      <CreateBoardCard>
        <form onSubmit={handleSubmit}>
          <CreateTitle>Create a New Board</CreateTitle>
          <CreateInput
            onChange={handleChange}
            value={newBoardTitle}
            placeholder="Your board's title..."
            type="text"
          />
          <CreateButton
            type="submit"
            disabled={!newBoardTitle.trim() || isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </CreateButton>
        </form>
      </CreateBoardCard>
    </HomeContainer>
  );
};

const mapStateToProps = (state) => ({
  boards: state.boards,
  boardOrder: state.boardOrder,
});

export default connect(mapStateToProps)(Home);
