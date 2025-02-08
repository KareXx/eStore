import { useEffect } from "react"


import RangeSlider from "../../../shared/RangeSlider/ui/RangeSlider"
import DropDown from "../../../entities/DropDowm/ui/DropDown"
import Checkbox from "../../../shared/Checkbox/ui/Checkbox"
import CloseIcon from '@mui/icons-material/Close';

import './Filter.css'
import { useFilterModel } from "../model/filterModel"

type filterProps = {
    active?: boolean,
    activeHandler?: () => void
}

const Filter = ({active, activeHandler}: filterProps) => {
    const {categories, activeColors, setActiveCategory} = useFilterModel();

    useEffect(() => {
            document.body.style.overflow = active? 'hidden':  'auto';
    }, [active])

    const filterClass = active ? "filter active" : "filter"
    
    return (
        <div className={filterClass}>
            <div className="filter_wrapper">
                <CloseIcon 
                    style={{position: "absolute", top:'30px', right: '20px', fontSize: '40px', cursor: 'pointer'}}
                    onClick={activeHandler}
                />

                <span className="filter_title">Filter</span>
                <div className="filter_list">
                    <DropDown title='Price'>
                        <RangeSlider style={{width: '100%', marginTop: '40px'}}/>
                    </DropDown>
                    {/* <DropDown title='Collection'>
                        <div className="checkbox_menu_wrapper">
                            <Checkbox title="T-Sport"/>
                            <Checkbox title="T-Classic"/>
                        </div>
                    </DropDown> */}
                    <DropDown title='Colour'>
                        <div className="checkbox_menu_wrapper">
                            {categories && categories.length > 0 && categories.map((category : any) => (
                                <Checkbox 
                                    key={category.id} 
                                    title={category.name} 
                                    isChecked={activeColors.includes(category.id)} 
                                    onChange={(isChecked: boolean) => setActiveCategory(category.id, isChecked)} 
                                />
                            ))}
                        </div>
                    </DropDown>

                    {/* <DropDown title='Sex'>
                        <div className="checkbox_menu_wrapper">
                            <Checkbox title="Man"/>
                            <Checkbox title="Female"/>
                        </div>
                    </DropDown> */}
                
                </div>
            </div>
            <div className="filter__overlay" style={{display: active ? 'block': 'none'}} onClick={activeHandler}></div>
        </div>
    )
}

export default Filter