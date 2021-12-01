import React from "react";
import "./logo.css"
import Tilt from 'react-tilt'

class Logo extends React.Component{

    render(){
        return(
                <Tilt className="Tilt contain" options={{ max : 60 }} style={{ height: 200, width: 200 }} >
                    <div className="Tilt-inner">              
                        <img className="imgLogo" src="https://comps.canstockphoto.com/simple-human-brain-logo-eps-vector_csp90391244.jpg" 
                        alt="brain" height="200px" width="200px" />
                    </div>
                </Tilt>
        )
    }
}

export default Logo