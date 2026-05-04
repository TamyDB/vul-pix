import CardGrid from '../components/CardGrid'
import Card from '../models/Card'
import { useEffect, useState } from 'react'

export default function MainPage() {
  const [cards, setCards] = useState([])
  const cardIDs = ["swsh3-136", "fut2020-1", "pop3-6"]

  useEffect(() => {
    async function loadCards() {
      const result = await Promise.all(
        cardIDs.map(id => Card.createCard(0, id))
      )
      setCards(result)
    }

    loadCards()
  }, [])

  return (
    <>
      <div>
        <CardGrid cards={cards} />
      </div>
    </>
  )
}