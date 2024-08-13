import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, data: {}}

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)
    const data = await response.json()

    const transformedData = {
      last7DaysVaccination: [
        data.last_7_days_vaccination.map(eachDay => ({
          vaccineDate: eachDay.vaccine_date,
          dose1: eachDay.dose_1,
          dose2: eachDay.dose_2,
        })),
      ],
      vaccinationByAge: data.vaccination_by_age,
      vaccinationByGender: data.vaccination_by_gender,
    }
    if (response.ok === true) {
      this.setState({
        data: transformedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failed})
    }
  }

  renderCharts = () => {
    const {data} = this.state
    return (
      <div className="charts-container">
        <VaccinationCoverage data={data.last7DaysVaccination} />
        <VaccinationByGender data={data.vaccinationByGender} />
        <VaccinationByAge data={data.vaccinationByAge} />
      </div>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <div className="failure-image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-image"
        />
      </div>
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCharts()

      case apiStatusConstants.failed:
        return this.renderFailure()

      default:
        return this.renderLoader()
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="inner-container">
          <h1 className="logo-name-container">
            <div className="logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
                alt="website logo"
                className="logo-image"
              />
            </div>
            <p className="logo-name">Co-WIN</p>
          </h1>
          <h1 className="main-heading">CoWIN Vaccination in India</h1>
          <div className="charts-container">
            {/* {apiSuccess ? this.showChart() : this.showError()} */}
            {this.renderContent()}
          </div>
        </div>
      </div>
    )
  }
}

export default CowinDashboard
