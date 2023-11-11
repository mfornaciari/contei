{
  description = "Contei";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem(
      system:
        let pkgs = nixpkgs.legacyPackages.${system}; in
          {
            devShells.back = import ./back/shell.nix { inherit pkgs; };
            devShells.front = import ./front/shell.nix { inherit pkgs; };
          }
    );
}
