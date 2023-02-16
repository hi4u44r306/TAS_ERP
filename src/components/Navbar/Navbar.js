import React, { useState, useEffect } from 'react';
import "./Navbar.scss";
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import { getCartTotal } from '../../store/cartSlice';
// import SearchBar from '../Searchbar/Searchbar';

const Navbar = () => {
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="navbar">
      <div className='navbar-content'>
        <div className="container">
          <div className="navbar-top flex flex-between">
            <Link to="/" className="navbar-brand">
              {/* <span className="text-regal-blue">S</span><span className='text-gold fs-20'> & </span><span className="text-regal-blue">V</span> */}
              <span className="text-gold">Taoyuan </span>
              <span className="text-regal-blue">After School Care</span>
            </Link>


          </div>
        </div>

        <div className='navbar-bottom'>
          <div className='container flex'>
            <ul className={`nav-links flex ${isSidebarOpen ? 'show-nav-links' : ""}`}>
              <button type="button" className='navbar-hide-btn text-white' onClick={() => setIsSidebarOpen(false)}>
                <i className='fas fa-times'></i>
              </button>
              {/* {
                categories.map(category => (
                  <li key={category.id}>
                    <NavLink to={`/category/${category.id}`} className="nav-link" onClick={() => setIsSidebarOpen(false)}>{category.name}</NavLink>
                  </li>
                ))
              } */}
              <li>
                <NavLink to="/payrecord" className="nav-link">
                  {/* <i className="fa fa-user"></i> */}
                  <div>繳費紀錄</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/qrscanner" className="nav-link">
                  {/* <i className="fa fa-user"></i> */}
                  <div>QR Code 掃描器</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="nav-link">
                  {/* <i className="fa fa-user"></i> */}
                  <div>帳戶</div>
                </NavLink>
              </li>
            </ul>

            <button type="button" className='navbar-show-btn text-gold' onClick={() => setIsSidebarOpen(true)}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </nav >
  )
}

export default Navbar;