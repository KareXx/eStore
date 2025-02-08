import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useHeaderSate = () => {
    const headerRef = useRef<HTMLDivElement | null>(null)
    const searchRef = useRef<HTMLDivElement | null>(null)
    const accountMenuHeight = 60;
    const isAuth = useSelector((state: any) => state.products.isAuth);

    const [accountMenuIsActive, setAccountMenuIsActive] = useState<boolean>(false);
    const [basketActive, setBasketActive] = useState<boolean>(false);
    const [desiredValue, setDesiredValue] = useState<string>('');
    const [debouncedValue, setDebouncedValue] = useState<string>('');
    const [isSelected, setIsSelected] = useState<string>('');
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [loginIsActive, setLoginIsActive] = useState<boolean>(false);
    const [menuBurgerIsOpen, setMenuBurgerIsOpen] = useState(false);

    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const lastScrollPosition = useRef(0);

    const marginForHeader = {
        top: headerRef.current ? 
            headerRef.current.offsetHeight 
        : accountMenuHeight
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentlyScroll = window.scrollY;
            setIsScrollingUp(currentlyScroll <  lastScrollPosition.current)
            lastScrollPosition.current = currentlyScroll
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(desiredValue), 500)
        return () => clearTimeout(handler)
    }, [desiredValue, setDesiredValue])

    useEffect(() => {
        if(loginIsActive || menuBurgerIsOpen){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'auto';
        }
    }, [loginIsActive, menuBurgerIsOpen])

    const basketActiveHandler = (e: React.MouseEvent) => {
        setBasketActive(prev => !prev)
    }

    const isSelectedHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.value === isSelected){
            setIsSelected('')
            document.body.style.overflow = '';
        }else{

            setIsSelected(e.currentTarget.value)
            document.body.style.overflow = 'hidden';
        }
    }

    return {
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
    }
}