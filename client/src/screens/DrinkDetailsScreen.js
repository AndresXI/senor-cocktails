import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

import { getDrinkDetails } from '../actions/drinkActions'

const DrinkDetailsScreen = ({ match, history }) => {
  const { drinkId } = match.params
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDrinkDetails(drinkId))
  }, [dispatch, drinkId])

  return (
    <Container className='drinkContainer'>
      <Row>
        <Col md={6}>
          <h1>drink imag</h1>
        </Col>
        <Col md={6}>
          <h1>ingredients</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default DrinkDetailsScreen
