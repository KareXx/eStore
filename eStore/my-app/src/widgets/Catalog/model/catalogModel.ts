import { useDispatch } from "react-redux";

import { productsFetching, productsFetched, productsFetchingError } from "../../../stateManager/actions";
import { useEffect } from "react";
import ProductType from "../../../types/product";

export const useFetchProducts = () => {
    const dispatch = useDispatch();
    const fetchProducts = async () => {
        dispatch(productsFetching());

        try{
            const response = await fetch(`http://192.168.1.3:5000/products`);
            const data = await response.json()
            dispatch(productsFetched(data))
        }catch(error){
            dispatch(productsFetchingError());
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [dispatch])
}

export const usePagination = (products: ProductType[], cardsOnPage: number, currentPage: number) => {
    const paginateProducts = products.slice((currentPage - 1) * cardsOnPage, currentPage * cardsOnPage);
    const totalPagesCount = Math.ceil(products.length / cardsOnPage);

    return {paginateProducts, totalPagesCount}
}