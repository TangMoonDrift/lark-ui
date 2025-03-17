export default function () {
	if (PROD) {
		const logo = `
 ___           ________      ________      ___  __            ___  ___      ___     
|\  \         |\   __  \    |\   __  \    |\  \|\  \         |\  \|\  \    |\  \    
\ \  \        \ \  \|\  \   \ \  \|\  \   \ \  \/  /|_       \ \  \\\  \   \ \  \   
 \ \  \        \ \   __  \   \ \   _  _\   \ \   ___  \       \ \  \\\  \   \ \  \  
  \ \  \____    \ \  \ \  \   \ \  \\  \|   \ \  \\ \  \       \ \  \\\  \   \ \  \ 
   \ \_______\   \ \__\ \__\   \ \__\\ _\    \ \__\\ \__\       \ \_______\   \ \__\
    \|_______|    \|__|\|__|    \|__|\|__|    \|__| \|__|        \|_______|    \|__|
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
	} else if (DEV) {
		console.log('LarkUI]:dev mode...')
	}
}
