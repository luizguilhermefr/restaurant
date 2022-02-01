import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Fieldset, Tab, TabBody, Tabs, TextField, Tooltip, Window, WindowContent, WindowHeader } from 'react95'
import { CartContext } from '../../context/CartContext'

const Wrapper = styled.div`
  padding: 5rem;

  .window-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;

    &:before,
    &:after {
      content: '';
      position: absolute;
      background: #000;
    }

    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }

    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .window {
    width: 100%;
    min-height: 200px;
  }
`

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

const Cart = () => {
  const [tab, setTab] = useState(0)
  const [creditCardNumber, setCreditCardNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
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

  const handleSubmit = () => {
    const errors = []
    if (!/^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/.test(creditCardNumber)) {
      errors.push('Credit card number is invalid. Only Mastercard is allowed.')
    }

    if(!/^[0-9]{3}$/.test(verificationCode)) {
      errors.push("Verification code is not valid.")
    }

    if(!/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(expiryDate)) {
      errors.push("Expiry date is invalid, please use MM/YY format.")
    }

    setValidationErrors(errors)
  }

  return (
    <Wrapper>
      <Window className="window">
        <WindowHeader className="window-header">
          <span>cart.exe</span>
          <Button onClick={() => navigate(-1)}>
            <span className="close-icon"/>
          </Button>
        </WindowHeader>
        <WindowContent>
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab value={0}>Items</Tab>
            <Tab value={1} disabled={cartIsEmpty}>Payment</Tab>
          </Tabs>
          <TabBody>
            {tab === 0 && (
              <Items>
                {cartIsEmpty && 'No items in cart yet.'}
                {cart.items.map(item => (
                  <Fieldset label={`Qty: ${item.quantity}`}>
                    {item.name}
                  </Fieldset>
                ))}
              </Items>
            )}
            {tab === 1 && (
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
              </PaymentForm>
            )}
          </TabBody>
        </WindowContent>
      </Window>
    </Wrapper>
  )
}

export default Cart
