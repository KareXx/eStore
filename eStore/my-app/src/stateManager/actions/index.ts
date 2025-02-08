import BasketItemType from "../../types/basket"

export const productsFetching = () => ({
    type: 'PRODUCTS_FETCHING'
})

export const productsFetched = (products: any) => ({
    type: 'PRODUCTS_FETCHED',
    payload: products
})

export const productsFetchingError = () => ({
    type: 'PRODUCTS_FETCHING_ERROR'
})

export const productSetCurrent = (productId: number) => ({
    type: 'PRODUCT_SET_CURRENT',
    payload: productId,
})

export const categoriesFetched = (categories: any) => ({
    type: 'CATEGORIES_FETCHED',
    payload: categories
})

export const setActiveColorsFilter = (colors: number[]) => ({
    type: 'SET_ACTIVE_COLORS',
    payload: colors
})  

export const setCurrentPriceRange = (priceRange: number[]) => ({
    type: 'SET_CURRENT_PRICE_RANGE',
    payload: priceRange
})

export const setBasket = (basket: BasketItemType[]) => ({
    type: 'SET_BASKET',
    payload: basket
})

export const setUserDto = (userDto: string) => ({
    type: 'SET_USER_DTO',
    payload: userDto
})

export const setIsAuth = (isAuth: boolean) => ({
    type: 'SET_IS_AUTH',
    payload: isAuth
}) 