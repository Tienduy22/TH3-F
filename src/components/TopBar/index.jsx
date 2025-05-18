import React from "react";
import { AppBar, Toolbar, Typography, Box} from "@mui/material";
import { useLocation} from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
    const location = useLocation();

    const pathParts = location.pathname.split("/");
    const userIdIndex = pathParts.indexOf("users") + 1 || pathParts.indexOf("photos") + 1;
    const userId = userIdIndex && pathParts[userIdIndex] ? pathParts[userIdIndex] : null;

    const user = userId ? models.userModel(userId) : null;
    const userName = user ? `${user.last_name}` : "";
    console.log(userId)
    let contextText;
    if (location.pathname.includes("/photos/")) {
      contextText = `Photos of ${userName}`;
    } else if (location.pathname.includes("/users/") && userId) {
      contextText = userName;
    } else {
      contextText = "Photo Sharing App";
    } 
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" color="inherit">
              Ha Tien Duy
            </Typography>
          </Box>
          <Typography variant="h6" color="inherit">
            {contextText}
          </Typography>
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
