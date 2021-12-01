import React from "react";
import "./rank.css"

class Rank extends React.Component{

    render(){
      const {name, entries} = this.props
        return(
            <div className="rankContainer">
                <div>
                    {name}, your current entry count is....
                </div>
                <div>
                    {entries}
                </div>
            </div>
        )
    }
}

export default Rank