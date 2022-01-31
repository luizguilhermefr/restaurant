import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Fieldset, Window, WindowContent, WindowHeader } from 'react95'

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

const items = [
  {
    id: 1,
    name: 'Pirula',
    quantity: 2,
  }
]

const Cart = () => {
  const navigate = useNavigate()

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
          <Items>
            {items.map(item => (
              <Fieldset label={`Qty: ${item.quantity}`}>
                {item.name}
              </Fieldset>
            ))}
          </Items>
        </WindowContent>
      </Window>
    </Wrapper>
  )
}

export default Cart
