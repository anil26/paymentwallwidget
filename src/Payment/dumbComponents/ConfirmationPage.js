import React from "react"
import classNames from "classnames"
import "styles/common.css"

class ConfirmationPage extends React.Component {
  render() {
    const statusParam = this.props.match.params.status
    return (
      <div className={classNames({
        "confirmation_failure": statusParam === "0",
        "confirmation_success": statusParam === "1",
      })}>
        {
          statusParam === "0"
            ? <h1> O'Ohh Your Payment has failed. Please try again !!</h1>
            : <h1>Your Payment is successfull. Thanks for ordering</h1>
        }
      </div>
    )
  }
}

export default ConfirmationPage