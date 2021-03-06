import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Pagination from './Pagination'
import { useScrollToTop } from '../hooks/useScrollToTop'

const ItemList = ({ title, items, itemType }) => {
  const [itemsPerPage] = useState(12)
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  let renderItems = []
  if (items) {
    renderItems = items.slice(indexOfFirstItem, indexOfLastItem)
  }

  const getItemsTotal = (items) => {
    if (items) {
      return items.length
    }
  }

  useScrollToTop(currentPage)

  return (
    <>
      <div className='itemListContainer'>
        <h2>{title}</h2>
        <Row className='itemListContainer__list'>
          {renderItems.map((item) => (
            <Link key={item._id} to={`/drink/${item._id}`}>
              <Col className='itemListContainer__wrapper' key={item._id}>
                <img
                  className='itemListContainer__image'
                  src={item.image}
                  alt='dr'
                />
                <p className='itemListContainer__name'>{item.name}</p>
              </Col>
            </Link>
          ))}
        </Row>
      </div>
      <Pagination
        totalItems={getItemsTotal(items)}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default ItemList

ItemList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  itemType: PropTypes.string,
}
