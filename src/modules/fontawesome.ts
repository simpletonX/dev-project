import { App } from 'vue'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import {
  // faUserSecret,
  // faFontAwesome,
  // faEarthAmericas,
  // faAngleRight,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
// library.add(faUserSecret, faFontAwesome, faEarthAmericas, faAngleRight, faUserTie)
library.add(faUserTie)

export default {
  install(app: App) {
    app.component('font-awesome-icon', FontAwesomeIcon)
  },
}
