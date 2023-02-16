import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import { fetchCategories } from '../../store/categorySlice';
import "./HomePage.scss";

const HomePage = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    // dispatch(fetchProductsByCategory(1, 'all'));
    // dispatch(fetchProductsByCategory(2, 'all'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-page">
      {/* <Slider />
      <AllProducts /> */}
      {/* <section>
        { productsByCategory[0] && <SingleCategory products = {productsByCategory[0]} status = {catProductAllStatus} /> }
      </section> */}
      {/* <section>
        { productsByCategory[1] && <SingleCategory products = {productsByCategory[1]} status = {catProductAllStatus} /> }
      </section> */}
    </div>
  )
}

export default HomePage;