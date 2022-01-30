import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Panel } from 'react95'

const Picture = styled.img`
  width: 300px;
  height: 300px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h2`
  font-size: 20px;
`

const MenuItem = ({ name, image }) => {
  return (
    <Panel
      variant="outside"
      shadow
      style={{ padding: '0.5rem', lineHeight: '1.5', width: 500 }}
    >
      <Content>
        <Title>{name}</Title>
        <Picture src={image}/>
      </Content>
    </Panel>
  )
}

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
}

export default MenuItem
