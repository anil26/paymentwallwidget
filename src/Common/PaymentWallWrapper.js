/**
 * Base wrapper to be used for initiating Payment
 */
import React from "react"
import  Paymentwall from "paymentwall"

const PAYMENT_APP_KEY = process.env.REACT_APP_PAYMENTWALL_PROJECT_KEY
const PAYMENT_SECRET_KEY = process.env.REACT_APP_PAYMENTWALL_SECRET_KEY

const userId = "user40012"
const widgetString = `m2_1`

class PaymentWallWrapper extends React.Component {
  state={
    isError: false,
    redirect: false
  }
  componentDidMount() {
  }
  redirectToWidget = () => {
    const {
      widget1,
      ag_external_id,
      amount,
      currencycode,
      ag_name,
      email,
      registrationDate,
      ps,
      additional_param_name,
      paymentMethod,
    } = this.props
    console.log("in paymentn wrapper", this.props)
    const { id } = paymentMethod || { id: "all"}
    Paymentwall.Configure(
      Paymentwall.Base.API_GOODS,
      PAYMENT_APP_KEY,
      PAYMENT_SECRET_KEY
    )

    const widget = new Paymentwall.Widget(
        userId, // uid
        widgetString, // widget 
        [
            new Paymentwall.Product(
                'product301', // ag_external_id
                Number(`${amount}.00`), // amount
                'USD', // currencycode
                'Gold Membership', // ag_name
                Paymentwall.Product.TYPE_FIXED // ag_type
            )
        ],
        {
          'email': 'anilchaudharytest.com',
          'history[registration_date]': Math.floor(Date.now() / 1000),
          'ps': id, // Replace it with specific payment system short code for single payment methods
          'success_url': `${window.location.href}confirmation_page/0`,
          'failure_url': `${window.location.href}confirmation_page/1`,
        }
    );
   console.log(widget.getUrl())
   window.open(widget.getUrl())

  }
  static getDerivedStateFromProps(props, state) {
    const { isError } = props
    const { isError: stateIsError } = state
    if(!isError && stateIsError) {
      return {
        redirect: true,
      }
    }
    return {
      redirect: false
    }
  }
  render() {
    return (
      <div>
        {/* {redirect && this.redirectToWidget()} */}
      </div>
    )
  }
}

export default PaymentWallWrapper