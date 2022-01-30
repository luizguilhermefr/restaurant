import React from 'react'
import {
  AppBar as Win95AppBar,
  Toolbar,
  TextField,
  Button,
  List,
  ListItem,
  Divider
} from 'react95'

const AppBar = () => {
  const [open, setOpen] = React.useState(false)

  const categories = [
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
    <Win95AppBar>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
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
                width: '130px'
              }}
              onClick={() => setOpen(false)}
            >
              <ListItem>
                <span role="img" aria-label="🛎">
                  🛎
                </span>
                My orders
              </ListItem>
              <Divider/>
              {categories.map(category => (
                <ListItem key={category.id}>
                  <span role="img" aria-label={category.icon}>
                    {category.icon}
                  </span>
                  {category.name}
                </ListItem>
              ))}
            </List>
          )}
        </div>

        <TextField placeholder="Search..." width={150}/>
      </Toolbar>
    </Win95AppBar>
  )
}

export default AppBar
