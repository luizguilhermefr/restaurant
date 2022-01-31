import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { listMenuItems } from '../../services/menu'

import MenuItem from '../../components/MenuItem'
import Loading from '../../components/Loading'
import Error from '../../components/Error'

import AppBar from './AppBar'

const Wrapper = styled.div`
  height: 100vh;
  margin: 0;
`

const MetaResultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      try {
        const data = await listMenuItems()
        setError(false)
        setItems(data)
        setFilteredItems(data)
      } catch (e) {
        setError(true)
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [setItems, setFilteredItems, setLoading])

  const handleCategoryFilter = categoryId => {
    if (categoryId === null) {
      setFilteredItems([...items])
    } else {
      setFilteredItems(items.filter(item => item.category.id === categoryId))
    }
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
      {loading && (
        <MetaResultWrapper>
          <Loading/>
        </MetaResultWrapper>
      )}
      {error && (
        <MetaResultWrapper>
          <Error/>
        </MetaResultWrapper>
      )}
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
