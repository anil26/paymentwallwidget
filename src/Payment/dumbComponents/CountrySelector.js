import React from "react"
import { COUNTRY_LIST } from "consts"
import { getCountryUrl } from "Payment/components/api"
import { getErrorObj } from "shared/cardHelper";

class CountrySelector extends React.Component {
  state = {
    countryList: COUNTRY_LIST,
    selectedIndex: 0,
  }
  checkIfAlreadyExists = (stateCountryList, newResult) => {
    return this.state.countryList.findIndex((country) => {
      return country.code === newResult.code
    })
  }
  componentDidMount() {
    const { changeCountry } = this.props
    const { countryList } = this.state
    const userId = "user40012"
    fetch(getCountryUrl(userId))
    .then((result) => {
      return result.json()
    }).then((result1) => {
      const indexCountry = this.checkIfAlreadyExists(this.state.countryList, result1)
      if(indexCountry === -1) {
        this.setState({
          countryList: [...this.state.countryList, result1],
          selectedIndex: this.state.countryList.length,
        })
      } else {
        this.setState({
          selectedIndex: indexCountry,
        })
      }
    })
    changeCountry(countryList[0])
  }
  validator = () => {
    return getErrorObj("", false)
  }
  onChange = (event) => {
    const { changeCountry } = this.props
    const { countryList } = this.state
    this.setState({
      selectedIndex: event.target.selectedIndex
    })
    changeCountry(countryList[event.target.selectedIndex])
  }
  render() {
    const { selectedIndex, countryList } = this.state
    return (
      <div className="country-selector-container">
        <h3 className="heading">Step 2: Select the Country</h3>
        <select className="country-select" value={countryList[selectedIndex].code} onChange={this.onChange}>
        {
          countryList.map((countryObj, index) => {
            const { code, country } = countryObj
            return (
              <option 
                value={code}
                selected={index === selectedIndex ? "selected" : ""}
                key={code}
              >
                {country}
              </option>
            )
          })
        }
        </select>
      </div>
    )
  }
}

export default CountrySelector