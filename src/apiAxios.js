import axios from 'axios';

export default function apiAxios(url, callback, info) {
    axios(
        {
            url: '/api/' + url,
            method: 'post', // 나중에 post
            data: {
                id: info.id,
                password: info.password
            },
            // baseURL: 'https://608c26ef9f42b20017c3d801.mockapi.io',
            withCredentials: false,
        }
    ).then(function (response){
        console.log(response.data);
        callback(response.data);
    })
}