import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const StyledButton = styled(Button)`
  && {
    color: white;
    background-color: #5aac44;
    font-weight: bold;
    text-transform: none;
    border-radius: 8px;
    padding: 10px 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #519839;
    }

    &:active {
      background-color: #3e7e2b;
    }
  }
`;

const TrelloButton = ({ children, onClick }) => {
  return (
    <StyledButton variant="contained" onMouseDown={onClick}>
      {children}
    </StyledButton>
  );
};

export default TrelloButton;
