import React, { useEffect, useState } from 'react'
import AppBar from '../../components/AppBar'
import styled from 'styled-components'
import { listMenuItems } from '../../services/menu'
import MenuItem from '../../components/MenuItem'

const Wrapper = styled.div`
  background: ${({ theme }) => theme.desktopBackground};
  height: 100vh;
  margin: 0;
`

const ItemsWrapper = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`

const Home = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await listMenuItems()
        setItems(data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchItems()
  }, [])

  return (
    <Wrapper>
      <AppBar/>
      {items && items.length > 0 && <ItemsWrapper>
        {items.map(item => (
          <MenuItem name={item.name} key={item.id} image={item.image?.src}/>
        ))}
      </ItemsWrapper>}
    </Wrapper>
  )
}

export default Home
