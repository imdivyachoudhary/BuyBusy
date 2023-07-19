import { useEffect } from "react";
import styles from "./FilterBox.module.css";
import { useProductContext } from "../../context/ProductContext";

function FilterBox() {
  const {
    categories,
    loadingCategories,
    inputPrice,
    setInputPrice,
    inputCategories,
    setInputCategories,
  } = useProductContext();

  const toggleInputCategory = (category) => {
    const index = inputCategories.findIndex((ele) => ele === category);
    if (index === -1) {
      setInputCategories([...inputCategories, category]);
    } else {
      setInputCategories((prev) => prev.splice(index, 1));
    }
  };

  return (
    <div className={styles.FilterBox}>
      <div className={styles.Header}>
        <h1>Filter</h1>
      </div>
      <div className={styles.Filter}>
        <h3 className={styles.FilterTopic}>Price : {inputPrice} </h3>
        <div className={styles.FilterTopic}>
          <input
            type="range"
            min="1"
            max="50000"
            value={inputPrice}
            onChange={(e) => {
              setInputPrice(e.currentTarget.value);
            }}
            style={{ width: "80%" }}
          />
        </div>
      </div>
      {!loadingCategories && (
        <div className={styles.Filter}>
          <h3 className={styles.FilterTopic}>Categories</h3>
          <div className={styles.FilterOptions}>
            {categories.map((category, index) => (
              <div key={index} className={styles.CheckBox}>
                <input
                  type="checkbox"
                  value={category}
                  name="inputCategories"
                  onChange={(e) => {
                    toggleInputCategory(category);
                  }}
                />
                {category}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterBox;
