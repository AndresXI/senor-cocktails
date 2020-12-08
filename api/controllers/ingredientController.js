import asyncHandler from 'express-async-handler'
import fetch from 'node-fetch'
import { generateRandomNumbers } from '../utils/utils'

const getIngredientById = asyncHandler(async (req, res) => {
  const { ingredientId } = req.params
  let data

  const response = await fetch(
    `${process.env.THE_COCKTAIL_DB_BASE_URL}/lookup.php?iid=${ingredientId}`
  )

  try {
    data = await response.json()
  } catch (err) {
    res.status(404).json({ error: 'Invalid request' })
  }

  if (data.ingredients === null) {
    res.status(404).json({ error: 'Ingredient not found' })
  }

  const ingredient = data.ingredients[0]
  const image = encodeURI(
    `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient}.png`
  )

  res.status(200).json({
    id: ingredient.idIngredient,
    name: ingredient.strIngredient,
    description: ingredient.strDescription,
    type: ingredient.strType,
    alcoholic: ingredient.strAlcohol,
    ABV: ingredient.strAVB,
    userFavorite: false,
    image,
  })
})

export const getIngredientList = asyncHandler(async (req, res) => {
  const listSelection = req.params.listSelection.toLowerCase()

  const response = await fetch(
    `${process.env.THE_COCKTAIL_DB_BASE_URL}/list.php?i=list`
  )
  const { drinks } = await response.json()

  const ingredientList = drinks.map((ingredient) => {
    const image = encodeURI(
      `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}.png`
    )
    return {
      name: ingredient.strIngredient1,
      image,
    }
  })

  switch (listSelection) {
    case 'popular':
      const topTenIngredients = ingredientList.slice(0, 10)
      return res.status(200).json(topTenIngredients)

    case 'random':
      const randomNumbers = generateRandomNumbers(10)
      const randomIngredients = randomNumbers.map((randomIndex) => {
        return ingredientList[randomIndex]
      })
      return res.status(200).json(randomIngredients)

    case 'all':
      return res.status(200).json(ingredientList)

    default:
      return res.status(404).json({ error: 'Ingredient list not found' })
  }
})

export { getIngredientById }