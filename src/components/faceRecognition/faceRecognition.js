import React from "react"
import "./faceRecognition.css"

class FaceRecognition extends React.Component{

  render(){

          return(
            <div className="faceWrapper">
                <div style={{position:"absolute"}}>
                    <img id="inputImage" src={this.props.pix} alt="" height="auto" width="500" />
                    {this.props.boxes.map((box, i)=>{
                    return <div className="bounding-box" key={i} style={{top:box.topRow, bottom:box.bottomRow, left:box.leftCol, right:box.rightCol}}></div>
                    })}
                </div>
            </div>
        )

  }
}

export default FaceRecognition





// import React from 'react';
// import './FaceRecognition.css';

// const FaceRecognition = ({ imageUrl, boxes }) => {
//   return (
//     <div className='center ma'>
//       <div className='absolute mt2'>
//         <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
//         {
//           boxes.map((box, i)=>{
//             return <div className='bounding-box' key={i} style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
//           })
//         }
//       </div>
//     </div>
//   );
// }

// export default FaceRecognition;