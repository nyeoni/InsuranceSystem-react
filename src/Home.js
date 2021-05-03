import React,{useState, useEffect} from 'react'
import apiAxios from "./apiAxios";

function Home() {
    const [time,setTime]=useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    function TimeToPrint(time){
        setTime(time);
    }

    useEffect( () => {
            setTime(null);
            setError(null);
            setLoading(true);
            apiAxios('/time',TimeToPrint);
            setLoading(false);
        },[]
    )

    if(loading) return <div><h1>로딩중..</h1></div>
    if(error) return <div>에러발생</div>
    if(!time) return null;

    return(
        <div>
            <h3>
                현재시간: {time} 입니다.
            </h3>
        </div>
    )
}

export default Home;