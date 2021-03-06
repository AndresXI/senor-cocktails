import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

import { getIngredientDetails } from '../actions/ingredientActions'
import { searchDrinks } from '../actions/drinkActions'
import { useViewport } from '../hooks/useViewport'
import Slider from '../components/Slider'
import LoadingSpinner from '../components/LoadingSpinner'

const IngredientScreen = ({ match, history }) => {
  const { ingredientId } = match.params
  const [windowDimensions] = useViewport()
  const dispatch = useDispatch()

  const ingredientDetailsState = useSelector((state) => state.ingredientDetails)
  const { loading, error, ingredientDetails } = ingredientDetailsState

  const searchDrinkListState = useSelector((state) => state.searchDrinkList)
  const {
    loading: loadingSearchDrinkList,
    error: errorSearchDrinkList,
    searchDrinkList,
  } = searchDrinkListState

  const [expandText, setExpandText] = useState(false)

  // fetch ingredients details
  useEffect(() => {
    dispatch(getIngredientDetails(ingredientId))
  }, [dispatch, ingredientId])

  // fetch drinks that include fetched ingredient
  useEffect(() => {
    if (ingredientDetails.name) {
      dispatch(searchDrinks(ingredientDetails.name))
    }
  }, [dispatch, ingredientDetails])

  const truncateText = (text, isExpanded) => {
    if (text.length > 1000) {
      return !isExpanded ? text.substring(0, 900) : text
    }
    return text
  }

  return (
    <>
      <Container className='ingredientContainer'>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Row>
              <Col md={12}>
                <div onClick={() => history.goBack()} className='btn__goBack'>
                  <i className='fas fa-chevron-left'></i>
                  <span>Go back</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={ingredientDetails.description ? 4 : 12}>
                <div className='ingredientContainer__left'>
                  <h1>{ingredientDetails.name}</h1>
                  <img src={ingredientDetails.image} alt={'ingredient'} />
                  <button className='button btn__primary'>
                    Add to my ingredients
                  </button>
                </div>
              </Col>
              <Col md={8}>
                <div className='ingredientContainer__right'>
                  {ingredientDetails.type && (
                    <div className='typeContent'>
                      <h2>Type</h2>
                      <p>{ingredientDetails.type}</p>
                    </div>
                  )}
                  {ingredientDetails.description && (
                    <>
                      <h2>Description</h2>
                      {ingredientDetails.description.length > 1000 ? (
                        <p>
                          {truncateText(
                            ingredientDetails.description,
                            expandText
                          )}
                          <span
                            className='truncateText'
                            onClick={() => setExpandText(!expandText)}
                          >
                            {!expandText ? '...See more' : '  See less'}
                          </span>
                        </p>
                      ) : (
                        <p>{ingredientDetails.description}</p>
                      )}
                    </>
                  )}
                </div>
              </Col>
            </Row>

            {loadingSearchDrinkList ? (
              <LoadingSpinner />
            ) : (
              <Slider
                categoryList={'similarlist'}
                drinkCategory={''}
                ingredients={ingredientDetails.name}
                items={searchDrinkList.drinks.slice(0, 10)}
                itemType={'drink'}
                title={searchDrinkList.listTitle}
              />
            )}
          </>
        )}
      </Container>
    </>
  )
}

export default IngredientScreen
