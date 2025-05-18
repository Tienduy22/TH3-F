import React from "react";
import { 
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import * as fetchModel from "../../lib/fetchModelData"
import "./styles.css";
import {useParams, Link} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const { userId } = useParams();
    const [photos,setPhoto] = useState();
    const [user,setUser] = useState();

    useEffect(() => {
      const fetchPhotos = async () => {
        const res = await fetchModel.ApiPhotosOfUser(userId)
        setPhoto(res.photos)
        setUser(res.user)
      }
      fetchPhotos()
    })

    if (!user) {
      return <Typography variant="h6">User not found</Typography>;
    }

    if (!photos || photos.length === 0) {
      return (
        <Typography variant="h6">
          No photos found for {user.last_name}
        </Typography>
      );
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Photos of {user.last_name}
        </Typography>
        {photos.map((photo) => (
          <Card key={photo._id} sx={{ mb: 3 }}>
            <CardMedia
              component="img"
              height="300"
              image={`/images/${photo.file_name}`}
              alt="User photo"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                <strong>Created:</strong> {formatDate(photo.date_time)}
              </Typography>
              {photo.comments && photo.comments.length > 0 ? (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6">Comments</Typography>
                  <List>
                    {photo.comments.map((comment) => (
                      <ListItem key={comment._id}>
                        <ListItemText
                          primary={
                            <>
                              <Link to={`/users/${comment.user_id}`}>
                                {user.last_name}
                              </Link>{" "}
                              - {formatDate(comment.date_time)}
                            </>
                          }
                          secondary={comment.comment}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  No comments
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    );
}

export default UserPhotos;
