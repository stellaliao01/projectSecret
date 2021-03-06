import React, { useState, useEffect, useContext } from 'react'
import { MenuContext } from 'react-flexible-sliding-menu'
import { AiOutlineHome } from 'react-icons/ai'
import Header from './Header'
import StashOutput from './StashOutput'
import { Link, useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'

const Stash = (props) => {

  const history = useHistory();

  const redirect = () => {
      history.push("/homepage", {userID: location.state.userID})
  }

  const location = useLocation();

  console.log("this is location.state ", location.state);

  // save stash from backend
  const [stash, setStash] = useState([])
  const { toggleMenu } = useContext(MenuContext)

    useEffect(() => {
    axios.get(`http://localhost:3000/secrets/stash/${location.state.userID}`)
    .then((data) => {
      return setStash(data.data)})
  }, [])

    return (
    <>
      <div className="map-header">
        <div onClick={toggleMenu} className="map-logo"><i class="fa fa-trophy"></i></div>
        <div onClick={redirect} className="stash-icon" ><div className="hamburger-icon"><AiOutlineHome /></div></div>
    </div>
      <div className="stash-container">
        <div className="stash-title">Your Stash</div>
        <div className="stash-list">
          {stash && stash.map((element, index) => (
            <StashOutput key={index} stashItem={element.message}/>
      ))}
        </div> 
      </div>
    </>
    )
}

export default Stash;