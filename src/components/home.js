import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {
  deleteItem,
  addBoard,
  editField,
  editIndex,
  boardClicked,
  setClick,
  fetchBackgrounds,
} from '../actions/action'

class Home extends Component {
  state = {
    boardName: '',
    BgImgUrl: '',
  }

  addData = () => {
    let boardData = {
      board: {
        boardName: this.state.boardName,
        isSet: false,
        BgImgUrl: this.state.BgImgUrl,
      },
    }
    this.props.addBoard(boardData.board)
  }

  editData = (field, index) => {
    this.props.editField(field, index)
  }

  componentDidMount() {
    this.props.fetchBackgrounds(this.props.page)
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <nav className="navbar py-1 navBar1">
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
            <button
              data-toggle="modal"
              data-target="#exampleModal"
              className="button rounded ml-auto"
            >
              <i className="fa fa-plus" aria-hidden="true"></i> Create New Board
            </button>
          </div>
        </nav>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="d-flex">
              <div
                style={{
                  background: `url(${this.state.BgImgUrl})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}
                className="modal-content bg-transparent"
              >
                <div className="modal-body">
                  <input
                    value={this.state.boardName}
                    onChange={(e) =>
                      this.setState({ boardName: e.target.value })
                    }
                    className="w-75 rounded searchInp"
                    type="text"
                    placeholder="Enter Title"
                  />
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div
                  onClick={() => this.addData()}
                  data-dismiss="modal"
                  className="btn btn-success mt-3"
                >
                  Create Board
                </div>
              </div>
              <div
                style={{ border: 'none' }}
                className="modal-content col-md-4 bg-transparent"
              >
                <div
                  style={{ overflowY: 'scroll', height: '120px' }}
                  className="row"
                >
                  {this.props.bgImgs.map((elm, index) => {
                    return (
                      <img
                        width="900px"
                        height="30"
                        onClick={() =>
                          this.setState({ BgImgUrl: elm.largeImageURL })
                        }
                        src={elm.previewURL}
                        alt=""
                        key={index}
                        className="p-0 m-1 rounded col-md-4"
                      ></img>
                    )
                  })}
                  <button
                    onClick={() => this.props.fetchBackgrounds(this.props.page)}
                  >
                    more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="app">
          {this.props.boards.length === 0 && (
            <h4 className="font-weight-lighter text-center">
              No Trello Boards Available!
            </h4>
          )}

          <div className="d-flex justify-content-start">
            {this.props.boards.length !== 0 &&
              this.props.boards.map((elem, index) => {
                return (
                  <div key={index} className="card m-3 shadow">
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={{ pathname: '/myboard', state: { index } }}
                    >
                      <div className="mt-2 ml-2 d-flex col">
                        <div className="font-weight-bolder mt-1 text-secondary">
                          Board Title
                        </div>
                        <div className="ml-auto">
                          <i
                            className="fa text-dark fa-arrow-circle-o-right fa-2x"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </Link>

                    <div className="card-body">
                      {elem.isSet ? (
                        <textarea
                          style={{ border: 'solid 1px rgb(165, 165, 165)' }}
                          onChange={(e) =>
                            this.setState({ boardName: e.target.value })
                          }
                          rows="1"
                          className="card-title p-2 bg-light rounded"
                        >
                          {elem.boardName}
                        </textarea>
                      ) : (
                        <div
                          style={{ outline: 'none', border: 'none' }}
                          readOnly
                          onChange={(e) =>
                            this.setState({ boardName: e.target.value })
                          }
                          rows="1"
                          className="card-title p-2 bg-light rounded"
                        >
                          {elem.boardName}
                        </div>
                      )}
                    </div>
                    <div className="ml-auto d-flex">
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          this.editData(this.state.boardName, index)
                        }
                      >
                        {elem.isSet ? (
                          <i
                            className="fa fa-check-square-o m-2 text-success"
                            aria-hidden="true"
                          ></i>
                        ) : (
                          <i className="fa fa-pencil-square-o m-2 text-secondary"></i>
                        )}
                      </div>
                      <i
                        style={{ cursor: 'pointer' }}
                        className="fa fa-trash m-2 text-secondary"
                        onClick={() => {
                          this.props.deleteItem(index)
                        }}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    boards: state.appReducer.boards,
    bgImgs: state.appReducer.bgImgs,
    page: state.appReducer.page,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      deleteItem,
      addBoard,
      editField,
      editIndex,
      boardClicked,
      setClick,
      fetchBackgrounds,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
