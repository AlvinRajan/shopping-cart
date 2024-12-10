import styles from './Header.module.css'
import React from 'react';
import { FaShoppingBasket } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

let vertical = 'top';
let horizontal = 'left';

export default function Header(){

    const [data, setData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [removeItem, setRemoveItem] = useState('');

    const navigate = useNavigate();

    function handleClose(){
        setOpen(false);
    }

    function handleRemove(item){
        let newItems = [...cartItems];
        newItems = newItems.filter((cItem)=>{
            return cItem != item
        })
        setCartItems(newItems);
        setOpen(true);
        setRemoveItem(item.title)
    }

    function handleAddClick(item){
        let newItems = [...cartItems];
        newItems = newItems.map((itemC)=>{
            if(itemC.id == item.id){
                return {...itemC, count: itemC.count + 1}
            }
            return itemC;
        })
        setCartItems(newItems);
    }

    function handleSubtractClick(item){
        if(item.count >1){
            let newItems = [...cartItems];
            newItems = newItems.map((itemC)=> {
                if(itemC.id == item.id){
                    return {...itemC, count: itemC.count - 1}
                }
                return itemC;
            })
            setCartItems(newItems);
        }
    }

    function handleSubmit(){
        setCartItems([]);
        setOpen(true);
        setRemoveItem(`Order of total $${(Math.round(cartItems.reduce((accumulator, item) => {return accumulator += (item.count * item.price);}, 0))*100)/100} Confirmed. All items`)
    }

    const listItems = cartItems.map(item =>
        <li key= {item.id} >
            <div className={styles.cartCard}>
                <div className={styles.title}>{item.title}</div>
                <Link state={{ from: item}} style= {{textAlign : 'center'}} to= '/description'><img src= {item.image}></img></Link>
                <div className={styles.box}>
                    <div className={styles.counter}>
                        <button className={styles.minus} onClick={()=>handleSubtractClick(item)}>-</button>
                        <div className={styles.count}>{item.count}</div>
                        <button className={styles.add} onClick={()=>handleAddClick(item)}>+</button>
                    </div>
                    <button onClick={()=>handleRemove(item)} className={styles.remove}>Remove from cart</button>
                    <div className={styles.price}>${item.price}</div>
                </div>
            </div>
        </li>
    );
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setIsOpen(open);
      };
  
    return (
        <>
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Link to="/" className={styles.navTitle}>UR Shope</Link>
                <div className={styles.navMid}>
                    <Link to="/" className={styles.homeBtn}>Home</Link>
                    <Link to="/shop" className={styles.shopBtn}>Shop</Link>
                </div>
                <div className={styles.navEnd}>
                    <button onClick={toggleDrawer(true)} className={styles.basketBtn}>
                        <FaShoppingBasket />
                        <div>({cartItems.reduce((accumulator ,item) => {return accumulator += item.count;}, 0)})</div>  
                    </button>
                </div>
            </div>
        </div>
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={toggleDrawer(false)} 
        >
            <div className={styles.drewer}>
                <div className={styles.header}>Your Cart ({cartItems.reduce((accumulator , item) => {return accumulator += item.count;}, 0)})</div>
                <hr></hr>
                {cartItems.length > 0 ?
                <ul style={{listStyle: 'none'}}>
                    {listItems}
                    <button onClick={handleSubmit} className={styles.checkout}>Checkout Total ${(Math.round(cartItems.reduce((accumulator ,item) => {return accumulator += (item.count * item.price);},0))*100)/100}</button>
                </ul>
                : <div className={styles.empty}>Cart is empty. Start by adding items to the cart!</div>}
              </div>
        </Drawer>
        <Snackbar anchorOrigin={{ vertical , horizontal }} open={open} autoHideDuration={1850} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: '100%' }}
                        >
                        {removeItem} removed from cart!
                    </Alert>
        </Snackbar>
        < Outlet context={[cartItems, setCartItems]}/>
        </> 
    )
}