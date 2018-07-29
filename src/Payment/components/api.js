const API_BASE_URL = "https://api.paymentwall.com/api/"
const PAYMENT_APP_KEY = process.env.REACT_APP_PAYMENTWALL_PROJECT_KEY

export const getCountryUrl = (userID) => {
    return `${API_BASE_URL}rest/country?key=${PAYMENT_APP_KEY}&uid=${userID}`
}

export const getPaymentMethodUrl = (code) => {
    return `https://api.paymentwall.com/api/payment-systems/?key=${PAYMENT_APP_KEY}&country_code=${code}`
}