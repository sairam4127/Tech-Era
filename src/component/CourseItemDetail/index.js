import {Component} from 'react'

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

class CourseItemDetail extends Component {
  state = {apiStatus: apiConst.initial, itemsList: {}}

  componentDidMount() {
    this.getItemsList()
  }

  getItemsList = async () => {
    this.setState({apiStatus: apiConst.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
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
      <div className="itemDetailsCont">
        <img
          src={itemsList.imageUrl}
          alt={itemsList.name}
          className="itemDetailsImg"
        />
        <div className="itemdesdescont">
          <h1>{itemsList.name}</h1>
          <p>{itemsList.description}</p>
        </div>
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
    return (
      <div>
        <Header />
        <div className="cid-cont">{this.view()}</div>
      </div>
    )
  }
}

export default CourseItemDetail
