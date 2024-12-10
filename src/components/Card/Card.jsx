import styles from './Card.module.css'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Stack } from '@mui/material';

let vertical = 'top';
let horizontal = 'left';

import { useOutletContext } from 'react-router-dom';

export default function Card({item}){

    const [open, setOpen] = useState(false);
    const context = useOutletContext();
    
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
        newCartItems.push({...item, count: 1});
        console.log(newCartItems);
        context[1](newCartItems);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

    setOpen(false);
  };
    return(
        <div className={styles.card}>
            <Tooltip 
            title="View product details" 
            arrow 
            slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -40],
                      },
                    },
                  ],
                },
              }}
            >
                <Link state={{ from: item }} style = {{textAlign : 'center'}} to = '/description'><img  src = {item.image}></img></Link>
            </Tooltip>
            <div className={styles.metaData}>
                <div className={styles.title}>{item.title}</div>
                <Box sx={{ width: 200, display: 'flex', alignItems: 'end' }}>
                    <Rating style = {{marginTop : '0.5rem'}} name="half-rating-read" value= {item.rating.rate} defaultValue={2.5} precision={0.1} readOnly />
                    <Box sx={{ ml: 1, marginBottom: '3px' }}>({item.rating.count})</Box>
                </Box> 
            </div>
            <div className={styles.rows}>
                <div className={styles.counter}>
                    <button onClick={()=>handleClick(item)} className={styles.addToCart}>Add to Cart</button>
                </div>
                <div style = {{fontWeight:900}} className={styles.price}>Price: ${item.price}</div>
            </div>
            <Stack direction="row" spacing={2}>
                <Snackbar anchorOrigin={{ vertical , horizontal }} open={open} autoHideDuration={1650} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: '100%' }}
                        >
                        {item.title} Added to cart!
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}