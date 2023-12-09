import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import FailureView from '../FailureView'

import './index.css'

const apiConst = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {apiStatus: apiConst.initial, itemsList: []}

  componentDidMount() {
    this.getItemsList()
  }

  getItemsList = async () => {
    this.setState({apiStatus: apiConst.progress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const updatedData = data.courses.map(eachobj => ({
        id: eachobj.id,
        name: eachobj.name,
        logoUrl: eachobj.logo_url,
      }))
      console.log(updatedData)
      this.setState({itemsList: updatedData, apiStatus: apiConst.success})
    } else {
      this.setState({apiStatus: apiConst.failure})
    }
  }

  onRetry = () => {
    this.getItemsList()
  }

  successView = () => {
    const {itemsList} = this.state
    return (
      <div className="successcont">
        <h1>Courses</h1>
        <ul className="successview-ul">
          {itemsList.map(eachobj => (
            <li key={eachobj.id} className="successview-item">
              <Link to={`courses/${eachobj.id}`} className="item-link">
                <img
                  src={eachobj.logoUrl}
                  alt={eachobj.name}
                  className="successview-logo"
                />
                <p>{eachobj.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => <FailureView onRetry={this.onRetry} />

  progressView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  view = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConst.progress:
        return this.progressView()
      case apiConst.failure:
        return this.failureView()
      case apiConst.success:
        return this.successView()

      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <Header />
        <div>{this.view(apiStatus)}</div>
      </>
    )
  }
}
export default Home
