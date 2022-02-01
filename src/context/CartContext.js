import React, { useState } from 'react'

export const CartContext = React.createContext({
  items: [],
  setItems: () => {}
})

export const CartContextProvider = (props) => {
  const setItems = (items) => {
    setState({ ...state, items })
  }

  const initState = {
    items: [],
    setItems
  }

  const [state, setState] = useState(initState)

  return (
    <CartContext.Provider value={state}>
      {props.children}
    </CartContext.Provider>
  )
}
