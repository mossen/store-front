const ADD = 'CART/ADD';
const REMOVE = 'CART/REMOVE';

const initialState = {
    items: []
};

export default function reducer(state = initialState, action = {}) {
    let existedItems

    switch (action.type) {
        case ADD:
            //existedItems = state.items.filter(item => item.productIndex != action.productIndex)
            let newItem = true
            let items = state.items.map((item) => {
                if (item.productIndex == action.item[0].productIndex) {
                    newItem = false
                    return Object.assign({}, ...action.item)
                }
                return item
            })

            return {
                ...state,
                items: newItem ? items.concat(action.item) : items
            };

        case REMOVE:
            existedItems = state.items.filter(item => item.productIndex != action.productIndex)

            return {
                ...state,
                items: existedItems
            };
        default:
            return state;
    }
}

export function add(item) {
    return {
        type: ADD,
        item
    };
}

export function remove(productIndex) {
    return {
        type: REMOVE,
        productIndex
    };
}
