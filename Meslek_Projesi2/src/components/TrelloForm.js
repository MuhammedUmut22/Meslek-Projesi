import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";

const Container = styled.div`
  width: 284px;
  margin-bottom: 8px;
`;

const StyledCard = styled(Card)`
  min-height: 85px;
  padding: 12px 16px 8px;
  border-radius: 8px;  
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const StyledTextArea = styled(Textarea)`
  resize: none;
  width: 100%;
  overflow: hidden;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 4px; 
  padding: 8px; 
  font-size: 14px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;  
  transition: border 0.2s ease;

  &:focus {
    border: 1px solid #0079bf; 
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  margin-left: 8px;
  justify-content: space-between;
`;

const StyledIcon = styled(Icon)`
  margin-left: 8px;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease;

  &:hover {
    color: #0079bf;
  }
`;

const TrelloForm = React.memo(
  ({ list, text = "", onChange, closeForm, children }) => {
    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";

    const handleFocus = e => {
      e.target.select();
    };

    return (
      <Container>
        <StyledCard>
          <StyledTextArea
            placeholder={placeholder}
            autoFocus
            onFocus={handleFocus}
            value={text}
            onChange={e => onChange(e)}
            onBlur={closeForm}
          />
        </StyledCard>
        <ButtonContainer>
          {children}
          <StyledIcon onMouseDown={closeForm}>close</StyledIcon>
        </ButtonContainer>
      </Container>
    );
  }
);

export default TrelloForm;
