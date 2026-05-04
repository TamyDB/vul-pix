export default class Card {
    /**
    * @param {Object}  init - O objeto de inicialização
    * @param {string} init.TCGAPIID - O ID da carta na API.
    * @param {string} init.TCGAPI - De qual API a carta vem.
    * @param {string} init.image - Ilustração da Carta.
    * @param {string} init.name - Nome da Carta.
    * @param {number} init.price - Preço da Carta.
    * @param {string} init.rarity - Raridade da Carta
    */
    constructor(init) {
        this.TCGAPIID = init.TCGAPIID
        this.TCGAPI = init.TCGAPI
        this.image = init.image
        this.name = init.name
        this.price = init.price
        this.rarity = init.rarity
    }

    static async createCard(price, id) {
        const url = `https://api.tcgdex.net/v2/en/cards/${id}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Status da Resposta: ${response.status}`)
        }

        const cardData = await response.json()
        const card = new Card({
            TCGAPIID: cardData.id,
            TCGAPI: "PokeTCG",
            image: `${cardData.image}/high.png`,
            name: cardData.name,
            price: price,
            rarity: cardData.rarity
        })

        return card
    }
}

// let pikachu = new Card()

/* 
    Template de Resposta da API
    {
  "category": "Pokemon",
  "id": "swsh3-136",
  "illustrator": "tetsuya koizumi",
  "image": "https://assets.tcgdex.net/en/swsh/swsh3/136",
  "localId": "136",
  "name": "Furret",
  "rarity": "Uncommon",
  "set": {
    "cardCount": {
      "official": 189,
      "total": 201
    },
    "id": "swsh3",
    "logo": "https://assets.tcgdex.net/en/swsh/swsh3/logo",
    "name": "Darkness Ablaze",
    "symbol": "https://assets.tcgdex.net/univ/swsh/swsh3/symbol"
  },
  "variants": {
    "firstEdition": false,
    "holo": false,
    "normal": true,
    "reverse": true,
    "wPromo": false
  },
  "hp": 110,
  "types": [
    "Colorless"
  ],
  "evolveFrom": "Sentret",
  "description": "It makes a nest to suit its long and skinny body. The nest is impossible for other Pokémon to enter.",
  "stage": "Stage1",
  "attacks": [
    {
    "cost": [
      "Colorless"
    ],
    "name": "Feelin' Fine",
    "effect": "Draw 3 cards."
    },
    {
    "cost": [
      "Colorless"
    ],
    "name": "Tail Smash",
    "effect": "Flip a coin. If tails, this attack does nothing.",
    "damage": 90
    }
  ],
  "weaknesses": [
    {
      "type": "Fighting",
      "value": "×2"
    }
  ],
  "retreat": 1,
  "regulationMark": "D",
  "legal": {
    "standard": true,
    "expanded": true
  }
}
*/