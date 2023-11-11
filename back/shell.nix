{ pkgs }:
with pkgs;
mkShell {
  buildInputs = [
    bun
  ];
}
