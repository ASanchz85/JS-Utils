import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useToastStore } from '../../globalStore/useToastStore'
import './toast.scss'
//! pending of updating styles and using global variables

function Toast () {
  const { toasts, removeToast } = useToastStore()

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        removeToast(toast.id)
      }, toast.duration)

      return () => clearTimeout(timer)
    })
  }, [toasts, removeToast])

  return ReactDOM.createPortal(
    <div className='toast-container'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.type}`}
        >
          {toast.message}
        </div>
      ))}
    </div>,
    document.getElementById('toast')
  )
}

export default Toast
