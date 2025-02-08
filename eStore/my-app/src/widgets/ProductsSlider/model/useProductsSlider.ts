import { useRef, useState, useEffect } from "react";

export const useProductsSlider = (baseCardWidth: number, margin: number) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const firstCardRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState<number>(baseCardWidth);

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [translateX, setTranslateX] = useState<number>(0);
    const [startScrollX, setStartScrollX] = useState<number>(0);

    useEffect(() => {
        if (!firstCardRef.current) return;
        const updateCardWidth = () => {
            if (firstCardRef.current) {
                setCardWidth(firstCardRef.current.offsetWidth);
            }
        };
        const observer = new ResizeObserver(updateCardWidth);
        observer.observe(firstCardRef.current);
        updateCardWidth(); 

        return () => observer.disconnect();
    }, []);


    const scrollToPosition = (position: number, smooth: boolean = false) => {
        if (sliderRef.current) {
            sliderRef.current.style.scrollBehavior = smooth ? 'smooth' : 'auto';
            sliderRef.current.scrollLeft = position;
        }
    };

    useEffect(() => {
            scrollToPosition(startScrollX, true)
    }, [startScrollX])


    const handleStart = (startPosition: number) => {
        setIsDragging(true);
        setStartX(startPosition)
        if(sliderRef.current){
            setStartScrollX(sliderRef.current.scrollLeft);
        }
    }

    const handleMove = (clientX: number) => {
        if(!isDragging) return
        const movePosition = startX - clientX
        scrollToPosition(startScrollX + movePosition)
        setTranslateX(movePosition);
    }

    const handleEnd = () => {
        setIsDragging(false);
        const step = cardWidth + 2 * margin;
        const indexStep = translateX < 0 ? Math.floor(translateX / step) : Math.ceil(translateX / step);
        if (Math.abs(translateX) > 70) {
            setStartScrollX(startScrollX + step * indexStep);
        }else{
            scrollToPosition(startScrollX, true)
        }
    
        setTranslateX(0);
    };


    return {
        sliderRef,
        firstCardRef,
        isDragging,
        handleTouchStart: (e: React.TouchEvent) => handleStart(e.touches[0].clientX),
        handleTouchMove: (e: React.TouchEvent) => handleMove(e.touches[0].clientX),
        handleMouseStart: (e: React.MouseEvent) => handleStart(e.clientX),
        handleMouseMove: (e: React.MouseEvent) => handleMove(e.clientX),
        handleEnd
    }

}