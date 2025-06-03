import axios from "axios";

/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
export const ApiUserList = async () => {
    const res = await axios.get("http://localhost:8081/api/user/list");
    return res.data;
};

export const ApiUserRegister = async (data) => {
    const res = await axios.post("http://localhost:8081/api/user/admin/register", data,
        {
            withCredentials: true
        }
    )
    return res
}

export const ApiUserLogin = async (data) => {
    const res = await axios.post("http://localhost:8081/api/user/admin/login", data,
        {
            withCredentials: true
        }
    )
    return res
}

export const ApiUserLogout = async () => {
    const res = await axios.post("http://localhost:8081/api/user/logout")
    return res.data
}

export const ApiUserDetail = async (id) => {
    const res = await axios.get(`http://localhost:8081/api/user/detail/${id}`);
    return res.data;
};








// API PHOTO --------------------------------------------------------------------

export const ApiPhotosOfUser = async (id) => {
    const res = await axios.get(`http://localhost:8081/api/photosOfUser/${id}`);
    return res.data;
};

export const ApiPhotosOfUserAll = async () => {
    const res = await axios.get(`http://localhost:8081/api/photosOfUser/list`);
    return res.data;
};

export const ApiPhotosOfUserPostComment = async (photo_id, comment, user_id) => {
    const res = await axios.post(`http://localhost:8081/api/photosOfUser/commentsOfPhoto/${photo_id}`,{comment,user_id})
    return res
}

export const ApiPhotosOfUserAddPhoto = async (user_id,file_name) => {
    const res = await axios.post(`http://localhost:8081/api/photosOfUser/addPhoto/${user_id}`, {file_name});
    return res;
};
