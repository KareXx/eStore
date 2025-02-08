import ProductType from "../../types/product";
import { useRef, useState } from "react";

import Skeleton from '@mui/material/Skeleton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './SingleItemSlider.css'

type SingleItemSliderPropsType = {
    product?: ProductType
}

const SingleItemSlider = ({product}: SingleItemSliderPropsType) => {
    const sliderBoxRef = useRef<HTMLDivElement | null>(null);
    const sliderRef = useRef<HTMLDivElement | null>(null);

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [translateX, setTranslateX] = useState<number>(0);

    const httpImageList = product?.images.map(image => (
        `http://192.168.1.3:5000/${image}`
    ))
    httpImageList?.unshift(`http://192.168.1.3:5000/${product?.img}`);

    const handleStart = (clientX: number) => {
            setIsDragging(true);
            setStartX(clientX);
        };
        
        const handleMove = (clientX: number) => {
            if (!isDragging) return;
            setTranslateX(startX - clientX);
        };
        
        const handleEnd = () => {
            setIsDragging(false);
        
            if (translateX > 70 && httpImageList && currentIndex < httpImageList.length -1){
                setCurrentIndex(prev => prev + 1)
            } else if (translateX < -70 && currentIndex > 0) {
                setCurrentIndex(prev => prev -1)
            }
        
            setTranslateX(0);
        };
        
        const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
        const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
        
        const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
        const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
        
    
    return (
        <div className="product_img">
            <div className="product_img_main" ref={sliderBoxRef}>
                {product ? 
                    <div className="product_img_main__slider" 
                        ref={sliderRef}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleEnd}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleEnd}
                        style={{
                            transition: isDragging ? '' : 'all 0.5s',
                            transform: `translateX(${-((sliderBoxRef.current? currentIndex * sliderBoxRef.current.offsetWidth: 0) + translateX)}px)`
                            
                        }}
                    >
                        {httpImageList?.map((image, index) => <div className="slider__img" key={index}><img src={image} alt="" draggable="false" /></div>)}
                    </div> 
                    : 
                    <Skeleton variant="rectangular" width={'60vw'} height={'70vh'}/>
                }
                    
                <div 
                    onClick={() => setCurrentIndex(prev => prev > 0 ? prev-1 : prev)}
                    className="arrow left"
                >
                    <ArrowBackIosIcon style={{color: '#3E4154'}}/>
                </div>
                <div 
                    onClick={() => setCurrentIndex(prev => httpImageList && prev < httpImageList?.length - 1 ? prev + 1 : prev)}
                    className="arrow right"
                >
                    <ArrowForwardIosIcon style={{color:'#3E4154'}}/>
                </div>

            </div>
            
            {product && <div className="product_img_navigations">
                {httpImageList?.map((image, index) => (
                    <div 
                        key={index} 
                        className={currentIndex === index? "product_img_navigations_element active__image": "product_img_navigations_element"}
                        onClick={() => setCurrentIndex(index)}
                        >
                            <img src={ image} alt={`Product view ${index + 1}`} />
                    </div>
                ))}
            </div>}

        </div>
    )
}

export default SingleItemSlider;