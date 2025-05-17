import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TrelloForm from "./TrelloForm";
import { editCard, deleteCard } from "../actions";
import { connect } from "react-redux";
import TrelloButton from "./TrelloButton";

// 🎨 Styled Components
const CardContainer = styled.div`
  margin-bottom: 6px;
  width: 100%;
  max-width: 248px;
  word-wrap: break-word;
`;

const StyledCard = styled(Card)`
  padding: 6px 8px !important;
  border-radius: 6px !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  background-color: #ffffff;
  position: relative;
  min-height: 40px;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    max-width: 226px;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  gap: 2px;
`;

const StyledIconButton = styled(IconButton)`
  padding: 4px !important;
  color: #6b7280 !important;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    background-color: ${(props) => (props.delete ? "#fee2e2" : "#e2e8f0")} !important;
    color: ${(props) => (props.delete ? "#dc2626" : "#2563eb")} !important;
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 4px 8px 4px 0 !important;
  display: flex;
  align-items: center;
`;

const CreatedByText = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  padding: 4px 8px 4px 8px;
  font-style: italic;
`;

const TrelloCard = React.memo(({ text, id, listID, index, dispatch, createdBy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);

  const closeForm = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const saveCard = (e) => {
    e.preventDefault();
    if (cardText.trim()) {
      dispatch(editCard(id, listID, cardText));
    }
    setIsEditing(false);
  };

  const handleDeleteCard = () => {
    dispatch(deleteCard(id, listID));
  };

  const renderEditForm = () => (
    <TrelloForm text={cardText} onChange={handleChange} closeForm={closeForm}>
      <TrelloButton onClick={saveCard}>Save</TrelloButton>
    </TrelloForm>
  );

  const renderCard = () => (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <CardContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onDoubleClick={() => setIsEditing(true)}
        >
          <StyledCard>
            <ButtonContainer>
              <StyledIconButton
                onClick={() => setIsEditing(true)}
                aria-label={`Edit card: ${text}`}
                size="small"
              >
                <EditIcon fontSize="small" />
              </StyledIconButton>
              <StyledIconButton
                onClick={handleDeleteCard}
                aria-label={`Delete card: ${text}`}
                size="small"
                delete
              >
                <DeleteIcon fontSize="small" />
              </StyledIconButton>
            </ButtonContainer>
            <StyledCardContent>
              <Typography
                variant="body2"
                style={{
                  wordBreak: "break-word",
                  color: "#1e40af",
                  fontSize: "0.9rem",
                }}
              >
                {cardText}
              </Typography>
            </StyledCardContent>
            {createdBy && (
              <CreatedByText>{createdBy} tarafından eklendi</CreatedByText>
            )}
          </StyledCard>
        </CardContainer>
      )}
    </Draggable>
  );

  return isEditing ? renderEditForm() : renderCard();
});

export default connect()(TrelloCard);
