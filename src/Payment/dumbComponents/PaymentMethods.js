import React from "react"
import classNames from "classnames"
import memoizeOne from "memoize-one"
import { getErrorObj  } from "shared/cardHelper"
import { getPaymentMethodUrl } from "Payment/components/api"

const PAYMENT_METHOD_NOT_SELECTED =  "Payment method is not selected"

class PaymentMethods extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentMethods: [],
      selectedIndex: null,
      country: null,
      oldCountry: null,
    }
    this.methodList = React.createRef()
  }
  
  validator = () => {
    const { selectedIndex } = this.state
    return selectedIndex !== null
      ?  getErrorObj("", false)
      : getErrorObj(PAYMENT_METHOD_NOT_SELECTED, true)
  }
  
  static getDerivedStateFromProps(props, state) {
   const { country } = props
   const { country: stateCountry } = state
    if(country && stateCountry && country.code !== stateCountry.code) {
      return {
        oldCountry: stateCountry,
        country,
      }
    }
    if(country && !stateCountry) {
      return {
        oldCountry: stateCountry,
        country,
      }
    }
    return null
  }
  
  getPaymentMethods = memoizeOne((code) => {
    fetch(getPaymentMethodUrl(code))
    .then((result) => {
      return result.json()
    }).then((result) => {
      this.setState({
        paymentMethods: result,
      })
    }).catch((err) => {
      console.log("found error", err)
    })
  })
  
  onChange = (index) => {
    const { setPaymentMethod } = this.props
    const { paymentMethods } = this.state
    this.setState({
      selectedIndex : index,
    })
    setPaymentMethod(paymentMethods[index])

  }
  
  scroll = (direction) => {
    if(direction === "left") {
      this.methodList.current.scrollBy(-200, 0)
    }
    if(direction === "right") {
      this.methodList.current.scrollBy(200, 0)
    }
  }
  
  render() {
    const { paymentMethods, selectedIndex, country } = this.state
    const paymentMethodLength = paymentMethods.length
    const isShowScroll = paymentMethodLength > 6
    return (
      <div className="payment-method-container">
        {country && this.getPaymentMethods(country.code)}
        <h3 className="heading">Step 3: Choose Your Payment Method</h3>
       {isShowScroll && <a className="prev" onClick={() => this.scroll("left")}>&#10094;</a>}
        {isShowScroll && <a className="next" onClick={() => this.scroll("right")}>&#10095;</a>}
        <ul className="method-list" ref={this.methodList}>
          {
            paymentMethods.map((paymentMethod, index) => {
              const {id, img_url, img_class} = paymentMethod
              //need to handle to new_window flag
              return (
                <li 
                  key={id}
                  onClick={() => {this.onChange(index)}}
                  className={classNames(
                    {"border-green": selectedIndex === index}
                  )}
                >
                  <img src={img_url} data-imgclass={img_class} alt="noimage"/>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
export default PaymentMethods