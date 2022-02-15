import Cards from 'react-credit-cards'
import { cards } from "../../data/data"
import { Card} from '../../models/models'
import styles from './styles'

const CardsComponent = () => {
    return (
      <div style={styles.cards}>
          {
              cards.map((e:Card)=><div key={e.cardID}><Cards 
              cvc={e.maskedCardNumber}
              expiry={e.expireDate}
              name={'card'}
              number={e.cardAccount}
           
           /></div>)
          } 
      </div>
    )
}

export default CardsComponent