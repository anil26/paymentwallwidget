
import React from "react"
import { isValidAmount } from "shared/helpers"
import { getErrorObj } from "shared/cardHelper"

const AMOUNT_ERROR = "Amount entered is invalid"

class AmountToPay extends React.Component {
	constructor(props) {
		super(props)
		this.amount = React.createRef()
	}
	validator = () => {
		const isValid = isValidAmount(this.amount.current.value)
		return isValid
			? getErrorObj("", false)
			: getErrorObj(AMOUNT_ERROR, true)

	}
	onChange = (event) => {
		const { changeAmount } = this.props
		changeAmount(event.target.value)
	}
	render() {
		return (
			<div className="amount-section">
				<h3 className="heading">Step 1: Enter amount to be paid</h3>
				<input 
					ref={this.amount}
					type="number"
					min="10"
					onChange={this.onChange}
					placeholder="Enter Amount"
				/>
			</div>	
		)
	}
}

export default AmountToPay