import React, { PureComponent } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloCreate from "./TrelloCreate";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort, setActiveBoard } from "../actions";
import { Link } from "react-router-dom";

// 🎨 Stiller
const PageContainer = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #0f2027, #2c5364); /* yeni renk gradyanı */

  min-height: 100vh;
  color: white;
`;

const BoardTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
`;

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4fc3f7;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #03a9f4;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  font-size: 16px;
  color: #4fc3f7;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #03a9f4;
  }
`;

const CardItem = styled.div`
  background: #f4f5f7;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
  transition: transform 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    transform: scale(1.02);
  }
`;

class TrelloBoard extends PureComponent {
  componentDidMount() {
    const { boardID } = this.props.match.params;
    this.props.dispatch(setActiveBoard(boardID));
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists, cards, match, boards } = this.props;
    const { boardID } = match.params;
    const board = boards[boardID];

    if (!board) return <p style={{ color: "white" }}>Board not found</p>;

    const listOrder = board.lists;

    return (
      <PageContainer>
        <BackLink to="/">← Back to Boards</BackLink>
        <BoardTitle>{board.title}</BoardTitle>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <ListsContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {listOrder.map((listID, index) => {
                  const list = lists[listID];
                  if (!list) return null;

                  const listCards = list.cards.map(cardID => {
                    const card = cards[cardID];
                    return {
                      ...card,
                      createdBy: card.createdBy || "Muhammed",
                    };
                  });

                  return (
                    <TrelloList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                      CardItem={CardItem}
                    />
                  );
                })}
                {provided.placeholder}
                <TrelloCreate list />
              </ListsContainer>
            )}
          </Droppable>
        </DragDropContext>
      </PageContainer>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards
});

export default connect(mapStateToProps)(TrelloBoard);
