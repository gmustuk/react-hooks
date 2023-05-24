import { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

function App() {
const [cards, setCards] = useState([])
    const [cardId, setCardId] = useState("")

    const initialEffect = () =>{
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => response.json())
        .then(json => {
            setCardId(json.deck_id)
        })
    }

  useEffect(initialEffect,[])

   const secondaryEffect = () => {

    if(cardId !== "") {
      fetch(`https://deckofcardsapi.com/api/deck/${cardId}/draw/?count=52`)
          .then(response => response.json())
              .then(json => {
                  setCards(json.cards)
              })
    }
   }

   useEffect(secondaryEffect, [cardId])

    console.log(cards)



  return (
    <>
        <div className="row row-cols-1 row-cols-md-2 g-4">
            {cards.map(card => <DisplayCard card={card} key={card.code} />)}
        </div>
    </>
  )
}

export default App


function DisplayCard(props) {
   const {card} = props

    return(
        <>
        <div className="col">
            <div className="card">
                <img src={card.image} className="card-img-top" alt={card.code} />
                <div className="card-body">
                    <h5 className="card-title">{card.value} {card.suit}</h5>
                </div>
            </div>
        </div>
        </>
    )
}
