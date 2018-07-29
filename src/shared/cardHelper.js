/**
 * Implementation of Luhn algorithm 
 * 
 */

 const CARDLENGTH = 16
 const CARD_ERROR1 = "Not provided card number"
 const CARD_ERROR2 = `Card number length should be ${CARDLENGTH}`
 const CARD_ERROR3 = "Numbers are required, Please check spaces"
 const CARD_ERROR4 = "Card is not valid"
 const EXP_ERROR1 = "Expiry entry is not valid"
 const CVV_ERROR = "Cvv number is not filled"
 const CVV_ERROR1 = "Cvv is not valid"

const getErrorObj = (error, isError) => ({
  error,
  isError,
})

const luhnAlgorithm = (value) => {
  if (/[^0-9-\s]+/.test(value)) return false;

    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
            let cDigit = value.charAt(n)
            let nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) === 0;
}
 

const isCardValid = (cardNumber) => {
  if(!cardNumber) return getErrorObj(CARD_ERROR1, true)

  //Length validation
  if(cardNumber.length !== 16) {
    return getErrorObj(CARD_ERROR2, true)
  }
  if(isNaN(parseInt(cardNumber, 10))) {
    return getErrorObj(true, false)
  }
  const isCorrect = luhnAlgorithm(cardNumber)
  return isCorrect
    ? getErrorObj("", false)
    : getErrorObj(CARD_ERROR4, true)

}

const isExpiryValid = (month, year) => {
  if(isNaN(parseInt(month, 10)) ||
    isNaN(parseInt(year, 10))) {
    return getErrorObj(EXP_ERROR1, true)
  }
  if(parseInt(month, 10) > 12) {
    return getErrorObj(EXP_ERROR1, true)
  }
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()
  if(parseInt(year, 10) < currentYear && parseInt(month, 10) < currentMonth) {
    return getErrorObj(EXP_ERROR1, true)
  }
  return getErrorObj("", false)
}

const isCvvValid = (cvvNumber) => {
  if(!cvvNumber) {
    return getErrorObj(CVV_ERROR, true)
  }
  const isValidCvv = 
    !isNaN(parseInt(cvvNumber, 10)) &&
    cvvNumber.toString().length === 3 && !(cvvNumber > 2050)
  return isValidCvv
    ? getErrorObj("", false)
    : getErrorObj(CVV_ERROR1, true)
}

export {
  isCardValid,
  isExpiryValid,
  isCvvValid,
  getErrorObj,
}