import React, { useEffect, useState } from 'react'
import AppBar from '../../components/AppBar'
import styled from 'styled-components'
import { listMenuItems } from '../../services/menu'

const Wrapper = styled.div`
  background: ${({ theme }) => theme.desktopBackground};
  height: 100vh;
  margin: 0;
`

const Home = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await listMenuItems()
        console.log(data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchItems()
  }, [])

  return (
    <Wrapper>
      <AppBar/>
    </Wrapper>
  )
}

export default Home
