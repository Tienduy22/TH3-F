import React, { useEffect, useState } from "react";
import {
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
    IconButton,
    Badge
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import * as fetchModel from "../../lib/fetchModelData";

function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [commentCountByUser, setCommentCountByUser] = useState({});

    useEffect(() => {
        async function fetchUsers() {
            try {
                const userList = await fetchModel.ApiUserList();
                setUsers(userList);
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        }

        async function fetchPhotos() {
            try {
                const res = await fetchModel.ApiPhotosOfUserAll();
                const allPhotos = res.photos;
                setPhotos(allPhotos);

                // Tính tổng số comment của từng user
                const counts = {};
                allPhotos.forEach((photo) => {
                    (photo.comments || []).forEach((comment) => {
                        const uid = comment.user_id;
                        counts[uid] = (counts[uid] || 0) + 1;
                    });
                });
                setCommentCountByUser(counts);
            } catch (error) {
                console.error("Failed to fetch photos", error);
            }
        }

        fetchUsers();
        fetchPhotos();
    }, []);

    return (
        <div>
            <Typography variant="body1">User:</Typography>
            <List component="nav">
                {users.map((user) => {
                    const photoCount = photos.filter(photo => photo.user_id === user._id).length;
                    const commentCount = commentCountByUser[user._id] || 0;

                    return (
                        <div key={user._id}>
                            <ListItem
                                secondaryAction={
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <Badge
                                            badgeContent={photoCount}
                                            color="success"
                                            sx={{ cursor: "default" }}
                                        />
                                        <IconButton
                                            onClick={() => navigate(`/comments/${user._id}`)}
                                            edge="end"
                                            aria-label="comments"
                                        >
                                            <Badge
                                                badgeContent={commentCount}
                                                color="error"
                                            />
                                        </IconButton>
                                    </Box>
                                }
                            >
                                <ListItemText
                                    primary={
                                        <Link
                                            to={`/users/${user._id}`}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit"
                                            }}
                                        >
                                            {`${user.last_name}`}
                                        </Link>
                                    }
                                    sx={{
                                        minWidth: "120px",
                                        maxWidth: "150px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }}
                                />
                            </ListItem>
                            <Divider />
                        </div>
                    );
                })}
            </List>
        </div>
    );
}

export default UserList;
