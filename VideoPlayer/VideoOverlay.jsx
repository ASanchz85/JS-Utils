import ReactDOM from 'react-dom'
import './videoOverlay.scss'

function VideoOverlay ({ userIP, position }) {
  return ReactDOM.createPortal(
    <div
      className='portal__video_overlay'
      style={{
        top: position.top,
        left: position.left
      }}
    >
      <p>Your IP: {userIP.ip}</p>
      <p>City: {userIP.city}</p>
      <p>Country: {userIP.country_name}</p>
      <p>ISP: {userIP.isp}</p>
    </div>,
    document.body
  )
}

export default VideoOverlay
