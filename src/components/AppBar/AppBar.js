import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  AppBar as Win95AppBar,
  Toolbar,
  TextField,
  Button,
  List,
  ListItem,
  Divider
} from 'react95'

const Wrapper = styled.div`
  padding-bottom: 5rem;
`

const AppBar = ({ cartCount, onCategoryFilter, onNameFilter }) => {
  const [open, setOpen] = React.useState(false)

  const categories = [
    {
      id: null,
      icon: '🍽',
      name: 'All categories'
    },
    {
      id: 1,
      icon: '🥖',
      name: 'Bakery'
    },
    {
      id: 2,
      icon: '🥗',
      name: 'Entrees'
    },
    {
      id: 3,
      icon: '🍹',
      name: 'Drinks'
    }
  ]

  return (
    <Wrapper>
      <Win95AppBar fixed={false}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: 'bold' }}
          >
            <img
              src="/logo.png"
              alt="react95 logo"
              style={{ height: '20px', marginRight: 4 }}
            />
            Start
          </Button>
          {open && (
            <List
              style={{
                position: 'absolute',
                left: '0',
                top: '100%',
                width: '150px'
              }}
              onClick={() => setOpen(false)}
            >
              <ListItem>
                <span role="img" aria-label="🛎">
                  🛎
                </span>
                My orders
              </ListItem>
              <ListItem>
                <span role="img" aria-label="🛎">
                  🛒
                </span>
                My cart {cartCount > 0 && `(${cartCount})`}
              </ListItem>
              <Divider/>
              {categories.map(category => (
                <ListItem key={category.id} onClick={() => onCategoryFilter(category.id)}>
                    <span role="img" aria-label={category.icon}>
                      {category.icon}
                    </span>
                  {category.name}
                </ListItem>
              ))}
            </List>
          )}
          <TextField placeholder="Search..." width={150} onChange={onNameFilter} />
        </Toolbar>
      </Win95AppBar>
    </Wrapper>
  )
}

AppBar.propTypes = {
  cartCount: PropTypes.number,
  onCategoryFilter: PropTypes.func.isRequired,
  onNameFilter: PropTypes.func.isRequired,
}

export default AppBar
