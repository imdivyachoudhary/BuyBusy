import { useEffect } from "react";
import styles from "./Cart.module.css";
import { useCartContext } from "../../context/CartContext";
import CartItem from "./CartItem";
import Loader from "../Loader/Loader";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { isLoggedIn,cookie } = useAuthContext();
  const { cart, loading, orderPlaced, placeOrder } = useCartContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie.user) {
      navigate("/");
    }
  },[]);

  useEffect(() => {
    if (!cookie.user) {
      navigate("/");
    }
  },[isLoggedIn]);

  useEffect(() => {
    if (orderPlaced) {
      navigate("/orders");
    }
  },[orderPlaced]);

  return (
    <div className={styles.Cart}>
      {loading ? (
        <Loader />
      ) : cart ? (
        cart.items.length === 0 ? (
          <div
            style={{
              width: "100%",
              marginTop: "100px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1>Your Cart is Empty!!!</h1>
          </div>
        ) : (
          <>
            <div className={styles.CartHeader}>
              <div className={styles.TotalPrice}>
                <h1>Total</h1>
                <h1>Rs. {cart.totalPrice.toFixed(2)}</h1>
              </div>
              <div className={styles.OrderButton}>
                <button onClick={()=>placeOrder(cart.id)}>Confirm Order</button>
              </div>
            </div>
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </>
        )
      ) : (
        <div
          style={{
            width: "100%",
            marginTop: "100px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1>Your Cart is Empty!!!</h1>
        </div>
      )}
    </div>
  );
}

export default Cart;
