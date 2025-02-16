import { makeInstaller } from '@lark-ui/utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import components from './components'
import '@lark-ui/theme/index.css'

library.add(fas)

export default makeInstaller(components)

export * from '@lark-ui/components'
