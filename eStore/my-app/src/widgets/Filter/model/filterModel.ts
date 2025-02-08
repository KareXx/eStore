import { useCallback, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";

import { setActiveColorsFilter, categoriesFetched } from "../../../stateManager/actions";

export const useFilterModel = () => {
    const categories = useSelector((state: any) => state.products.categories);
    const activeColors: number[] = useSelector((state: any) => state.products.activeColorsFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://192.168.1.3:5000/category')
            .then(response => response.json())
            .then(data => dispatch(categoriesFetched(data)))
    }, [dispatch])

    const setActiveCategory = useCallback(( id: number, isChecked: boolean) => {
            const updatedColors = isChecked 
                ? [...activeColors, id]
                : activeColors.filter(activeColor => activeColor !== id)
            dispatch(setActiveColorsFilter(updatedColors))
        }, 
    [activeColors, dispatch])
    
    return {categories, activeColors, setActiveCategory}   
}