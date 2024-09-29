import { useEffect, useRef, useState } from 'react'
import VideoOverlay from '../video-overlay/VideoOverlay'
import {
  AudioOff,
  AudioOn,
  PlayerPause,
  PlayerPlay
} from '../../../../shared/components/svg'
import { useToastStore } from '../../../../shared/globalStore/useToastStore'
import { TOAST_TYPES } from '../../../../shared/config/globalConstants'
import { apiConfig } from '../../../../configIp'
import './videoPlayer.scss'

const videoPathURL = '/videos/'

function VideoPlayer ({ videoData, videoIndex, handleVideoIndex }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFirstPlayed, setIsFirstPlayed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPortal, setShowPortal] = useState(false)
  const [userIPData, setUserIPData] = useState(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const videoUrl = `${videoPathURL}${videoData.video_files[videoIndex]}`
  const apiKey = apiConfig

  const { addToast } = useToastStore()

  //! should be moved to reduce number of requests
  useEffect(() => {
    const fetchUserIPData = async () => {
      try {
        const response = await fetch(
          `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`
        )
        const data = await response.json()
        setUserIPData(data)
      } catch (error) {
        console.error('Failed to fetch user IP data:', error)
      }
    }
    fetchUserIPData()
  }, [apiKey])

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
        setIsFirstPlayed(true)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleProgress = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleSeek = (event) => {
    if (videoRef.current) {
      const seekTime =
        (event.target.valueAsNumber / 100) * videoRef.current.duration
      videoRef.current.currentTime = seekTime
      setProgress(event.target.valueAsNumber)
    }
  }

  const handleVolumeChange = (event) => {
    const newVolume = event.target.valueAsNumber
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      videoRef.current.muted = newVolume === 0
    }
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    console.log('toggleMute')
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
    setIsMuted(!isMuted)
    setVolume(isMuted ? videoRef.current.volume || 1 : 0)
  }

  // const handleLoadedData = () => {
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 1500)
  // }

  const handleWaiting = () => {
    if (!videoRef.current?.paused) {
      setIsLoading(true)
    }
  }

  const handleSeeking = () => {
    setIsLoading(false)
  }

  const handleCanPlay = () => {
    setIsLoading(false)
  }

  const handleContextMenu = (event) => {
    event.preventDefault()
  }

  const handleError = () => {
    addToast(
      'Video failed to load. Please check the source.',
      TOAST_TYPES.ERROR
    )
  }

  // const handlePrevVideo = () => {
  //   setIsPlaying(false)
  //   handleVideoIndex(-1)
  //   setProgress(0)
  //   setIsFirstPlayed(false)
  //   setIsLoading(true)
  // }

  // const handleNextVideo = () => {
  //   setIsPlaying(false)
  //   handleVideoIndex(1)
  //   setProgress(0)
  //   setIsFirstPlayed(false)
  //   setIsLoading(true)
  // }

  const randomizePortalPosition = () => {
    const randomPosition = Math.floor(Math.random() * 4)
    switch (randomPosition) {
      case 0: // Top-left
        setPosition({ top: '10px', left: '10px' })
        break
      case 1: // Top-right
        setPosition({ top: '10px', left: 'calc(100% - 150px)' })
        break
      case 2: // Bottom-left
        setPosition({ top: 'calc(100% - 150px)', left: '10px' })
        break
      case 3: // Bottom-right
        setPosition({ top: 'calc(100% - 150px)', left: 'calc(100% - 150px)' })
        break
      default:
        break
    }
  }

  const triggerRandomPortal = () => {
    if (isPlaying) {
      setShowPortal(true)
      randomizePortalPosition()

      setTimeout(() => {
        setShowPortal(false)
      }, 5000)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      const randomInterval = Math.random() * 20000 + 10000
      const interval = setInterval(triggerRandomPortal, randomInterval)

      return () => clearInterval(interval)
    }
  }, [isPlaying])

  return (
    <div className='video-player'>
      {(!isFirstPlayed || isLoading) && (
        <div className='loading-overlay'>
          <img
            src='/Logo.png'
            alt='Loading...'
          />
        </div>
      )}
      <video
        ref={videoRef}
        onTimeUpdate={handleProgress}
        // onLoadedData={handleLoadedData}
        onWaiting={handleWaiting}
        onSeeking={handleSeeking}
        onCanPlay={handleCanPlay}
        onContextMenu={handleContextMenu}
        onError={handleError}
        width='100%'
        src={videoUrl}
      />
      <div className='controls'>
        <button
          className='controls__play-pause'
          onClick={handlePlayPause}
        >
          {isPlaying
            ? (
            <PlayerPause
              color='white'
              size='35px'
            />
              )
            : (
            <PlayerPlay
              color='white'
              size='35px'
            />
              )}
        </button>
        <input
          className='controls__video-seek'
          type='range'
          value={isNaN(progress) ? 0 : progress}
          title={`Timeline: ${
            isNaN(progress) ? 0 + '%' : Math.round(progress) + '%'
          }`}
          onChange={handleSeek}
          min='0'
          max='100'
        />
        <span className='controls__video-volume'>
          <button onClick={toggleMute}>
            {volume === 0
              ? (
              <AudioOff
                onClick={toggleMute}
                color='gray'
                size='25px'
              />
                )
              : (
              <AudioOn
                onClick={toggleMute}
                color='white'
                size='25px'
              />
                )}
          </button>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={volume}
            onChange={handleVolumeChange}
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
        </span>

        {/* <button
          onClick={handlePrevVideo}
          disabled={videoIndex === 0}
        >
          Prev Video
        </button>
        <button
          onClick={handleNextVideo}
          disabled={videoIndex >= videoData.video_files.length - 1}
        >
          Next Video
        </button> */}
      </div>
      {showPortal && userIPData && (
        <VideoOverlay
          userIP={userIPData}
          position={position}
        />
      )}
    </div>
  )
}

export default VideoPlayer
