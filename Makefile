back.shell:
	cd back ;\
	nix develop .#back;\
	cd ..

back.dev:
	cd back ;\
	nix develop .#back -c bash -c 'bun dev' ;\
	cd ..

back.test:
	cd back ;\
	nix develop .#back -c bash -c 'bun test' ;\
	cd ..

front.shell:
	cd front ;\
	nix develop .#front;\
	cd ..

front.dev:
	cd front ;\
	nix develop .#front -c bash -c 'bun dev' ;\
	cd ..

front.test:
	cd front ;\
	nix develop .#front -c bash -c 'bun test' ;\
	cd ..
