import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button, Cutout, Toolbar, Window, WindowContent, WindowHeader } from 'react95'

const Picture = styled.img`
  width: 300px;
  height: 300px;
  display: block;
`

const MenuItem = ({ name, image }) => {
  return (
    <Window style={{ maxWidth: '300px' }}>
      <WindowHeader>
        {name}
      </WindowHeader>
      <Toolbar noPadding>
        <Button variant="menu">
          Add to cart
        </Button>
      </Toolbar>
      <WindowContent style={{ padding: '0.25rem' }}>
        <Cutout>
          <Picture src={image} alt={name}/>
        </Cutout>
      </WindowContent>
    </Window>
  )
}

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
}

export default MenuItem
