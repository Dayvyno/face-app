import React from "react";
import "./imageFormLink.css";

class ImageFormLink extends React.Component{

    render(){
        const {submit, inputChange} = this.props
        return(
            <div style={{marginBottom:"5px"}}>
                <p>This Magic App detects the face of a person and creates a box around it</p>
                <div className="imgLinkContainer">
                    <div className="innerContainer">
                        <input type="text" name="input" id="imageUrlInput" onChange={inputChange} />
                        <button onClick={submit} >Detect</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageFormLink