import React from 'react'
import './Footer.css'
import { TiSocialTwitter, TiSocialYoutubeCircular, TiSocialLinkedinCircular } from 'react-icons/ti'
import { SlSocialGithub } from 'react-icons/sl'

function Footer() {
  return (
    <footer>

      <div className="footer-container container">

        <ul>
          <li>
            <TiSocialTwitter />
          </li>
          <li>
            <TiSocialYoutubeCircular />
          </li>
          <li>
            <TiSocialLinkedinCircular />
          </li>
          <li>
            <SlSocialGithub />
          </li>
        </ul>

        <p>&copy; 2022</p>

      </div>


    </footer>
  )
}

export default Footer