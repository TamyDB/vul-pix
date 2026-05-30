import TCGdex from "@tcgdex/sdk"

const tcgdex = new TCGdex("en")

export default class Card {
  constructor(init) {
    this.TCGAPIID       = init.TCGAPIID
    this.TCGAPI         = init.TCGAPI
    this.image          = init.image
    this.name           = init.name
    this.price          = init.price
    this.rarity         = init.rarity
    this.description    = init.description
    // Rich fields from API
    this.hp             = init.hp
    this.types          = init.types          ?? []
    this.stage          = init.stage
    this.evolveFrom     = init.evolveFrom
    this.attacks        = init.attacks        ?? []
    this.weaknesses     = init.weaknesses     ?? []
    this.retreat        = init.retreat
    this.set            = init.set
    this.illustrator    = init.illustrator
    this.variants       = init.variants
    this.regulationMark = init.regulationMark
  }

  static async createCard(price, id) {
    const d = await tcgdex.fetch("cards", id)
    if (!d) throw new Error(`Carta não encontrada: ${id}`)

    return new Card({
      TCGAPIID:       d.id,
      TCGAPI:         "TCGdex",
      image:          `${d.image}/high.png`,
      name:           d.name,
      price:          price,
      rarity:         d.rarity,
      description:    d.description ?? "Sem descrição disponível.",
      hp:             d.hp,
      types:          d.types          ?? [],
      stage:          d.stage,
      evolveFrom:     d.evolveFrom,
      attacks:        d.attacks        ?? [],
      weaknesses:     d.weaknesses     ?? [],
      retreat:        d.retreat,
      set:            d.set,
      illustrator:    d.illustrator,
      variants:       d.variants,
      regulationMark: d.regulationMark,
    })
  }
}
