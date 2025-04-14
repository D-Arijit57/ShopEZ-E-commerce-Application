import React from 'react'
import Footer from '../../components/Footer'
import Products from '../../components/Products'
import '../../styles/CategoryProducts.css'
import { useParams } from 'react-router-dom'

const CategoryProducts = () => {

  const {category} = useParams();

  return (
    <div className="categoryProducts-page">

    <h2>{category}</h2>

    <Products category={category} />

    <Footer />
    </div>
  )
}

export default CategoryProducts