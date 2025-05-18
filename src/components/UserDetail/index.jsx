import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import "./styles.css";
import {useParams,Link} from "react-router-dom";
import * as fetchModel from "../../lib/fetchModelData"
import { useState } from "react";
import { useEffect } from "react";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const { userId } = useParams();
    const [user, setUser] = useState([]);
    
      useEffect(() => {
        async function fetchUsers() {
          try {
            const res = await fetchModel.ApiUserDetail(userId); 
            setUser(res);
          } catch (err) {
            console.error("Failed to fetch users", err);
          }
        }
        fetchUsers();
      }, []);

    if (!user) {
      return <Typography variant="h6">User not found</Typography>;
    }
    return (
      <Box sx={{ p: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {user.last_name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Location:</strong> {user.location}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Occupation:</strong> {user.occupation}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Description:</strong> {user.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/photos/${userId}`}
              sx={{ mt: 2 }}
            >
              View Photos
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
}

export default UserDetail;
