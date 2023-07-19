import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import styles from "./ProductsList.module.css";
import { useAuthContext } from "../../context/AuthContext";

function ProductItem({ product }) {
  const { isItemInCart, addToCart, removeFromCart } = useCartContext();
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      addToCart(product);
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className={styles.ProductItem}>
      <div className={styles.ProductImage}>
        <img alt={product.title} src={product.image} />
      </div>

      <div className={styles.ProductFooter}>
        <div className={styles.ProductDescription}>
          <h3>Rs. {product.price}</h3>
          <p>{product.title}</p>
        </div>
        <div className={styles.CartImage}>
          {isLoggedIn && isItemInCart(product.id) ? (
            <img
              alt="Remove from Cart"
              src="https://cdn-icons-png.flaticon.com/128/4715/4715132.png"
              onClick={() => removeFromCart(product)}
            />
          ) : (
            <img
              alt="Add to Cart"
              src="https://cdn-icons-png.flaticon.com/128/4715/4715128.png"
              onClick={() => handleAddToCart(product)}
            />
          )}
        </div>
        {/* <div className={styles.CartImage}><img alt="Remove from Cart" src="https://cdn-icons-png.flaticon.com/128/4715/4715132.png" /></div> */}
      </div>
    </div>
  );
}

export default ProductItem;
