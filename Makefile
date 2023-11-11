back.shell:
	cd back ;\
	nix develop ;\
	cd ..

back.dev:
	cd back ;\
	nix develop -c bash -c 'bun dev' ;\
	cd ..

back.test:
	cd back ;\
	nix develop -c bash -c 'bun test' ;\
	cd ..

front.shell:
	cd front ;\
	nix develop ;\
	cd ..

front.dev:
	cd front ;\
	nix develop -c bash -c 'npm run dev' ;\
	cd ..

front.test:
	cd front ;\
	nix develop -c bash -c 'npm run test' ;\
	cd ..
