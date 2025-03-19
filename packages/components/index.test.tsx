import type { Plugin } from 'vue'
import { describe, it, expect } from 'vitest'
import {
	LarkAlert,
	LarkButton,
	LarkButtonGroup,
	LarkCollapse,
	LarkCollapseItem,
	// LarkDropdown,
	// LarkDropdownItem,
	// LarkForm,
	// LarkFormItem,
	LarkIcon
	// LarkInput,
	// LarkLoading,
	// LarkLoadingDirective,
	// LarkLoadingService,
	// LarkMessage,
	// LarkMessageBox,
	// LarkNotification,
	// LarkOption,
	// LarkPopconfirm,
	// LarkSelect,
	// LarkSwitch,
	// LarkTooltip,
	// LarkUpload
} from './index'
import { map, get } from 'lodash-es'

const components = [
	LarkButton,
	LarkButtonGroup,
	LarkCollapse,
	LarkCollapseItem,
	LarkIcon,
	// LarkDropdown,
	// LarkDropdownItem,
	// LarkTooltip,
	// LarkMessage,
	// LarkInput,
	// LarkSwitch,
	// LarkSelect,
	// LarkOption,
	// LarkForm,
	// LarkFormItem,
	LarkAlert
	// LarkNotification,
	// LarkLoading,
	// LarkUpload,
	// LarkPopconfirm,
	// LarkMessageBox
] as Plugin[]

describe('components/index.ts', () => {
	it.each(map(components, c => [get(c, 'name') ?? '', c]))(
		'%s should be exported',
		(_, component) => {
			expect(component).toBeDefined()
			expect(component.install).toBeDefined()
		}
	)

	// it('LarkLoadingService and LarkLoadingDirective should be exported', () => {
	// 	expect(LarkLoadingService).toBeDefined()
	// 	expect(LarkLoadingDirective).toBeDefined()
	// })
})
