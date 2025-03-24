export default function () {
	if (__PROD__) {
		const logo = `
		   🥚🔥🍳 Hello, Arcade Mead 🌟🔭🦉
┈═┈═┈═┈═┈═┈═┈═ 🦋 ═┈═┈═┈═┈═┈═┈═┈
 🌻 La luz de la luna te corona. ¡Señorita Sun! 🌻
┈═┈═┈═┈═┈═┈═┈═ 🦋 ═┈═┈═┈═┈═┈═┈═┈
			      author: 心海线
`

		const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`

		console.info(`%c${logo}`, rainbowGradient)
	} else if (__DEV__) {
		console.log('LarkUI]:dev mode...')
	}
}
