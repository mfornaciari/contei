shell:
	nix develop

back.dev:
	nix develop -c bash -c 'cd back && npm run dev'

back.test:
	nix develop -c bash -c 'cd back && npm run test'
