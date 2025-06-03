import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouter";
import AppLayout from "./Pages/Layout";
import UserDetail from "./Pages/UserDetail";
import UserPhotos from "./Pages/UserPhotos";
import UserComments from "./Pages/UserComments";
import UserList from "./Pages/UserList";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route element={<PrivateRoute />}>
                        <Route path="users/:userId" element={<UserDetail />} />
                        <Route path="photos/:userId" element={<UserPhotos />} />
                        <Route
                            path="comments/:userId"
                            element={<UserComments />}
                        />
                        <Route path="users" element={<UserList />} />
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
