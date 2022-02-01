import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Fieldset, Table, TableBody, TableDataCell, TableHead, TableHeadCell, TableRow } from 'react95'
import { useNavigate } from 'react-router-dom'

import { listOrders } from '../../services/menu'
import formatCurrency from '../../utils/formatCurrency'

import Window from '../../components/Window'
import Loading from '../../components/Loading'
import Error from '../../components/Error'

const Items = styled.div`
  //
`

const MetaResultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const data = await listOrders()
        setError(false)
        setOrders(data)
      } catch (e) {
        setError(true)
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [setOrders, setLoading, setError])

  const noOrders = orders.length === 0

  return (
    <Window title="orders.exe" onClose={() => navigate(-1)}>
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
      {!loading && (
        <Items>
          {noOrders && 'No orders yet.'}
          {orders.map(order => (
            <Fieldset key={order.id} label={`Order: ${order.id} (${formatCurrency(order.total)})`}>
              <Table>
                <TableHead>
                  <TableRow head>
                    <TableHeadCell>Product</TableHeadCell>
                    <TableHeadCell>Quantity</TableHeadCell>
                    <TableHeadCell>Price</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map(item => (
                    <TableRow key={item.item.id}>
                      <TableDataCell>
                        {item.item.name}
                      </TableDataCell>
                      <TableDataCell>
                        {item.quantity}
                      </TableDataCell>
                      <TableDataCell>
                        {formatCurrency(item.price)}
                      </TableDataCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Fieldset>
          ))}
        </Items>
      )}
    </Window>
  )
}

export default Orders
