import { combineReducers } from "redux";

let initialState = {
    userName: "",
    page: 1,
    bgImgs: [],
    boards: []
}

function appReducer(state = initialState, action) {
    let stateCopy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "fImg":
            console.log(action.payload)
            stateCopy.bgImgs = [...stateCopy.bgImgs,...action.payload]
            stateCopy.page++
            return stateCopy;
        case "addBoard":
            return addToList(stateCopy, action.payload)
        case "deleteItem":
            let newBoards = stateCopy.boards.filter((el, i) => i !== action.payload)
            stateCopy.boards = newBoards
            return stateCopy;
        case "editField":
            return editField(stateCopy, action.payload.data, action.payload.index)
        case "editIndex":
            let newBoard = stateCopy.boards.indexOf(action.payload)
            stateCopy.boards = newBoard
            return stateCopy;
        case "boardClicked":
            return clicked(stateCopy, action.payload.Bindex, action.payload.ind)
        case "addList":
            console.log(action.payload)
            return addList(stateCopy, action.payload.data, action.payload.index)
        case "addCard":
            return addCard(stateCopy, action.payload.data, action.payload.Bindex, action.payload.Lindex)
        case "sorted":
            return sorted(stateCopy, action.payload)
        default:
            return stateCopy;
    }
}

const rootReducers = combineReducers({
    appReducer
})

export default rootReducers;

let addToList = (state, data) => {
    data.listArray = []
    let newBoardList = state.boards.slice()
    newBoardList.push(data)
    state.boards = newBoardList;
    return state;
}

let editField = (state, data, index) => {
    state.boards.map((element, i) => {
        if (i === index) {
            element.boardName = data
            element.isSet = !element.isSet
        }
        return true
    });
    return state
}

let clicked = (state, bindex, index) => {
    console.log(bindex, index)
    state.boards[bindex].listArray.map((elem, i) => {
        if (i === index) {
            elem.listSet = !elem.listSet
        }
        return true
    })
    return state
}

let addList = (state, data, index) => {
    state.boards[index].listArray.push({ listName: data, cards: [] })
    return state
}

let addCard = (state, data, Bindex, Lindex) => {
    console.log(state)
    state.boards[Bindex].listArray[Lindex].cards.push({ cardName: data })
    return state
}

let sorted = (state, { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, BoardNum }) => {
    // dragging for same list
    if (droppableIdStart === droppableIdEnd) {
        const listIndex = parseInt(droppableIdStart.split("t")[1])
        console.log("listIndex", listIndex)
        const list = state.boards[BoardNum].listArray[listIndex]
        const card = list.cards[droppableIndexStart]
        list.cards.splice(droppableIndexEnd, 0, card)
        list.cards.splice(droppableIndexStart, 1)
    }
    // dragging for other list
    else {
        const startListIndex = parseInt(droppableIdStart.split("t")[1])
        const endListIndex = parseInt(droppableIdEnd.split("t")[1])
        const startList = state.boards[BoardNum].listArray[startListIndex]
        const endList = state.boards[BoardNum].listArray[endListIndex]
        const card = startList.cards[droppableIndexStart]
        endList.cards.splice(droppableIndexEnd, 0, card)  
        startList.cards.splice(droppableIndexStart, 1)
    }
    console.log(state.boards[BoardNum])
    return state
}