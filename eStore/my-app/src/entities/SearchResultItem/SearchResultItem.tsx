import './SearchResultItem.css'
import { Link } from "react-router";


type SearchResultItemPropsType = {
    id: number,
    img: string
    name: string,
    price: number
}

const SearchResultItem = ({id, img, name, price}: SearchResultItemPropsType) => {
    const productLink = '/product/' + id;

    const parseWord = (text: string, maxLength: number) => {
        return text.split(' ').reduce((finalText, current) => {
            if(current.length + finalText.length < maxLength){
                return finalText + ' ' + current;
            }
            return finalText;
        }, '') 
    }

    const parsedName = parseWord(name, 30);
    return (
        <Link to={productLink}>
        <div className="search-result-item">
            <div className="search-result-item__img">
                <img src={`http://192.168.1.3:5000/${img}`} alt="" />
            </div>
            <div className="search-result-item__info">
                <p>{parsedName.length === name.length ? parsedName: parsedName+'...'}</p>
                <p>{price}₴</p>
            </div>
        </div>
        </Link>
    )
}

export default SearchResultItem;