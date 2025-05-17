import React, { useState } from "react";
import TrelloCard from "./TrelloCard";
import TrelloCreate from "./TrelloCreate";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { editTitle, deleteList } from "../actions";
import Icon from "@material-ui/core/Icon";

// 🎨 Styled Components
const ListContainer = styled.div`
  background-color: #f8fafc;
  border-radius: 8px;
  width: 272px;
  padding: 12px;
  margin: 0 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 250px;
    margin: 0 4px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  padding: 8px;
  font-size: 0.95rem;
  color: #1e40af;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e2e8f0;
  }
`;

const ListTitle = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: #1e40af;
  margin: 0;
  padding: 4px 0;
  flex: 1;
`;

const DeleteButton = styled(Icon)`
  color: #6b7280;
  font-size: 18px;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: #dc2626;
    background-color: #fee2e2;
  }

  &:focus {
    outline: 2px solid #2563eb;
    outline-offset: 1px;
  }
`;

const CardsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 220px);
  padding: 4px 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #e2e8f0;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #bfdbfe;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #2563eb;
  }

  scrollbar-width: thin;
  scrollbar-color: #bfdbfe #e2e8f0;
`;

const TrelloList = ({ title, cards, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  const renderEditInput = () => (
    <form onSubmit={handleFinishEditing}>
      <StyledInput
        type="text"
        value={listTitle}
        onChange={handleChange}
        autoFocus
        onFocus={handleFocus}
        onBlur={handleFinishEditing}
        aria-label={`Edit title for list ${title}`}
      />
    </form>
  );

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setListTitle(e.target.value);
  };

  const handleFinishEditing = () => {
    setIsEditing(false);
    if (listTitle.trim()) {
      dispatch(editTitle(listID, listTitle));
    } else {
      setListTitle(title); // Revert to original title if empty
    }
  };

  const handleDeleteList = () => {
    dispatch(deleteList(listID));
  };

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <ListContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          aria-label={`List: ${title}`}
        >
          <Droppable droppableId={String(listID)} type="card">
            {(provided) => (
              <div>
                <div>
                  {isEditing ? (
                    renderEditInput()
                  ) : (
                    <TitleContainer onClick={() => setIsEditing(true)}>
                      <ListTitle>{listTitle}</ListTitle>
                      <DeleteButton
                        onClick={handleDeleteList}
                        aria-label={`Delete list ${title}`}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && handleDeleteList()}
                      >
                        delete
                      </DeleteButton>
                    </TitleContainer>
                  )}
                </div>
                <CardsContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cards.map((card, index) => (
                    <TrelloCard
                      key={card.id}
                      text={card.text}
                      id={card.id}
                      index={index}
                      listID={listID}
                      createdBy={card.createdBy} // createdBy bilgisi eklendi
                    />
                  ))}
                  {provided.placeholder}
                </CardsContainer>
                <TrelloCreate listID={listID} />
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
};

export default connect()(TrelloList);
