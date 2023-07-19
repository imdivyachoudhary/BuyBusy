import { useEffect } from "react";
import styles from "./Navbar.module.css";
import { useProductContext } from "../../context/ProductContext";

function SearchBar () {
  const {searchText, setSearchText} = useProductContext();

  return (
    <div className={styles.SearchBar}>
      <input
        type="text"
        placeholder="Search Product..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.currentTarget.value);
        }}
      ></input>
      {searchText.length===0 ? (
        <div className={styles.SearchImage}>
          <img
            alt="search"
            src="https://cdn-icons-png.flaticon.com/128/751/751381.png"
          />
        </div>
      ) : (
        <div className={styles.SearchImage} style={{ height: "20px" }}>
          <img
            alt="clear"
            src="https://cdn-icons-png.flaticon.com/128/1632/1632708.png"
            style={{cursor:"pointer"}}
            onClick={()=>{setSearchText("")}}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
