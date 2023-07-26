import { useDispatch, useSelector } from "react-redux";
import { cartActions, cartSelector } from "../redux/reducers/cartReducer";

const dispatch = useDispatch();

const { cart } = useSelector(cartSelector);

export const addToCart = (product) => {
    if (!cart) {
      let success_msg = "Product Added To Cart";
      dispatch(cartActions.createCart({ product, success_msg }))
    } else {
      let items = cart.items;
      let totalPrice = cart.totalPrice + product.price;
      let success_msg = null;
      let index = items.findIndex((item) => item.id === product.id);
      if (index === -1) {
        items = [{ ...product, qty: 1 }, ...items];
        success_msg = "Product Added To Cart";
      } else {
        items[index].qty++;
      }
      dispatch(updateCart({ items, totalPrice, success_msg }));
    }
  };
  
  export const decreaseQty = (product) => {
    let items = cart.items;
    let totalPrice = cart.totalPrice - product.price;
    let success_msg = null;
    let index = items.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      items[index].qty--;
      if (items[index].qty === 0) {
        items.splice(index, 1);
        success_msg = "Product Removed From Cart";
      }
      dispatch(updateCart(items, totalPrice, success_msg));
    }
  };
  
  export const removeFromCart = (product) => {
    let items = cart.items;
    let totalPrice = cart.totalPrice - product.price * product.qty;
    let success_msg = null;
    let index = items.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      items.splice(index, 1);
      success_msg = "Product Removed From Cart";
      dispatch(updateCart(items, totalPrice, success_msg));
    }
  };
  
  export const isItemInCart = (id) => {
    // console.log(cart, cart.items);
    if (!cart) {
      return false;
    }
    let items = cart.items;
    let index = items.findIndex((item) => item.id === id);
    return index !== -1;
  };
  