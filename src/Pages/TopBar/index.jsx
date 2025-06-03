import { Button } from "antd";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import models from "../../modelData/models";
import Cookies from "js-cookie";
import "./styles.css";
import AddPhoto from "../AddPhoto";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
    const navigate = useNavigate();
    const userCookie = Cookies.get("user"); 
    const token = Cookies.get("token");

    const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("user");
        navigate("/login");
    };

    const handleLogin = () => {
        navigate("login");
    };
    const location = useLocation();

    const pathParts = location.pathname.split("/");
    const userIdIndex =
        pathParts.indexOf("users") + 1 || pathParts.indexOf("photos") + 1;
    const userId =
        userIdIndex && pathParts[userIdIndex] ? pathParts[userIdIndex] : null;

    const user = userId ? models.userModel(userId) : null;
    const userName = user ? `${user.last_name}` : "";
    let contextText;
    if (location.pathname.includes("/photos/")) {
        contextText = `Photos of ${userName}`;
    } else if (location.pathname.includes("/users/") && userId) {
        contextText = userName;
    } else {
        contextText = "Photo Sharing App";
    }

    return (
        <AppBar className="topbar-appBar">
            <Toolbar style={{ backgroundColor: "#FFEBCD" }}>
                {token && userCookie ? (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "right",
                        }}
                    >
                        <Typography variant="h6" color="black" sx={{ mr: 2 }}>
                            Hi {JSON.parse(userCookie).first_name}
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                        <AddPhoto prop={JSON.parse(userCookie)._id}/>
                    </div>
                ) : (
                    <Typography
                        variant="h6"
                        color="black"
                        style={{cursor:"pointer"}}
                        onClick={handleLogin}
                    >
                        Please Login
                    </Typography>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
