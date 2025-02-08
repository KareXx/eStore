import ProductType from "../../../types/product";

export const getFilteredProducts = (state: any) => {
    const activeColorFilters = state.products.activeColorsFilter;
    const currentPriceRange = state.products.currentPriceRange
    if (activeColorFilters.length > 0 || currentPriceRange.length > 0){
         return state.products.products.filter((product: ProductType) => {
            let passedFilter = true;

            if(currentPriceRange.length > 0){
                passedFilter = product.price >= currentPriceRange[0] &&  product.price <= currentPriceRange[1]
            }
            if(activeColorFilters.length > 0){
                return passedFilter && product.categories.some(category => activeColorFilters.includes(category.id))
            }
            return passedFilter
        })
    }

    return state.products.products
}