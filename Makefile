shell:
	nix develop

dev:
	nix develop -c bash -c 'npm run dev'

test:
	nix develop -c bash -c 'npm run test'
