import CardGrid from '../components/CardGrid'
import Card from '../models/Card'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import Header from '../components/Header'
import Carousel from '../components/Carousel'

export default function MainPage() {
  const [cards, setCards] = useState([])
  const navigate = useNavigate()
  const cardIDs = ["swsh3-136", "fut2020-1", "pop3-6", "swsh1-1"]

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
    <div>
      <Header></Header>
      <Carousel></Carousel>
      <h1 className="text-3xl font-bold text-center my-6">Anuncios</h1>
      <CardGrid cards={cards} onCardClick={(card) => navigate('/compra', { state: { card } })} />
    </div>
  )
}