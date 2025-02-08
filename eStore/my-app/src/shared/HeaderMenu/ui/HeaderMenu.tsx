import React from 'react'

import './HeaderMenu.css'

type CategoryItem = {
  name: string;
  link: string;
};

// Определите тип для данных заголовка меню
type HeaderMenuData = {
  title: string;
  category: CategoryItem[];
};

// Определите тип для всех данных заголовка меню
type HeaderMenuDataMap = {
  [key: string]: HeaderMenuData; // Укажите, что ключи могут быть любыми строками
};


const headerMenuData: HeaderMenuDataMap= {
  man: {
    title: 'man',
    category: [
      {name:'New items', link:''},
      {name:'Gift ideas', link:''},
      {name:'BESTSELLERS', link:''},
      {name:'POWERMATIC 80 MOVEMENT', link:''},
      {name:'Diamonds', link:''}
    ]
  },
  women: {
    title: 'women',
    category: [
      {name:'New items', link:''},
      {name:'Gift ideas', link:''},
      {name:'BESTSELLERS', link:''},
      {name:'POWERMATIC 80 MOVEMENT', link:''},
      {name:'Diamonds', link:''}
    ]
  },
  colection: {
    title: 'colection',
    category: [
      {name:'New items', link:''},
      {name:'Gift ideas', link:''},
      {name:'BESTSELLERS', link:''},
      {name:'POWERMATIC 80 MOVEMENT', link:''},
      {name:'Diamonds', link:''}
    ]
  },
  used: {
    title: 'used',
    category: [
      {name:'New items', link:''},
      {name:'Gift ideas', link:''},
      {name:'BESTSELLERS', link:''},
      {name:'POWERMATIC 80 MOVEMENT', link:''},
      {name:'Diamonds', link:''}
    ]
  }
}


type headerMenuProps = {
  isActive?: boolean,
  style?: React.CSSProperties,
  category?: string
}

const HeaderMenu = ({isActive, style, category}: headerMenuProps) => {
    const [categoryElemClass, setCategoryElemClass] = React.useState('');
    const menuClass = isActive ? 'menu ' + 'active': 'menu';
    const title = category && headerMenuData[category] ? headerMenuData[category].title : '';
    const categoryList = category && headerMenuData[category] ? headerMenuData[category].category: []


    React.useEffect(() => {
      if (category){
        setCategoryElemClass('category_elem_a transition0');

        const timer = setTimeout(() => {
          setCategoryElemClass('category_elem_a category_elem_active')
        }, 100)
        
        return () => clearTimeout(timer)
      }else{
        setCategoryElemClass('category_elem_a')
      }
      

    }, [category])
    return (
      <div className={menuClass}>
          <div className="menu_title">{title}</div>
          <div className="menu_category">
            {categoryList.map((item) => {
              return <div className='category_elem'><a className={categoryElemClass} href="#">{item.name}</a></div>
            })}
           

          </div>
      </div>  
    );
}

export default HeaderMenu;