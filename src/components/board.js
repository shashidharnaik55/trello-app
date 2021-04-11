import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  addList,
  addCard,
  sorted,
  editField,
  setClick,
  boardClicked,
} from '../actions/action'
import { bindActionCreators } from 'redux'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

class MyBoard extends Component {
  state = {
    listName: '',
    cardName: '',
  }

  editData = (field, index) => {
    this.props.editField(field, index)
  }

  onDragEnd = (result) => {
    let { destination, source, draggableId } = result
    let { index: BoardNum } = this.props.location.state
    if (!destination) return true
    this.props.sorted(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      BoardNum
    )
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState === this.state) {
      this.setState({
        listName: '',
        cardName: '',
      })
    }
    if (prevProps === this.props) {
      this.setState(this.props.boards.listSet)
    }
  }

  render() {
    let { index: BoardNum } = this.props.location.state
    const { boards } = this.props
    const elem = boards[BoardNum]
    return (
      <div
        style={{
          background: `url(${elem.BgImgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: '50%',
        }}
      >
        <nav className="navbar py-1 navBar">
          <div className="d-flex col">
            <div className="row col-md-5">
              <i className="fa fa-home rounded mr-1" aria-hidden="true"></i>
              <input
                className="searchInp rounded"
                type="search"
                placeholder="Search..."
              />
            </div>
            <div className="col-md-2 mt-1 text-center">
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                <h4 className="trello">
                  <i className="fa fa-trello mr-1" aria-hidden="true"></i>Trello
                </h4>
              </Link>
            </div>
            <div className="col">
              <div className="float-right font-weight-bolder text-white">
                {elem.boardName}
              </div>
            </div>
          </div>
        </nav>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div id="mainContainer">
            <div className="list m-2">
              {elem.listArray.map((elem, index) => {
                return (
                  <Droppable droppableId={`list${index}`}>
                    {(provider) => (
                      <div
                        {...provider.droppableProps}
                        ref={provider.innerRef}
                        key={index}
                        className="bg-white p-2 col-2 rounded m-1"
                      >
                        <div className="font-weight-bolder">
                          {elem.listName}
                        </div>
                        {elem.cards.map((elm, cardindex) => {
                          return (
                            <Draggable
                              index={cardindex}
                              draggableId={`list${index}card${cardindex}`}
                            >
                              {(provider) => (
                                <div
                                  {...provider.draggableProps}
                                  ref={provider.innerRef}
                                  {...provider.dragHandleProps}
                                  key={cardindex}
                                  className="bg-light p-2 m-2 shadow rounded text-dark"
                                >
                                  {elm.cardName}
                                </div>
                              )}
                            </Draggable>
                          )
                        })}
                        {provider.placeholder}
                        <div className="text-center rounded addBtn">
                          {elem.listSet ? (
                            <div>
                              <textarea
                                value={this.state.cardName}
                                placeholder="Add Card..."
                                style={{
                                  border: 'solid 1px rgb(165, 165, 165)',
                                }}
                                onChange={(e) =>
                                  this.setState({ cardName: e.target.value })
                                }
                                rows="1"
                                className="card-title p-2 bg-light rounded"
                              ></textarea>
                              <button
                                onClick={() =>
                                  this.props.addCard(
                                    this.state.cardName,
                                    BoardNum,
                                    index
                                  )
                                }
                                className="btn btn-success"
                              >
                                Add Card
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() =>
                                this.props.boardClicked(BoardNum, index)
                              }
                            >
                              <i className="fa fa-plus" aria-hidden="true" />{' '}
                              Add
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Droppable>
                )
              })}
              <div
                style={{
                  display: 'inlineBlock',
                  paddingRight: '10px',
                  whiteSpace: 'nowrap',
                }}
              >
                <input
                  style={{ background: 'transparent', color: 'white' }}
                  value={this.state.listName}
                  placeholder="Add List..."
                  type="text"
                  onChange={(e) => this.setState({ listName: e.target.value })}
                />
                <button
                  className="btn btn-sm bg-light"
                  onClick={() =>
                    this.props.addList(this.state.listName, BoardNum)
                  }
                >
                  Add <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('myboard state', state)
  return {
    boards: state.appReducer.boards,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addList,
      addCard,
      sorted,
      editField,
      setClick,
      boardClicked,
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(MyBoard)
