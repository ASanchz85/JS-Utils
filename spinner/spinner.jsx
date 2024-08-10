import withSVGProps from '../../hoc/withSVGProps'

// spinner originally downloaded as svg from https://loading.io/ 

function Spinner ({ className, style }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
      className={className}
      style={{
        ...style,
        shapeRendering: 'auto',
        display: 'block',
        background: 'transparent'
      }}
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <g>
        {Array.from({ length: 8 }).map((_, i) => {
          const rotate = i * 45
          const delay = -(0.875 - 0.125 * i) + 's'
          const fillOpacity = 1 - 0.125 * i

          return (
            <g
              key={i}
              transform={`translate(${
                50 + 30 * Math.cos((rotate * Math.PI) / 180)
              },${50 + 30 * Math.sin((rotate * Math.PI) / 180)})`}
            >
              <g transform={`rotate(${rotate})`}>
                <circle
                  fillOpacity={fillOpacity}
                  r='6'
                >
                  <animateTransform
                    attributeName='transform'
                    type='scale'
                    begin={delay}
                    dur='1s'
                    repeatCount='indefinite'
                    keyTimes='0;1'
                    values='1.5 1.5;1 1'
                  />
                  <animate
                    attributeName='fill-opacity'
                    begin={delay}
                    dur='1s'
                    repeatCount='indefinite'
                    keyTimes='0;1'
                    values='1;0'
                  />
                </circle>
              </g>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export default withSVGProps(Spinner)
