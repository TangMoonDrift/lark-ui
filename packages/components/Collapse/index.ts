import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
import { withInstall } from '@lark-ui/utils'

export const LarkCollapse = withInstall(Collapse)
export const LarkCollapseItem = withInstall(CollapseItem)

export type * from './types'
