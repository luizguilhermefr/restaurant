import numeral from 'numeral'

const formatCurrency = (price) => {
  return numeral(price).format('$0,0.00')
}

export default formatCurrency
