import React from "react"
import { isCardValid, isExpiryValid, isCvvValid  } from "shared/cardHelper"
import { isValidName } from "shared/helpers"

class CardSection extends React.Component {
  constructor(props) {
    super(props)
    this.cardHolderName = React.createRef()
    this.cardNumber = React.createRef()
    this.expMonth = React.createRef()
    this.expYear = React.createRef()
    this.cvv = React.createRef()
  }

  onPayClick = () => {
    const { onClickPay } = this.props
    onClickPay()
  }

  validator = () => {
    const cardValidObj = isCardValid(this.cardNumber.current.value)
    const isNameValid = isValidName(this.cardHolderName.current.value)
    const nameValidObj = isNameValid
      ? {
        error: "",
        isError: false
      }
      : {
        error: "Name is invalid. It should be only alphabets and spaces",
        isError: true,
      }
    const expiryValidObj = isExpiryValid(this.expMonth.current.value, this.expYear.current.value)
    const cvvValidobj = isCvvValid(this.cvv.current.value)
    return [nameValidObj, cardValidObj, expiryValidObj, cvvValidobj]
  }
  
  render() {
    const { amount, isError, error } = this.props
    return (
      <div className="card-section">
        <h3>
          Step 4: Enter Card Details
        </h3>
        <div className="input-fields">
          <div className="label-part">
            <label htmlFor="cardholder-name">Card holder Name:</label>
            <label htmlFor="card-number"> Card Number:</label>
            <label htmlFor="exp-mm">Expiration date:</label>
            <label htmlFor="cvv">CVV Number:</label>
          </div>
          <div className="input-part">
            <input ref={this.cardHolderName} id="cardholder-name" placeholder="First Name Last Name" type="text"/>
            <input ref={this.cardNumber} id="card-number" placeholder="Card Number" type="number"/>
            <div className="exp-section">
              <input ref={this.expMonth} id="exp-mm" placeholder="mm" type="number"/>
              <span>/</span>
              <input ref={this.expYear} id="exp-yyyy" placeholder="yyyy" type="number"/>
            </div>
            <input ref={this.cvv} id="cvv" type="number"/>
          </div>
        </div>
        <div className="pay-now-btn-section" >
          <button onClick={this.onPayClick}>
            Pay Amount {!!amount && amount}
          </button>
          {isError && 
            <div className="error-log">
                <span>{error && error.error}</span>
            </div>
          }
        </div>
          
      </div>  
    )
  }
}

export default CardSection