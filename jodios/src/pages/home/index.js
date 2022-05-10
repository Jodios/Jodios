import React from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const doSomething = (event) => {
        console.log("Hello");
        navigate('/testing');
    }

    return(
        <div className="App">
            <p id="message">
                will be back...
                <button onClick={doSomething}>Testing</button>
            </p>
        </div>
    )

}

export default Home