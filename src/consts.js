/**
 * This file will be using all the consts, used across application
 */

 /**
  * This is sample country code list need to see if Payment wall has an api to give the list
  * countries and their codes.
  */
const COUNTRY_LIST = [
    {
        code: "IN",
        country : "India"
    },
    {
        code: "AE",
        country : "United Arab Emirates"
    },
    {
        code: "DE",
        country : "Germany"
    },
    {
        code: "IT",
        country : "Italy"
    },
    {
        code: "NZ",
        country : "New Zealand"
    },
    {
        code: "US",
        country: "United States of America",
    }
]

const CURRENCY_MAP = ["USD", "INR", "AED", "EUR", "NZD"]

export {
    COUNTRY_LIST,
    CURRENCY_MAP,
}