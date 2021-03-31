import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import DrinkList from '../components/DrinkList'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { getDrinkList, searchDrinks } from '../actions/drinkActions'

const DrinkListScreen = ({
  history,
  location: { search },
  match: { params },
}) => {
  const { categoryList } = params
  const dispatch = useDispatch()

  const drinkListState = useSelector((state) => state.drinkList)
  const { drinkList, loading } = drinkListState

  const searchDrinkListState = useSelector((state) => state.searchDrinkList)
  const {
    loading: loadingSearchDrinkList,
    error: errorSearchDrinkList,
    searchDrinkList,
  } = searchDrinkListState

  let queryParams = new URLSearchParams(search)
  const ingredients = queryParams.get('ingredients')
  const category = queryParams.get('category')

  useEffect(() => {
    if (categoryList === 'similarlist') {
      dispatch(searchDrinks(ingredients, category))
    } else {
      console.log('ListScreen')
      dispatch(getDrinkList(categoryList))
    }
  }, [dispatch, categoryList, category, ingredients])

  useScrollToTop()
  console.log('ListScrenn.js', drinkList)

  return (
    <Container className='listScreenContainer'>
      <div onClick={() => history.goBack()} className='btn__goBack'>
        <i className='fas fa-chevron-left'></i>
        <span>Go back</span>
      </div>
      {loading === false || loadingSearchDrinkList === false ? (
        <DrinkList
          type='drink'
          title={drinkList.listTitle}
          drinks={
            categoryList === 'similarlist' ? searchDrinkList : drinkList.list
          }
        />
      ) : (
        ''
      )}
    </Container>
  )
}

export default DrinkListScreen
