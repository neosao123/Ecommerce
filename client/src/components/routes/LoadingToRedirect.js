
import { useState, useEffect } from "react";
import React  from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
    const [count, setCount ] = useState(5)
    let navigate = useNavigate()
    
    useEffect(()=>{

        const interval = setInterval(()=>{
            setCount((currentCount) => --currentCount)
        },1000)
        //redirect one count is equal to 0
        count === 0 && navigate('/');
        //cleanup
        return () => clearInterval(interval);

    },[count])

    return(
        <div className="" style={{height: "75vh"}}>
            <div className="container w-100 h-100 d-flex justify-content-center align-items-center align-content-center text-center p-5">
                <h4>Loading.....</h4>
            </div>
        </div>
    )
}

export default LoadingToRedirect;