import React from 'react'
import './Footer.css'
import { SiYoutube, SiInstagram, SiTwitter, SiFacebook } from 'react-icons/si'

function Footer() {


  return (
    <footer>

      <div className="footer-container container">

        <div className="footer-links">

          <ul>
            <li>About us</li>
            <li>Scoville scale</li>
            <li>Privacy Policy</li>
            <li>Contact</li>
          </ul>

        </div>

        <div className="footer-social-links">
          <ul>
            <li>
              <SiYoutube onClick={() => window.open('https://www.youtube.com', '_blank')} fontSize="2.5rem" />
            </li>
            <li>
              <SiInstagram onClick={() => window.open('https://www.instagram.com', '_blank')} fontSize="2.5rem" />
            </li>
            <li>
              <SiTwitter onClick={() => window.open('https://www.twitter.com', '_blank')} fontSize="2.5rem" />
            </li>
            <li>
              <SiFacebook onClick={() => window.open('https://www.facebook.com', '_blank')} fontSize="2.5rem" />
            </li>
          </ul>
        </div>
        <p>&copy; 2022</p>
      </div>


    </footer>
  )
}

export default Footer