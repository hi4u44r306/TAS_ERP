import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByCategory } from '../../store/categorySlice';
import { useParams, Link } from 'react-router-dom';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import "./CategoryPage.scss";
import ProductList from '../../components/ProductList/ProductList';

const CategoryPage = ({ products }) => {
    const typeOfPlaylist = window.location.pathname.substring(10);
    const dispatch = useDispatch();
    const { id } = useParams();

    const { isModalVisible } = useSelector((state) => state.modal);


    // const {catProductSingle: products, catProductSingleStatus: status} = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchProductsByCategory(id, 'single'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="category-page">
            {isModalVisible && <SingleProduct />}

            <div className="container">
                <div className="breadcrumb">
                    <ul className="breadcrumb-items flex">
                        <li className="breadcrumb-item">
                            <Link to="/">
                                <i className="fas fa-home"></i>
                                <span className="breadcrumb-separator">
                                    <i className="fas fa-chevron-right"></i>
                                </span>
                            </Link>
                        </li>
                        {/* <li>
                            Category
                            <span className="breadcrumb-separator">
                                <i className="fas fa-chevron-right"></i>
                            </span>
                        </li> */}
                        <li>
                            {typeOfPlaylist}
                        </li>
                    </ul>
                </div>
            </div>
            <ProductList />
            {/* {
          products.map((product) =>(
            product.type === typeOfPlaylist &&
            <div className='product-item bg-white' key = {product.id} onClick = {() => viewModalHandler(product)}>
              <div className='product-item-img'>
              <img src={require("../../assets/images"+product.images)} alt = "" />
                  <img src = {product.images[0]} alt = "" />
                  <div className = "product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">{product.category.name}</div>
              </div>
              <div className='product-item-body'>
                  <h6 className = "product-item-title text-pine-green fw-4 fs-15">{product.title}</h6>
                  <div className = "product-item-price text-regal-blue fw-7 fs-18">{formatPrice(product.price)}</div>
              </div>
          </div>
          ))
        } */}
        </div>
    )
}

export default CategoryPage
