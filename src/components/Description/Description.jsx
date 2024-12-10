import styles from './Description.module.css'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import Rating  from '@mui/material/Rating';
import Box  from '@mui/material/Box';

import Snackbar from '@mui/material/Snackbar';
import Alert  from '@mui/material/Alert';

let vertical = 'top';
let horizontal = 'right';

export default function Description(){

    const [open, setOpen] = useState(false);
    const context = useOutletContext();

    const location = useLocation()
    const { from } = location.state

    const handleClick = (item) => {
        setOpen(true);
        let newCartItems = [...context[0]]
        console.log(item);
        console.log(newCartItems);
         
        let checkArray = newCartItems.filter((itemC)=>{
            return itemC.id == item.id;
        })
        if(checkArray.length > 0){
            console.log('ok')
            newCartItems = newCartItems.map((obj)=>{
                if(obj.id == item.id){
                    return {...obj, count: obj.count + 1}
                }
                return obj;
            })
            context[1](newCartItems);
            console.log('inside');
            return;
        }
        newCartItems.push({...item,  count: 1});
        console.log(newCartItems);
        context[1](newCartItems);
    };

    const handleClose = (event, reson) => {
        if (reson === 'clickaway'){
            return;
        }
        setOpen(false);
    };

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img className={styles.image} src={from.image}></img>
                <div className={styles.text}>
                    <div className={styles.title}>{from.title}</div>
                    <div className={styles.counter}>
                        <button onClick={()=>handleClick(from)} className={styles.add}>Add to  Cart</button>
                    </div>
                    <Box sx={{width: 200, display: 'flex', alingItem: 'end'}}>
                        <Rating style={{marginTop : '0.5rem'}} name="half-rating-read" value={from.rating.rate} defaultValue={2.5} precision={0.1} readOnly />
                        <Box sx={{ml: 1, marginBottom: '3px'}}>({from.rating.count})</Box>
                    </Box> 
                    <div className={styles.price}>Price: ${from.price}</div>
                    <div className={styles.description}>
                        <div className={styles.descriptionTitle}>Description : </div>
                        <div className={styles.descriptionText}>{from.description}</div>
                    </div>
                    <Link to="/shop" className={styles.back} >&larr; Go Back</Link>
                    <Snackbar anchorOrigin={{ vertical , horizontal}} open={open} autoHideDuration={1650} onClick={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity="success"
                            sx={{ width: '100%' }} 
                            >
                            {from.title}Added to  Cart
                        </Alert>
                    </Snackbar>
                </div>   
            </div>
        </div>
    )
}