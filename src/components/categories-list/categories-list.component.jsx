import React from 'react'

import './categories-list.styles.scss'

import CategoriesItem from '../categories-item/categories-item.component'

function CategoriesList({categories}) {
  return (
    <div className='categories-container'>
    {categories.map((category) => (
      <CategoriesItem key={category.id} category={category}/>
    ))}
    </div>
  )
}

export default CategoriesList