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
import * as fetchModel from "../../lib/fetchModelData";
import "./styles.css";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
    const { userId } = useParams();
    const [photos, setPhoto] = useState();
    const [user, setUser] = useState();
    const [newComments, setNewComments] = useState({});
    const token = Cookies.get("token");
    const user_id = jwtDecode(token).id;

    const fetchPhotos = async () => {
        const res = await fetchModel.ApiPhotosOfUser(userId);
        console.log(res)
        setPhoto(res.photos);
        setUser(res.user);
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const handleCommentChange = (e) => {
        setNewComments(e.target.value);
    };

    const handleAddComment = async (photoId) => {
        await fetchModel.ApiPhotosOfUserPostComment(
            photoId,
            newComments,
            user_id
        );
        fetchPhotos();
    };

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
        <Box
            sx={{
                p: 3,
                maxWidth: 900,
                margin: "40px auto",
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: 700,
                    color: "#333",
                    borderBottom: "3px solid #1976d2",
                    pb: 1,
                    mb: 3,
                }}
            >
                Photos of {user.last_name}
            </Typography>

            {photos.map((photo) => (
                <Card
                    key={photo._id}
                    sx={{
                        mb: 3,
                        borderRadius: 2,
                        boxShadow: "0 3px 10px rgba(25, 118, 210, 0.15)",
                        transition: "box-shadow 0.3s ease",
                        "&:hover": {
                            boxShadow: "0 8px 30px rgba(25, 118, 210, 0.3)",
                        },
                    }}
                >
                    <CardMedia
                        component="img"
                        image={
                            photo.file_name?.startsWith("http")
                                ? photo.file_name
                                : `/images/${photo.file_name}`
                        }
                        alt="User photo"
                        sx={{
                            objectFit: "contain",
                            width: "100%",
                            maxHeight: 400,
                            background: "#f5f5f5",
                        }}
                    
                    />
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontStyle: "italic" }}
                        >
                            <strong>Created:</strong>{" "}
                            {formatDate(photo.date_time)}
                        </Typography>

                        <Box sx={{ mt: 2 }}>
                            {photo.comments && photo.comments.length > 0 ? (
                                <>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: 1,
                                            color: "#1976d2",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Comments
                                    </Typography>
                                    <List
                                        sx={{
                                            maxHeight: 500,
                                            overflowY: "auto",
                                            bgcolor: "#f9f9f9",
                                            borderRadius: 1,
                                            padding: 1,
                                        }}
                                    >
                                        {photo.comments.map((comment) => (
                                            <ListItem
                                                key={comment._id}
                                                sx={{
                                                    borderBottom:
                                                        "1px solid #ddd",
                                                    paddingY: 1,
                                                    "&:last-child": {
                                                        borderBottom: "none",
                                                    },
                                                }}
                                            >
                                                <ListItemText
                                                    primary={
                                                        <>
                                                            <Link
                                                                to={`/users/${comment.user_id}`}
                                                            >
                                                                {comment.userName}
                                                            </Link>{" "}
                                                            -{" "}
                                                            {formatDate(
                                                                comment.date_time
                                                            )}
                                                        </>
                                                    }
                                                    secondary={comment.comment}
                                                    primaryTypographyProps={{
                                                        fontWeight: 600,
                                                        color: "#0d47a1",
                                                    }}
                                                    secondaryTypographyProps={{
                                                        color: "#555",
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            ) : (
                                <Typography
                                    variant="body2"
                                    sx={{ fontStyle: "italic", color: "#999" }}
                                >
                                    No comments
                                </Typography>
                            )}

                            {/* Ô nhập comment */}
                            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                                <textarea
                                    type="text"
                                    placeholder="Add a comment..."
                                    onChange={handleCommentChange}
                                    style={{
                                        flexGrow: 1,
                                        padding: "8px 12px",
                                        borderRadius: 4,
                                        border: "1px solid #ccc",
                                        fontSize: 14,
                                        height: 80,
                                    }}
                                />
                                <button
                                    onClick={() => handleAddComment(photo._id)}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#1976d2",
                                        border: "none",
                                        borderRadius: 4,
                                        color: "white",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                        fontSize: 14,
                                        height: 40,
                                    }}
                                >
                                    Post
                                </button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default UserPhotos;
