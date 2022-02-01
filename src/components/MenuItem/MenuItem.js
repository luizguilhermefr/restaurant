import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button, Cutout, Toolbar, Window, WindowContent, WindowHeader } from 'react95'

import formatCurrency from '../../utils/formatCurrency'

const Picture = styled.img`
  width: 300px;
  height: 300px;
  display: block;
`

const MenuItem = ({ item, onAddCart, cartQuantity }) => {
  return (
    <Window style={{ maxWidth: '300px' }}>
      <WindowHeader>
        {`${item.name} (${formatCurrency(item.price)})`}
      </WindowHeader>
      <Toolbar noPadding>
        <Button variant="menu" onClick={() => onAddCart(item)}>
          Add to cart {cartQuantity > 0 && `(${cartQuantity})`}
        </Button>
      </Toolbar>
      <WindowContent style={{ padding: '0.25rem' }}>
        <Cutout>
          <Picture src={item.image.src} alt={item.name}/>
        </Cutout>
      </WindowContent>
    </Window>
  )
}

MenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.shape({
      src: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onAddCart: PropTypes.func.isRequired,
  cartQuantity: PropTypes.number,
}

MenuItem.defaultProps = {
  cartQuantity: 0,
}

export default MenuItem
