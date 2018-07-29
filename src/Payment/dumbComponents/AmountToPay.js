
import React from "react"
import { isValidAmount } from "shared/helpers"
import { getErrorObj } from "shared/cardHelper"
import { CURRENCY_MAP } from "consts"

const AMOUNT_ERROR = "Amount entered is invalid"

class AmountToPay extends React.Component {
	constructor(props) {
		super(props)
		this.amount = React.createRef()
		this.state = {
			selectedIndex: 0,
		}
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
	onChangeCurrency = (event) => {
		const { changeCurrency } = this.props
		changeCurrency(event.target.value)
		this.setState({
			selectedIndex: event.target.selectedIndex
		})
	}
	render() {
		const { selectedIndex } = this.state
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
				<select className="currency-section" value={CURRENCY_MAP[selectedIndex]} onChange={this.onChangeCurrency}>
					{
						CURRENCY_MAP.map((currency) => {
							return <option value={currency} key={currency}>{currency}</option>
						})
					}
				</select>
			</div>	
		)
	}
}

export default AmountToPay