import { useSelector } from 'react-redux'

import ProductType from '../../../types/product'
import RecommendationCard from '../../../entities/RecommendationCard/ui/RecommendationCard'
import ProductsSlider from '../../ProductsSlider/ui/ProductsSlider'

import waveVideo from '../static/waves.webm'

import './Recommendation.css'


const Recommendation = () => {
    const cardMargin = 10;

    const products: ProductType[] = useSelector((state: any) => state.products.products)

    const shotProducts = products.slice(0, 10)

    const renderSlideCards = shotProducts.map(card => (
        <RecommendationCard
            key={card.id}
            img={card.img}
            id={card.id}
            price={card.price}
            name={card.name}
            style={{margin: `0 ${cardMargin}px`}}
        />
    ));
    
    return (
        <div className="video-section">
            <video className='hero-video' controls={false} loop autoPlay muted playsInline>
                <source src={waveVideo} type="video/webm"/>
            </video>
            <ProductsSlider>
                {renderSlideCards}
            </ProductsSlider>
        </div>
    )
}

export default Recommendation;