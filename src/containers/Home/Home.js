import React, { useEffect, useState } from 'react'
import AppBar from '../../components/AppBar'
import styled from 'styled-components'
import { listMenuItems } from '../../services/menu'
import MenuItem from '../../components/MenuItem'

const Wrapper = styled.div`
  height: 100vh;
  margin: 0;
`

const ItemsWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px 20px;
  row-gap: 10px;
  column-gap: 20px;
  justify-content: center;

  > * {
    margin: 12px 0 0 12px;
  }
`

const Home = () => {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await listMenuItems()
        setItems(data)
        setFilteredItems(data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchItems()
  }, [])

  const handleCategoryFilter = categoryId => {
    setFilteredItems(items.filter(item => item.category.id === categoryId))
  }

  const handleNameFilter = e => {
    const searchString = e.target.value.toLowerCase()
    setFilteredItems(items.filter(item => {
      const lowerName = item.name.toLowerCase()
      return lowerName.includes(searchString)
    }))
  }

  const handleAddItem = item => {
    const existing = cartItems.find(existing => existing.id === item.id)
    const builtItem = {
      ...item,
      quantity: existing ? (existing.quantity + 1) : 1
    }
    if (existing) {
      setCartItems([...cartItems.filter(existing => existing.id !== item.id), builtItem])
    } else {
      setCartItems([...cartItems, builtItem])
    }
  }

  const cartQuantity = cartItems.reduce((acc, curr) => curr.quantity + acc, 0)

  return (
    <Wrapper>
      <AppBar onCategoryFilter={handleCategoryFilter} onNameFilter={handleNameFilter} cartCount={cartQuantity}/>
      {filteredItems && filteredItems.length > 0 && <ItemsWrapper>
        {filteredItems.map(item => (
          <MenuItem
            key={item.id}
            item={item}
            onAddCart={handleAddItem}
            cartQuantity={cartItems.find(existing => existing.id === item.id)?.quantity}
          />
        ))}
      </ItemsWrapper>}
    </Wrapper>
  )
}

export default Home
