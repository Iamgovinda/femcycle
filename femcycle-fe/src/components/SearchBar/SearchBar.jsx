import React, { useState } from 'react';
import { Button } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styles from './SearchBar.module.scss';
import { Input } from '@mui/material';
import { get } from '../../API/axios';
import { useProductContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchText, setSearchText] = useState();
  // const {setProducts} = useProductContext();
  const navigate = useNavigate();


  const handleClick = () => {
    // navigate(`/products/${searchText}`);
    if (searchText) {
      navigate('/search', {
        state: {
          type: "search",
          text: searchText
        }
      })
    }
  }
  return (
    <div className={styles['parent']}>
      <Input type="text" disableUnderline={true} className={styles['txt']} onChange={(e) => setSearchText(e.target.value)} placeholder='Search Products' />
      <Button className={styles['btn']} onClick={() => handleClick()}><SearchOutlinedIcon sx={{ color: 'white !important' }} /></Button>
    </div>
  )
}

export default SearchBar