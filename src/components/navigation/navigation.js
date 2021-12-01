import React from "react";
import "./navigation.css"

class Navigation extends React.Component{

    render(){
      const {onRouteChange, isSignedIn} = this.props
      return (
        <nav>
          {isSignedIn?
            <div className="container">
              <button onClick={()=> onRouteChange("signout")}>Sign Out</button>
            </div>:
            <div className="container">
              <div><button onClick={()=> onRouteChange("signin")}>Sign In</button></div>
              <div><button onClick={()=> onRouteChange("register")}>Register</button></div>
            </div>

          }
          </nav>
        )
    }
}

export default Navigation