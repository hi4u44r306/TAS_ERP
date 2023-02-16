import React, { useEffect, useState } from 'react';
import './SearchPage.scss';
import { useSelector } from "react-redux";
import products from '../../db/products';

const SearchPage = () => {
    const { search } = useSelector(state => state.productReducers);
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        setSearchResult(products.filter((i) => (
            (i.title.toLowerCase().startsWith(search))
            ||
            (i.description.toLowerCase().startsWith(search))
            ||
            (i.name.toLowerCase().startsWith(search))
            ||
            (i.type.toLowerCase().startsWith(search))
        )));
    }, [search]);
    return (
        <div>
            {
                (search === "" || search === null)
                    ?
                    <div className={"Search"}>
                        Not thing
                    </div>
                    :
                    <div className={"Search-result"}>
                        {
                            searchResult.length === 0
                                ?
                                <div className={"Search-fallback"}>
                                    找不到 {search} 或是 {search} 正在建構中...
                                </div>
                                :
                                searchResult.map((item) => (
                                    <div>{item.id}</div>
                                ))
                        }
                    </div>
            }
        </div>
    );
}

export default SearchPage;