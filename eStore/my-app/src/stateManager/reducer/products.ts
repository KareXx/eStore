import UserType from "../../types/user"


const initialState = {
    products: [],
    filtredProducts: [],
    currentProductId: null,
    productsLoadingStatus: 'idle',
    сategories: [],
    categoriesLoadingStatus: 'idle',
    
    activeColorsFilter: [],
    currentPriceRange : [],
    basket: [],
    userDto: {},
    isAuth: false,

}

const products = (state = initialState, actions: any) => {
    switch (actions.type){
        case 'PRODUCTS_FETCHING':
            return {
                ...state,
                productsLoadingStatus: 'loading'
            }
        case 'PRODUCTS_FETCHED':
            return {
                ...state,
                products: actions.payload,
                productsLoadingStatus: 'idle',
            }
        case 'PRODUCTS_FETCHING_ERROR':
            return {
                ...state,
                productsLoadingStatus: 'error'

            }
        case 'PRODUCT_SET_CURRENT':
            return {
                ...state,
                currentProductId: actions.payload
            }

        case 'CATEGORIES_FETCHED':
            return {
                ...state,
                categories:  actions.payload,
                
            }

        case 'SET_ACTIVE_COLORS':
            return {
                ...state,
                activeColorsFilter: actions.payload
            }

        case 'SET_CURRENT_PRICE_RANGE':
            return {
                ...state,
                currentPriceRange: actions.payload
            }

        case 'SET_BASKET': 
            return {
                ...state,
                basket: actions.payload
            }

        case 'SET_USER_DTO':
            return {
                ...state,
                userDto: actions.payload
            }

        case 'SET_IS_AUTH': 
            return {
                ...state,
                isAuth: actions.payload 
            }
        

        default: return state
    }
}

export default products;