import axios from 'axios';

export default function apiAxios(url, callback) {
    axios(
        {
            url: '/api' + url,
            method: 'post',
            data: {
                name: "김나연",
                age: "25"
            },
            //baseURL: 'http://hminsu.net/',
            withCredentials: false,
        }
    ).then(function (response){
        // console.log(response.data);
        // callback(response.data);
        callback("OK")
    })
}