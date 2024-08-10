// gives extra features to svg react components
// to use it, you need to remove svg styles (color, fill, height, width)

const withSVGProps = (WrappedComponent) => {
  return ({ color, stroke, cssClass, size, ...props }) => {
    const style = {
      fill: color,
      stroke,
      width: size,
      height: size,
      cursor: 'pointer'
    }

    return (
      <WrappedComponent
        className={cssClass}
        style={style}
        {...props}
      />
    )
  }
}

export default withSVGProps
