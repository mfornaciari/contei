{ pkgs }:
with pkgs;
mkShell {
  buildInputs = [
    nodejs_20
  ];
}
