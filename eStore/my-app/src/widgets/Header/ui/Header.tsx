import { Link } from "react-router";

import { useHeaderSate } from "../model/useHeaderState";
import useBasket from "../../Basket/model/basketModel";

import HeaderMenu from "../../../shared/HeaderMenu/ui/HeaderMenu";
import SearchResultsList from "../../SearchResultsList/SearchResultsList";
import Basket from "../../Basket/ui/Basket";
import Login from "../../Login/ui/Login";
import MobileMenu from "../../MobileMenu/ui/MobileMenu";

import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './Header.css'

const actionsStyle = {
    fontSize: 27,
    cursor: 'pointer',
    zIndex: 5
}



const Header = () => {
    const {basketProductsQuantity} = useBasket();
    const {
        headerRef,
        searchRef,
        accountMenuHeight,
        isAuth,
        accountMenuIsActive,
        setAccountMenuIsActive,
        basketActive,
        setBasketActive,
        desiredValue,
        setDesiredValue,
        debouncedValue,
        isSelected,
        isSearch,
        setIsSearch,
        loginIsActive,
        setLoginIsActive,
        menuBurgerIsOpen,
        setMenuBurgerIsOpen,
        isScrollingUp,
        isSelectedHandler
    } = useHeaderSate()

    const marginForHeader = {
        top: headerRef.current ? 
            headerRef.current.offsetHeight 
        : accountMenuHeight
    }


    return (
        <div className="header"  style={{height: isSelected ? '100vh': 'auto'}}>
            {loginIsActive ? <Login loginHandler={setLoginIsActive}/> : null}
            {menuBurgerIsOpen ? <MobileMenu style={marginForHeader}/> : null}
            <Basket isActive={basketActive} basketActiveHandler={() => setBasketActive(prev => !prev)}/>
            <div className="header_wrapper" ref={headerRef}>
                <Link to='/'><div className="logo">LJ</div></Link>
                <nav>
                    <ul className="navigation-list">
                        <li><button value='man' onClick={isSelectedHandler}>Men</button></li>
                        <li><button value='women' onClick={isSelectedHandler}>Women</button></li>
                        <li><button value='colection' onClick={isSelectedHandler}>Colection</button></li>
                        <li><button value='used' onClick={isSelectedHandler}>Used</button></li>
                    </ul>
                </nav>
                <div className="actions">
                    <div className="search" ref={searchRef}>
                        <div className="search__input__wrapper" style={isSearch? {width: '150px',  padding: '0 35px 0 10px'}: {width: 0,  padding: 0}}>
                            <input 
                                value={desiredValue} 
                                onChange={(e) => setDesiredValue(e.target.value)}
                                placeholder="Search..." 
                                type="text" 
                            />
                        </div>
                        <SearchIcon style={actionsStyle} onClick={() => {setIsSearch(prev => !prev)}}/>
                    </div>
                    <div 
                        className="account"                    
                        onClick={() => setAccountMenuIsActive(prev => !prev)}
                    >
                        <AccountCircleIcon style={actionsStyle}/>
                        
                    </div>
                    <div 
                        className="basket-header" 
                        onClick={() => setBasketActive(prev => !prev)}
                    >
                        <ShoppingBasketIcon style={actionsStyle}/>
                    </div>
                    <button className="basket-menu-burger" onClick={() => setMenuBurgerIsOpen(prev => !prev)}>
                        <div className={menuBurgerIsOpen ? "basket-menu-burger__icon open": "basket-menu-burger__icon"}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </div>
            <HeaderMenu isActive={isSelected.length !== 0} category={isSelected}/>
            {(desiredValue && isSearch) && <SearchResultsList desiredValue={debouncedValue}style={{top: headerRef.current ? headerRef.current.offsetHeight : 0, left: searchRef.current ? searchRef.current.getBoundingClientRect().left -195 +27: 0}}/>}
            <div 
                className="account__menu"
                style={{...marginForHeader, height: accountMenuIsActive? `${accountMenuHeight}px`: 0}}
            >
                    <div className="account__menu__wrapper">
                        <button
                            onClick={() => setLoginIsActive(true)}
                        >
                            Login
                        </button>
                        {isAuth && 
                        <>
                            <Link style={{height: '100%'}} to='/wishies'><button>Wishies</button></Link>
                            <Link style={{height: '100%'}} to='/my-orders'><button>My orders</button></Link>

                        </>}
                    </div>
            </div>

            <button 
                className="basket-floating-button"
                onClick={() => setBasketActive(prev => !prev)}
                style={isScrollingUp?{visibility:  'visible', opacity: 1}: {visibility:  'hidden', opacity: 0}}
            >
                <div className="basket-floating-button__wrapper">
                    <ShoppingBasketIcon style={{...actionsStyle, color: '#151927'}}/>
                    <div className="basket-floating-button__quantity">
                    {basketProductsQuantity}
                </div>
                </div>
                
            </button>
        </div>
    )
}

export default Header;