import './index.css'

const FailureView = props => {
  const {onRetry} = props
  const onClicked = () => {
    onRetry()
  }
  return (
    <div className="failurecont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry-btn" onClick={onClicked}>
        Retry
      </button>
    </div>
  )
}
export default FailureView
