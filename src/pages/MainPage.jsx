import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TCGdex from '@tcgdex/sdk'
import Card from '../models/Card'
import CardGrid from '../components/CardGrid'
import Carousel from '../components/Carousel'
import SectionWrap from '../components/SectionWrap'
import PromoCards from '../components/PromoCards'

const tcgdex = new TCGdex('en')

export default function MainPage() {
  const [cards, setCards]     = useState([])
  const [cardIDs, setCardIds] = useState([])
  const navigate              = useNavigate()

  useEffect(() => {
    async function genCardIDsList() {
      const randomSet = await tcgdex.random.set()
      const ids = randomSet.cards.slice(0, 20).map(c => c.id)
      setCardIds(ids)
    }
    genCardIDsList()
  }, [])

  useEffect(() => {
    if (cardIDs.length === 0) return
    async function loadCards() {
      const result = await Promise.all(cardIDs.map(id => Card.createCard(0, id)))
      setCards(result)
    }
    loadCards()
  }, [cardIDs])

  return (
    <>
      <Carousel />
      <SectionWrap title="Promoções da Semana" description="Confira nossas melhores promoções!">
        <PromoCards />
      </SectionWrap>
      <SectionWrap title="Cartas em Destaque" description="As cartas mais populares do momento!">
        <CardGrid
          cards={cards}
          onCardClick={card => navigate(`/card/${card.TCGAPIID}`, { state: { card } })}
        />
      </SectionWrap>
    </>
  )
}
