import { Outlet } from "react-router-dom";
import FixedBottomNavigation from "./bottombar";
import ResponsiveAppBar from "./navbar";

function Layout() {
    return(
        <>
        <ResponsiveAppBar />
        <Outlet />
        <FixedBottomNavigation />
        </>
    )
}