import styles from './Shop.module.css'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import { useEffect } from 'react'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




let cardsItems = [];
let filteredData = [];
let newData = [];

export default function Shop(){
    
    const { category } = useParams();
    const [data, setData] = useState(null);
    
    let activeLink = category;

    const [priceFilter, setPriceFilter] = useState('');

    const [ratingFilter, setRatingFilter] = useState('');

    const handlePriceChange = (event) => {
        setRatingFilter('DefaultRa')
        setPriceFilter(event.target.value);
    };

    const handleRatingChange = (event) => {
        setPriceFilter('DefaultPr')
        setRatingFilter(event.target.value);
    };

    useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          'https://fakestoreapi.com/products',
        )
      ).json();

      setData(data);
      console.log(data);
    };

    dataFetch();
    
    
    }, []);

    
    if(data != null){
        newData = [...data];
        if(priceFilter == 'HighToLowPr'){
            newData = newData.sort((a, b) => {
                if(b.price == a.price){
                    return b.rating.count - a.rating.count
                }
                return b.price - a.price}
            );
        }
        if(priceFilter == 'LowToHighPr'){
            newData = newData.sort((a, b) => {
                if(b.price == a.price){
                    return b.rating.count - a.rating.count
                }
                return a.price - b.price}
            );
        }
        if(ratingFilter == 'HighToLowRa'){
            newData = newData.sort((a, b) => {
                if(b.rating.rate == a.rating.rate){
                    return b.rating.count - a.rating.count
                }
                return b.rating.rate - a.rating.rate}
            );
        }
        if(ratingFilter == 'LowToHighRa'){
            newData = newData.sort((a, b) => {
                if(a.rating.rate == b.rating.rate){
                    return b.rating.count - a.rating.count
                }
                return a.rating.rate - b.rating.rate}
            );
        }
        switch(category){
            case "electronics":
                filteredData = newData.filter(item =>
                    item.category == "electronics"
                )
                cardsItems = filteredData.map(item => 
                    <Card key ={item.id} item = {item}/>
                ) 
                break;
            case "jewelery":
                filteredData = newData.filter(item =>
                    item.category == "jewelery"
                )
                cardsItems = filteredData.map(item => 
                    <Card key ={item.id} item = {item}/>
                ) 
                break;
            case "men's-clothing":
                filteredData = newData.filter(item =>
                    item.category == "men's clothing"
                )
                cardsItems = filteredData.map(item => 
                    <Card key ={item.id} item = {item}/>
                ) 
                break;
            case "women's-clothing":
                filteredData = newData.filter(item =>
                    item.category == "women's clothing"
                )
                cardsItems = filteredData.map(item => 
                    <Card key ={item.id} item = {item}/>
                ) 
                break;  
            default:
                cardsItems = newData.map(item => 
                    <Card key ={item.id} item = {item}/>
                )
        }
    }
    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.separation}>
                    <div className={styles.sidebar}>
                        <div className={styles.categories_title}>Categories</div>
                        <ul className={styles.list_categories}>
                            <Link  to= "/shop"  className={`${styles.list_item} ${activeLink == undefined ? styles.active : ''}`}>All</Link>
                            <Link  to= "/shop/electronics" className={`${styles.list_item} ${activeLink == "electronics" ? styles.active : ''}`}>Electronics</Link>
                            <Link  to= "/shop/jewelery" className={`${styles.list_item} ${activeLink == "jewelery" ? styles.active : ''}`}>Jewellery</Link>
                            <Link  to= "/shop/men's-clothing" className={`${styles.list_item} ${activeLink == "men's-clothing" ? styles.active : ''}`}>Men&apos;s Clothing</Link>
                            <Link  to= "/shop/women's-clothing" className={`${styles.list_item} ${activeLink == "women's-clothing" ? styles.active : ''}`}>Women&apos;s Clothing</Link>
                        </ul>
                        <div style={{paddingTop: "2rem"}} className={styles.categories_title}>Sort By</div>
                        <Box sx={{ minWidth: 120, width: "80%", margin: "0 auto 16px 16px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Price</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={priceFilter}
                                label="Age"
                                onChange={handlePriceChange}
                                >
                                <MenuItem value={'DefaultPr'}>Default</MenuItem>
                                <MenuItem value={'HighToLowPr'}>Highest to Lowest</MenuItem>
                                <MenuItem value={'LowToHighPr'}>Lowest to Highest</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120, width: "80%", margin: "0 auto 0 16px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Ratings</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={ratingFilter}
                                label="Age"
                                onChange={handleRatingChange}
                                >
                                <MenuItem value={'DefaultRa'}>Default</MenuItem>
                                <MenuItem value={'HighToLowRa'}>Highest to Lowest</MenuItem>
                                <MenuItem value={'LowToHighRa'}>Lowest to Highest</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    
                        {data == null ? <div className={styles.spinner_container}>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress size="3rem" style ={{marginLeft: "5rem"}} />
                        </Box>
            </div> :   
                        <div className={styles.shoppingPage}>
                          {cardsItems}
                        </div>}
                    
                </div>
            </div>
        </div>
    )
}