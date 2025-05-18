import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import * as fetchModel from "../../lib/fetchModelData";

function UserComments() {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetchModel.ApiPhotosOfUserAll(); 
        const photos = res.photos;

        const userComments = [];

        photos.forEach((photo) => {
          (photo.comments || []).forEach((comment) => {
            if (comment.user_id === userId) {
              userComments.push({
                comment: comment.comment,
                date_time: comment.date_time,
                photo_id: photo._id,
                photo_file: photo.file_name,
              });
            }
          });
        });

        setComments(userComments);
      } catch (err) {
        console.error("Lỗi khi lấy bình luận người dùng:", err);
      }
    }

    fetchComments();
  }, [userId]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Comments by User
      </Typography>
      <Grid container spacing={2}>
        {comments.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              sx={{ display: "flex", cursor: "pointer" }}
            >
              <CardMedia
                component="img"
                sx={{ width: 160 }}
                image={`/images/${item.photo_file}`}
                alt="thumbnail"
              />
              <CardContent>
                <Typography variant="body1">{item.comment}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(item.date_time).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default UserComments;
