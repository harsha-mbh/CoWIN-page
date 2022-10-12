import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

class CowinDashboard extends Component {
  state = {
    last7daysData: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const last7daysData = data.last_7_days_vaccination.map(eachItem => ({
      dose1: eachItem.dose_1,
      dose2: eachItem.dose_2,
      vaccineDate: eachItem.vaccine_date,
    }))
    const vaccinationByAge = data.vaccination_by_age.map(eachItem => ({
      age: eachItem.age,
      count: eachItem.count,
    }))
    const vaccinationByGender = data.vaccination_by_gender.map(eachItem => ({
      count: eachItem.count,
      gender: eachItem.gender,
    }))
    this.setState({
      last7daysData,
      vaccinationByAge,
      vaccinationByGender,
      isLoading: false,
    })
  }

  renderCharts = () => {
    const {last7daysData, vaccinationByAge, vaccinationByGender} = this.state
    return (
      <>
        <VaccinationCoverage last7daysData={last7daysData} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <div className="logo-name-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="logo"
            alt="website logo"
          />
          <h1 className="app-name">
            Co-<span className="win">WIN</span>
          </h1>
        </div>
        <h1 className="app-heading">CoWIN Vaccination in India</h1>
        {isLoading ? this.renderLoader() : this.renderCharts()}
      </div>
    )
  }
}
export default CowinDashboard
