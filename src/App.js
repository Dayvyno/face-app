import './App.css';
import ImageFormLink from './components/imageFormLink/imageFormLink';
import Logo from './components/logo/logo';
import Navigation from './components/navigation/navigation';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';
import React from 'react';
import FaceRecognition from './components/faceRecognition/faceRecognition';
import SignIn from './components/signIn/signIn';
import Register from './components/register/register';

const particleOptions={
  "particles": {
      "number": {
          "value": 400,
          "density": {
              "enable": false
          }
      },
      "size": {
          "value": 3,
          "random": true,
          "anim": {
              "speed": 4,
              "size_min": 0.3
          }
      },
      "line_linked": {
          "enable": false
      },
      "move": {
          "random": true,
          "speed": 1,
          "direction": "top",
          "out_mode": "out"
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "bubble"
          },
          "onclick": {
              "enable": true,
              "mode": "repulse"
          }
      },
      "modes": {
          "bubble": {
              "distance": 250,
              "duration": 2,
              "size": 0,
              "opacity": 0
          },
          "repulse": {
              "distance": 400,
              "duration": 4
          }
      }
  }
}

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor(props){
    super();
    this.state= initialState
  }

  loadUser=(data)=>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onRouteChange = (route)=>{
    if(route==="signout"){
      this.setState(initialState)
    } else if (route==="home"){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route})
  }

  calculateFaceLocation = (respData) =>{
    let faceBoxes = []
    respData.outputs[0].data.regions.map(data=>{
      let clarifaiFace = data.region_info.bounding_box;
      let image = document.getElementById("inputImage");
      let width = Number(image.width);
      let height = Number(image.height);
      let faceBox = {
        topRow: clarifaiFace.top_row * height,
        leftCol: clarifaiFace.left_col * width,
        bottomRow: height - (clarifaiFace.bottom_row * height),
        rightCol: width - (clarifaiFace.right_col * width)
      }
      return faceBoxes.push(faceBox)
    })
    return faceBoxes
  }

  displayFaceBox = (param) =>{
    this.setState({boxes:param})
  }



  onChangeHandler=(event)=>{
    this.setState({input:event.target.value})
  }

  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input})
    fetch("https://face-dtekt-api.herokuapp.com/imageUrl", {
      method:"post",
      headers:{"Content-Type" : "application/json"},
      body: JSON.stringify({
        input : this.state.input
      })
    })
    .then(response=>response.json())
    .then((response)=>{
        if (response.status.code===10000){
          fetch("https://face-dtekt-api.herokuapp.com/image", {
            method:"put",
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify({
              id : this.state.user.id
            })
          })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user, {entries:count} ))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err=>console.log(err))
    }


  render(){

    const {isSignedIn, route, imageUrl, boxes} = this.state

    return (
      <div className="App">
        <Particles params={particleOptions} className="particles" />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route==='home'?
        <div>
          <Logo/>
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageFormLink inputChange={this.onChangeHandler} submit={this.onButtonSubmit} />
          <FaceRecognition pix={imageUrl} /*top={box.topRow} bottom={box.bottomRow}
          left={box.leftCol} right={box.rightCol}*/
          boxes={boxes}
          />
        </div>:
        route==="signin" || route==="signout" ?
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />:
          <Register onRouteChange={this.onRouteChange} loadUser = {this.loadUser} />
        }
      </div>
    );
  }
}

export default App;
