import styles from "./Navbar.module.css";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import { Outlet } from "react-router-dom";

function Navbar() {
    return (
        <>
        <div className={styles.Navbar}>
            <div className={styles.Logo}>BuyBusy</div>
            <SearchBar />
            <Menu />
        </div>
        <Outlet />
        </>
    )
}

export default Navbar;