import { useEffect, useRef, useState } from 'react'
import { PlayerPause, PlayerPlay } from '../../../../shared/components/svg'
import './audioPlayer.scss'

const audioPathURL = '/audios/'

function AudioPlayer ({ audioData, audioIndex, handleAudioIndex }) {
  const audioRef = useRef(null)
  const canvasRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  // const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [audioContext, setAudioContext] = useState(null)
  const [analyser, setAnalyser] = useState(null)
  const [duration, setDuration] = useState(0)
  const [currentPassedTime, setCurrentPassedTime] = useState(0)

  const audioUrl = `${audioPathURL}${audioData.audio_files[audioIndex]}`

  useEffect(() => {
    if (!audioContext) {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const analyserNode = audioCtx.createAnalyser()
      analyserNode.fftSize = 2048
      setAudioContext(audioCtx)
      setAnalyser(analyserNode)
    }
  }, [audioContext])

  const drawWaveform = () => {
    if (!analyser || !canvasRef.current) return

    const canvas = canvasRef.current
    const canvasCtx = canvas.getContext('2d')
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      requestAnimationFrame(draw)

      analyser.getByteTimeDomainData(dataArray)

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
      canvasCtx.lineWidth = 2

      // canvasCtx.strokeStyle = 'lime'

      const gradient = canvasCtx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, 'red')
      gradient.addColorStop(0.5, 'yellow')
      gradient.addColorStop(1, 'green')
      canvasCtx.strokeStyle = gradient

      // const volumeBasedColor = `rgba(${Math.floor(volume * 255)}, 100, 150, 1)`
      // canvasCtx.strokeStyle = volumeBasedColor

      canvasCtx.beginPath()

      const sliceWidth = (canvas.width * 1.0) / bufferLength
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * canvas.height) / 2

        if (i === 0) {
          canvasCtx.moveTo(x, y)
        } else {
          canvasCtx.lineTo(x, y)
        }

        x += sliceWidth
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2)
      canvasCtx.stroke()
    }

    draw()
  }

  useEffect(() => {
    if (audioContext && audioRef.current && analyser) {
      const source = audioContext.createMediaElementSource(audioRef.current)
      source.connect(analyser)
      analyser.connect(audioContext.destination)
      drawWaveform()
    }
  }, [audioContext, analyser])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleProgress = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      setProgress(progress)
      setCurrentPassedTime(audioRef.current.currentTime)
    }
  }

  const handleSeek = (event) => {
    if (audioRef.current) {
      const seekTime =
        (event.target.valueAsNumber / 100) * audioRef.current.duration
      audioRef.current.currentTime = seekTime
      setProgress(event.target.valueAsNumber)
    }
  }

  const handleVolumeChange = (event) => {
    const newVolume = event.target.valueAsNumber
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      audioRef.current.muted = newVolume === 0
    }
    setVolume(newVolume)
    // setIsMuted(newVolume === 0)
  }

  // const toggleMute = () => {
  //   if (audioRef.current) {
  //     audioRef.current.muted = !isMuted
  //   }
  //   setIsMuted(!isMuted)
  //   if (!isMuted) {
  //     setVolume(0)
  //   } else {
  //     setVolume(1)
  //   }
  // }

  const handleCanPlay = () => {
    setIsLoading(false)
  }

  const handleWaiting = () => {
    if (!audioRef.current?.paused) {
      setIsLoading(true)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className='audio-player'>
      {isLoading && <div className='loading-overlay'>Loading...</div>}
      <audio
        ref={audioRef}
        onTimeUpdate={handleProgress}
        onCanPlay={handleCanPlay}
        onWaiting={handleWaiting}
        onLoadedMetadata={handleLoadedMetadata}
        src={audioUrl}
      />
      <div className='controls__audio-reprod'>
        <button
          className='controls__play-pause'
          onClick={handlePlayPause}
        >
          {isPlaying
            ? (
            <PlayerPause
              color='white'
              size='70px'
            />
              )
            : (
            <PlayerPlay
              color='white'
              size='70px'
            />
              )}
        </button>
        <canvas
          ref={canvasRef}
          className='audio-waveform'
          width={600}
          height={150}
        ></canvas>
        <div className='controls__audio-volume'>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={volume}
            onChange={handleVolumeChange}
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
        </div>
      </div>
      <div className='controls__audio-seek'>
        <span className='controls__audio-time'>
          {formatTime(currentPassedTime)}
        </span>
        <input
          type='range'
          value={isNaN(progress) ? 0 : progress}
          title={`Progress: ${
            isNaN(progress) ? 0 + '%' : Math.round(progress) + '%'
          }`}
          onChange={handleSeek}
          min='0'
          max='100'
        />
        <span className='controls__audio-time'>
          {formatTime(duration)}
        </span>
      </div>
    </div>
  )
}

export default AudioPlayer
