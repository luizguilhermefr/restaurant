import React from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { styleReset } from 'react95'
import original from 'react95/dist/themes/original'

import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2'
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2'

import Home from './containers/Home'
import Cart from './containers/Cart'
import { CartContextProvider } from './context/CartContext'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }

  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }

  body {
    font-family: 'ms_sans_serif';
    background: ${original.desktopBackground};
  }

  ${styleReset}
`

const Main = styled.div`
  height: 100vh;
  width: 100vw;
`

function App () {
  return (
    <Main>
      <GlobalStyles/>
      <ThemeProvider theme={original}>
        <CartContextProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </CartContextProvider>
      </ThemeProvider>
    </Main>
  )
}

export default App
