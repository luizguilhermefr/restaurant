import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Fieldset, Tab, TabBody, Tabs, TextField, Tooltip } from 'react95'

import { CartContext } from '../../context/CartContext'

import { createOrder } from '../../services/menu'
import formatCurrency from '../../utils/formatCurrency'

import Loading from '../../components/Loading'
import Error from '../../components/Error'
import Window from '../../components/Window'

const Items = styled.div`
  //
`

const PaymentForm = styled.div`
  padding: 10px;

  > *:not(:last-child) {
    display: block;
    margin-bottom: 15px;
  }
`

const MetaResultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Cart = () => {
  const [tab, setTab] = useState(0)
  const [creditCardNumber, setCreditCardNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const cart = useContext(CartContext)

  const cartIsEmpty = cart.items.length === 0

  const handleChangeTab = (e, value) => setTab(value)

  const handleChangeCreditCardNumber = e => {
    setCreditCardNumber(e.target.value)
  }

  const handleChangeVerificationCode = e => {
    setVerificationCode(e.target.value)
  }

  const handleChangeExpiryDate = e => {
    setExpiryDate(e.target.value)
  }

  const placeOrder = async () => {
    setSubmitting(true)
    try {
      await createOrder({
        credit_card_number: creditCardNumber,
        credit_card_cvv: verificationCode,
        credit_card_exp_date: expiryDate,
        items: cart.items.map(item => ({ item: item.id, quantity: item.quantity }))
      })
      cart.setItems([])
      setError(false)
      navigate('/orders')
    } catch (e) {
      setError(true)
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmit = () => {
    const errors = []
    if (!/^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/.test(creditCardNumber)) {
      errors.push('Credit card number is invalid. Only Mastercard is allowed.')
    }

    if (!/^[0-9]{3}$/.test(verificationCode)) {
      errors.push('Verification code is not valid.')
    }

    if (!/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(expiryDate)) {
      errors.push('Expiry date is invalid, please use MM/YY format.')
    }

    setValidationErrors(errors)

    if (errors.length === 0) {
      placeOrder()
    }
  }

  return (
    <Window title="cart.exe" onClose={() => navigate(-1)}>
      <Tabs value={tab} onChange={handleChangeTab}>
        <Tab value={0}>Items</Tab>
        <Tab value={1} disabled={cartIsEmpty}>Payment</Tab>
      </Tabs>
      <TabBody>
        {tab === 0 && (
          <Items>
            {cartIsEmpty && 'No items in cart yet.'}
            {cart.items.map(item => (
              <Fieldset key={item.id} label={`Qty: ${item.quantity}`}>
                {`${item.name} (${formatCurrency(item.price)} each)`}
              </Fieldset>
            ))}
          </Items>
        )}
        {tab === 1 && (
          submitting ? (
            <MetaResultWrapper>
              <Loading/>
            </MetaResultWrapper>
          ) : (
            <PaymentForm>
              <Tooltip text="Only Mastercard allowed!" enterDelay={100} leaveDelay={500}>
                <TextField
                  placeholder="Credit card number"
                  value={creditCardNumber}
                  onChange={handleChangeCreditCardNumber}
                  fullWidth
                />
              </Tooltip>
              <TextField
                placeholder="Verification code (XXX)"
                value={verificationCode}
                onChange={handleChangeVerificationCode}
                fullWidth
              />
              <TextField
                placeholder="Expiry date (MM/YY)"
                value={expiryDate}
                onChange={handleChangeExpiryDate}
                fullWidth
              />
              {validationErrors.map(error => (
                <p key={error}>{error}</p>
              ))}
              <Button fullWidth onClick={handleSubmit}>💸 Place order</Button>
              {error && <Error/>}
            </PaymentForm>
          ))}
      </TabBody>
    </Window>
  )
}

export default Cart
