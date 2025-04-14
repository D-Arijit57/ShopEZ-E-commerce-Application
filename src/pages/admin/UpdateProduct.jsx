import React, { useEffect, useState } from 'react'
import '../../styles/NewProducts.css'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

const UpdateProduct = () => {

  const {id} = useParams();


  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productMainImg, setProductMainImg] = useState('');
  const [productCarouselImg1, setProductCarouselImg1] = useState('');
  const [productCarouselImg2, setProductCarouselImg2] = useState('');
  const [productCarouselImg3, setProductCarouselImg3] = useState('');
  const [productSizes, setProductSizes] = useState([]);
  const [productGender, setProductGender] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productNewCategory, setProductNewCategory] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);


  const [AvailableCategories, setAvailableCategories] = useState([]);


  useEffect(()=>{
    fetchCategories();
    fetchProduct();
  },[])


  const fetchProduct = async() =>{
    await axios.get(`http://localhost:6001/fetch-product-details/${id}`).then(
      (response)=>{
        setProductName(response.data.title);
        setProductDescription(response.data.description);
        setProductMainImg(response.data.mainImg);
        setProductCarouselImg1(response.data.carousel[0]);
        setProductCarouselImg2(response.data.carousel[1]);
        setProductCarouselImg3(response.data.carousel[2]);
        setProductSizes(response.data.sizes);
        setProductGender(response.data.gender);
        setProductCategory(response.data.category);
        setProductPrice(response.data.price);
        setProductDiscount(response.data.discount);
      }
    )
  }


  const fetchCategories = async () =>{
    await axios.get('http://localhost:6001/fetch-categories').then(
      (response)=>{
        setAvailableCategories(response.data);
      }
    )
  }


  const handleCheckBox = (e) =>{
    const value = e.target.value;
    if(e.target.checked){
        setProductSizes([...productSizes, value]);
    }else{
        setProductSizes(productSizes.filter(size=> size !== value));
    }
  }

  const navigate = useNavigate();


  const handleUpdateProduct = async() =>{
    await axios.put(`http://localhost:6001/update-product/${id}`, {productName, productDescription, productMainImg, productCarousel: [productCarouselImg1, productCarouselImg2, productCarouselImg3], productSizes, productGender, productCategory, productNewCategory, productPrice, productDiscount}).then(
      (response)=>{
        alert("product updated");
        setProductName('');
        setProductDescription('');
        setProductMainImg('');
        setProductCarouselImg1('');
        setProductCarouselImg2('');
        setProductCarouselImg3('');
        setProductSizes([]);
        setProductGender('');
        setProductCategory('');
        setProductNewCategory('');
        setProductPrice(0);
        setProductDiscount(0);

        navigate('/all-products');
      }
    )
  }


  return (
    <div className="new-product-page">
        <div className="new-product-container">
          <h3>Update Product</h3>

          <div className="new-product-body">

            <span>
              <div className="form-floating mb-3 span-21">
                <input type="text" className="form-control" id="floatingNewProduct1" value={productName} onChange={(e)=>setProductName(e.target.value)} />
                <label htmlFor="floatingNewProduct1">Product name</label>
              </div>
              <div className="form-floating mb-3 span-22">
                <input type="text" className="form-control" id="floatingNewProduct2" value={productDescription} onChange={(e)=>setProductDescription(e.target.value)} />
                <label htmlFor="floatingNewProduct2">Product Description</label>
              </div>
            </span>

            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingNewProduct1" value={productMainImg} onChange={(e)=>setProductMainImg(e.target.value)}/>
              <label htmlFor="floatingNewProduct1">Thumbnail Img url</label>
            </div>

            <span>
              <div className="form-floating mb-3 span-3">
                <input type="text" className="form-control" id="floatingNewProduct2" value={productCarouselImg1} onChange={(e)=>setProductCarouselImg1(e.target.value)}/>
                <label htmlFor="floatingNewProduct2">Add on img1 url</label>
              </div>
              <div className="form-floating mb-3 span-3">
                <input type="text" className="form-control" id="floatingNewProduct2" value={productCarouselImg2} onChange={(e)=>setProductCarouselImg2(e.target.value)}/>
                <label htmlFor="floatingNewProduct2">Add on img2 url</label>
              </div>
              <div className="form-floating mb-3 span-3">
                <input type="text" className="form-control" id="floatingNewProduct2" value={productCarouselImg3} onChange={(e)=>setProductCarouselImg3(e.target.value)} />
                <label htmlFor="floatingNewProduct2">Add on img3 url</label>
              </div>
            </span>

            <section>
              <h4>Available Size</h4>

              <span>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="S" checked={productSizes.includes('S')} onChange={handleCheckBox} id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    S
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="M" checked={productSizes.includes('M')} onChange={handleCheckBox} id="flexCheckChecked" />
                  <label className="form-check-label" htmlFor="flexCheckChecked">
                    M
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="L" checked={productSizes.includes('L')} onChange={handleCheckBox} id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    L
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="XL" checked={productSizes.includes('XL')} onChange={handleCheckBox} id="flexCheckChecked" />
                  <label className="form-check-label" htmlFor="flexCheckChecked">
                    XL
                  </label>
                </div>
              </span>
            </section>

            <section>
              <h4>Gender</h4>
              <span>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="productGender" value="Men" checked={productGender==='Men'} id="flexRadioDefault1" onChange={(e)=> setProductGender(e.target.value)} />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Men
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="productGender" value="Women" checked={productGender==='Women'} id="flexRadioDefault2" onChange={(e)=> setProductGender(e.target.value)}/>
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Women
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="productGender" value="Unisex" checked={productGender==='Unisex'} id="flexRadioDefault2" onChange={(e)=> setProductGender(e.target.value)}/>
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Unisex
                  </label>
                </div>
              </span>
            </section>


            <span>
              <div className="form-floating mb-3 span-3">
                <select className="form-select" id='floatingNewProduct5' aria-label="Default select example" value={productCategory} onChange={(e)=>setProductCategory(e.target.value)}>
                  <option value="">Choose Product category</option>
                  {AvailableCategories.map((category)=>{
                    return(
                        <option value={category}>{category}</option>
                    )
                  })}
                  <option value="new category">New category</option>
                </select>
                <label htmlFor="floatingNewProduct5">Category</label>
              </div>
              <div className="form-floating mb-3 span-3">
                <input type="number" className="form-control" id="floatingNewProduct6" value={productPrice} onChange={(e)=>setProductPrice(e.target.value)}/>
                <label htmlFor="floatingNewProduct6">Price</label>
              </div>
              <div className="form-floating mb-3 span-3">
                <input type="number" className="form-control" id="floatingNewProduct7" value={productDiscount} onChange={(e)=>setProductDiscount(e.target.value)}/>
                <label htmlFor="floatingNewProduct7">Discount (in %)</label>
              </div>
            </span>

            {productCategory === 'new category' ?
               <div className="form-floating mb-3">
               <input type="text" className="form-control" id="floatingNewProduct8" value={productNewCategory} onChange={(e)=>setProductNewCategory(e.target.value)}/>
               <label htmlFor="floatingNewProduct8">New Category</label>
           </div>
            :
                  ""
            }
           

          </div>

          <button className='btn btn-primary' onClick={handleUpdateProduct}>Update</button>
        </div>
    </div>
  )
}

export default UpdateProduct