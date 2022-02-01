import React from 'react'
import styled from 'styled-components'
import { Window as Win95Window, Button, WindowContent, WindowHeader } from 'react95'

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
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .window {
    width: 100%;
    min-height: 200px;
  }
`

const Window = ({ children, title, onClose }) => (
  <Wrapper>
    <Win95Window className="window">
      <WindowHeader className="window-header">
        <span>{title}</span>
        <Button onClick={onClose}>
          <span className="close-icon"/>
        </Button>
      </WindowHeader>
      <WindowContent>
        {children}
      </WindowContent>
    </Win95Window>
  </Wrapper>
)

export default Window