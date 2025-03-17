import { makeInstaller } from '@lark-ui/utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import components from './components'
import '@lark-ui/theme/index.css'
import logLogo from './logLogo'

logLogo()
library.add(fas)

export * from '@lark-ui/components'
export default makeInstaller(components)
