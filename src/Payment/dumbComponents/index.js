import React from "react"
import PaymentWallWrapper from "Common/PaymentWallWrapper"
import PaymentMethods from "./PaymentMethods"
import CountrySelector from "./CountrySelector"
import AmountToPay from "./AmountToPay"
import { checkIfErrorExists } from "shared/helpers"
import CardSection from "./CardSection"
import "./styles.css"

class Payment extends React.Component {
  constructor(props) {
    super(props)
    this.card = React.createRef()
    this.paymentMethod = React.createRef()
    this.amountSection = React.createRef()
    this.countrySection = React.createRef()
    this.paymentWallWrapper = React.createRef()
    this.state={
      isError: true,
      error: null,
      amount: 0,
      paymentMethod: null,
      country: null,
    }

  }
  
  onClickPay = () => {
    const amountValidObj = this.amountSection.current.validator()
    const countryValidObj = this.countrySection.current.validator()
    const paymentMethodValidObj = this.paymentMethod.current.validator()
    const cardValidObj = this.card.current.validator()
    const errorObj = checkIfErrorExists(amountValidObj, countryValidObj, paymentMethodValidObj, cardValidObj)
    if (errorObj) {
      this.setState({
        isError: true,
        error: errorObj,
      })
    } else {
      this.paymentWallWrapper.current.redirectToWidget()
      this.setState({
        isError: false,
        error: null,
      })
    }
  }
  changeAmount = (value) => {
    this.setState({
      amount: Number(value)
    })
  }

  setPaymentMethod = (paymentMethod) => {
    this.setState({
      paymentMethod,
    })
  }
  changeCountry = (country) => {
    this.setState({
      country,
    })
  }
  render() {
    const { error, isError, amount, paymentMethod, country } = this.state
    return (
      <div className="payment-page-container">
        <div className="header">
          PAYMENT PAGE
        </div>
        <AmountToPay 
          ref={this.amountSection}
          changeAmount={this.changeAmount}
        />
        <CountrySelector 
          ref={this.countrySection}
          changeCountry={this.changeCountry}
        />
        <PaymentMethods 
          ref={this.paymentMethod}
          setPaymentMethod={this.setPaymentMethod}
          country={country}
        />
        <CardSection 
          ref={this.card}
          onClickPay={this.onClickPay}
          error={error}
          isError={isError}
          amount={amount}
        />
        <PaymentWallWrapper
          ref={this.paymentWallWrapper}
          amount={amount}
          paymentMethod={paymentMethod}
          isError={isError}
          country={country}
        />
      </div>
    )
  }
}

export default Payment