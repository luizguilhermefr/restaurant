import React from 'react'
import styled from 'styled-components'
import { LoadingIndicator } from 'react95'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  max-width: 400px;
`

const Loading = () => (
  <Wrapper>
    <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Loading...</p>
    <LoadingIndicator isLoading/>
  </Wrapper>
)

export default Loading