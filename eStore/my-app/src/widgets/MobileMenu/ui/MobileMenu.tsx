import { useSearchDebounce } from '../model/useSearchDebounce';
import SearchResultsList from '../../SearchResultsList/SearchResultsList';


import SearchIcon from '@mui/icons-material/Search';


import './MobileMenu.css'

type MobileMenuPropsType = {
    style?: React.CSSProperties
}

const MobileMenu = ({style}: MobileMenuPropsType) => {
   const {setDebouncedValue, debouncedValue, desiredValue} = useSearchDebounce()
    
    const actionsStyle = {
        fontSize: 27,
        cursor: 'pointer',
        zIndex: 5
    }




    return (
    <div className="mobile-menu" style={style}>
        <div className="mobile-menu__wrapper">
            <div className="mobile-menu__search">
                <div className="mobile-menu__search__wrapper">
                    <div className="mobile-menu__search__icon">
                        <SearchIcon sx={actionsStyle}/>
                    </div>
                    <div className="mobile-menu__search__input">
                        <input 
                            onChange={(e) => setDebouncedValue(e.currentTarget.value)}
                            value={debouncedValue}
                            type="text"
                         />
                    </div>
                </div>
                <SearchResultsList desiredValue={desiredValue}/>
            </div>
        </div>
    </div>
    )
}

export default MobileMenu;