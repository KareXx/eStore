import { useEffect, useState } from "react";

import SearchResultItem from "../../entities/SearchResultItem/SearchResultItem";
import ProductType from "../../types/product";

import './SearchResultsList.css'

type SearchResultsListPropsType ={
    desiredValue: string
    style?: React.CSSProperties;
}

const SearchResultsList = ({desiredValue, style}: SearchResultsListPropsType) => {
    const [searchedProducts, setSearchedProducts] = useState<ProductType[]>([]);


    useEffect(() => {
        if(desiredValue){
        fetch(`http://192.168.1.3:5000/products?name=${desiredValue}`)
            .then(response => response.json())
            .then(data => setSearchedProducts(data))
        }
    }, [desiredValue])

    return (
        <div className="search-results-list" style={style}>
            <div className="search-results-list__wrapper">
                {searchedProducts && searchedProducts.map(product => (
                    <SearchResultItem key={product.id} id={product.id} img={product.img} name={product.name} price={product.price}/>

                ))}
            </div>
        </div>
    )
}


export default SearchResultsList;