import { App } from 'vue'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import {
  faUserTie,
  faAngleDown,
  faCompass,
  faSquare,
  faKey,
  faScrewdriverWrench,
  faHatCowboy,
  faUserLarge,
  faHouseUser,
  faSquareH,
  faSquareParking,
  faGear,
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { faSquareWebAwesome, faAmazon } from '@fortawesome/free-brands-svg-icons'
/* add icons to the library */
library.add(
  faUserTie,
  faAngleDown,
  faCompass,
  faSquare,
  faSquareWebAwesome,
  faKey,
  faScrewdriverWrench,
  faHatCowboy,
  faUserLarge,
  faHouseUser,
  faSquareH,
  faSquareParking,
  faGear,
  faAmazon,
  faArrowUpFromBracket
)

export default {
  install(app: App) {
    app.component('font-awesome-icon', FontAwesomeIcon)
  },
}
