import React from "react";
import Icon from "@material-ui/core/Icon";
import TrelloButton from "./TrelloButton";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";
import styled from "styled-components";
import TrelloForm from "./TrelloForm";

const OpenFormButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-radius: 8px;
  height: 40px;
  margin: 8px;
  padding: 0 12px;
  background-color: rgba(0, 0, 0, 0.05);
  color: #fff; 
  font-weight: 600;
  font-size: 15px;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #dfe3e6;
    color: #172b4d;
  }

  svg, .material-icons {
    color: inherit;
  }
`;


class TrelloCreate extends React.PureComponent {
  state = {
    formOpen: false,
    text: ""
  };

  openForm = () => {
    this.setState({ formOpen: true });
  };

  closeForm = () => {
    this.setState({ formOpen: false });
  };

  handleInputChange = e => {
    this.setState({ text: e.target.value });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text.trim()) {
      this.setState({ text: "" });
      dispatch(addList(text));
    }
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;

    if (text.trim()) {
      this.setState({ text: "" });
      dispatch(addCard(listID, text));
    }
  };

  render() {
    const { text, formOpen } = this.state;
    const { list } = this.props;

    return formOpen ? (
      <TrelloForm
        text={text}
        onChange={this.handleInputChange}
        closeForm={this.closeForm}
      >
        <TrelloButton onClick={list ? this.handleAddList : this.handleAddCard}>
          {list ? "Add List" : "Add Card"}
        </TrelloButton>
      </TrelloForm>
    ) : (
      <OpenFormButton onClick={this.openForm}>
        <Icon>add</Icon>
        {list ? "Add another list" : "Add another card"}
      </OpenFormButton>
    );
  }
}

export default connect()(TrelloCreate);
