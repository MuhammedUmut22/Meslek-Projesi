import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai"; // AiOutlineClose'u doğru şekilde import edin

const Thumbnail = styled.div`
  position: relative;
  height: 240px;
  width: 240px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 10px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  }
`;

const Title = styled.h4`
  color: white;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 0 10px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 1;
  padding: 5px;
  border-radius: 50%;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: scale(1.2);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const BoardThumbnail = ({ id, title, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(id);
  };

  return (
    <Thumbnail>
      <DeleteButton onClick={handleDelete} title="Sil">
        <AiOutlineClose size={20} />
      </DeleteButton>
      <Title>{title}</Title>
    </Thumbnail>
  );
};

export default BoardThumbnail;
