import axios from "axios";

const API_URL = "http://localhost:5289/api/";

const user = JSON.parse(localStorage.getItem('user'));

const getPublicContent = () => {
    return axios.get(API_URL + "todo", {headers: {
        Authorization:
            'Bearer ' + user.token
}});

};

const getProfessorBoard = async () => {
    return await axios.get(API_URL + "todo", {
        headers: {
            Authorization:
                'Bearer ' + user.token
        }
    });
};

const UserService = {
    getPublicContent,
    getProfessorBoard
};

export default UserService;