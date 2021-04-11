import axios from "axios"
const Api_Key = '16039725-c9e448ac866c710680005bca2'

export function fetchBackgrounds(param) {
    let request = axios({
        method: "get",
        url: `https://pixabay.com/api/?key=${Api_Key}&q=nature&page=${param}&image_type=photo`
    })
    return (dispatch) => {
        request.then(response => {
            console.log(response)
            dispatch({
                type: "fImg",
                payload: response.data.hits
            })
        }).catch(err => console.log(err));
    }
}

export function addBoard(data) {
    return {
        type: "addBoard",
        payload: data
    }
}

export function deleteItem(index) {
    return {
        type: "deleteItem",
        payload: index
    }
}

export function editField(data, index) {
    return {
        type: "editField",
        payload: {
            data: data,
            index: index
        }
    }
}

export function editIndex(name) {
    return {
        type: "editIndex",
        payload: name
    }
}

export function boardClicked(Bindex , ind) {
    console.log("action log",ind)
    return {
        type: "boardClicked",
        payload: {
            Bindex: Bindex,
            ind: ind
        }

    }
}

export function setClick() {
    return {
        type: "setClick"
    }
}

export function addList(data, index) {
    return {
        type: "addList",
        payload: {
            data: data,
            index: index
        }
    }
}

export function addCard(data, Bindex, Lindex) {
    return {
        type: "addCard",
        payload: {
            data: data,
            Bindex: Bindex,
            Lindex: Lindex
        }
    }
}

export function sorted(droppableIdStart,droppableIdEnd,droppableIndexStart,droppableIndexEnd,draggableId, BoardNum) {
    return {
        type: "sorted",
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            BoardNum
        }
    }
}