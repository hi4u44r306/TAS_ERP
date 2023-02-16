import React, { useRef, useState } from "react";
import './Searchbar.scss';
import { useDispatch } from "react-redux";
import { setSearch } from "../../actions/actions";
import { Link } from "react-router-dom";


const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value);
    };
    const searchRef = useRef();


    const dispatch = useDispatch();
    const searchLink = useRef();
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearch(searchQuery.toLowerCase()));
        if (searchQuery !== "")
            searchLink.current.click();
    };

    return (
        <div>
            <div onSubmit={handleSearch}>
                <Link to={"/category/search"} ref={searchLink} />
                <div className="searchcontainer">
                    <div className="serachinput">
                        <input
                            onSubmit={handleSearch}
                            name={"searchQuery"}
                            value={searchQuery}
                            onChange={handleSearchQuery}
                            ref={searchRef}
                            type="search"
                            placeholder="搜尋音軌..."
                            className="searchbar form-control"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SearchBar;