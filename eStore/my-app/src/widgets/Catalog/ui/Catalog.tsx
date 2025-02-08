import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { productSetCurrent} from "../../../stateManager/actions";
import { getFilteredProducts } from "../model/selectors";
import { useFetchProducts, usePagination } from "../model/catalogModel";

import Button1 from "../../../shared/Button1/ui/Button1";
import ProductCardCatalog from "../../../entities/ProductCardCatalog/ui/ProductCardCatalog";
import Filter from "../../Filter/ui/Filter";
import ProductType from "../../../types/product";

import Pagination from '@mui/material/Pagination';

import './Catalog.css'




const Catalog = () => {
    const cardsOnPage = 10;
    const actionRef = useRef<HTMLDivElement| null>(null);
    const [filterActive, setFilterActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const products: ProductType[] = useSelector(getFilteredProducts);
    const {paginateProducts, totalPagesCount} = usePagination(products, cardsOnPage, currentPage)

    const dispatch = useDispatch();

    useFetchProducts();

    const setCurrentProduct = (id: number) => {
        dispatch(productSetCurrent(id))
    }

    const scrollToCatalog = () => {        
        document.body.style.overflow = 'hidden';
        if(!actionRef.current){
            console.warn("Элемент с классом 'catalog__action' не найден.");
            return;
        }
       
        const rect = actionRef.current.getBoundingClientRect();
        const elementPosition = rect.top + window.scrollY - 20;

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });

        document.body.style.overflow = '';
    }



    const filterActiveHandler = () => {
        scrollToCatalog()
        setFilterActive((prev) => !prev)
    }

    const renderProductsList = (arr: ProductType[]) => {
        if(arr.length === 0){
            return <span>No products available</span>
        }
        return arr.map((product: ProductType) => (
            <ProductCardCatalog 
                key={product.id} 
                product={{
                    id:product.id, 
                    name:product.name, 
                    price:product.price, 
                    img:product.img
                }}
                onClick={() => setCurrentProduct(product.id)}/>
        ))
    }

    const elements = renderProductsList(paginateProducts)
    return (
        <div className="catalog">
            <div className="catalog__title">Catalog</div>
            
            <div 
                className="catalog__action"
                ref={actionRef}
            >
                <Button1 text='filter' style={{marginRight: 20}} onClick={filterActiveHandler}/>
                <Button1 text='sort'/>
            </div>

            <Filter active={filterActive} activeHandler={filterActiveHandler}/>

            <div className="catalog__list">
                {elements}
            </div>
            <div className="catalog__pagination">
                <Pagination 
                    count={totalPagesCount}
                    onChange={(event:  React.ChangeEvent<unknown>, page: number) => {
                        scrollToCatalog()
                        setCurrentPage(page)
                    }} 
                    variant="outlined" 
                    shape="rounded" 
                    color='secondary'
                    size='large'
                    sx={{
                        "& .MuiPaginationItem-root": {
                          backgroundColor: "#3E4154", // Задний фон всех элементов
                        },
                        "& .Mui-selected": {
                          backgroundColor: "#000", // Фон для выбранного элемента
                          color: "#fff", // Цвет текста выбранного элемента
                        },
                        "& .MuiPaginationItem-root:hover": {
                          backgroundColor: "#1E202A", // Фон при наведении
                        },
                      }}
                />
            </div>
        </div>
    )
}


export default Catalog;