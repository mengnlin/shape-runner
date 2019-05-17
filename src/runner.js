class Runner {
  constructor() {
    // const position = Math.floor(Math.random() * (3 - 0));
    this.position = 1;
  }

  isValizd() {
    this.board.validPosition(this.position);
  }
  move() {
    // ??
  }
}

Runner.SYMBOL = "x";
Runner.JUMPS = {
  left: (Runner.position -= 1),
  right: (Runner.position += 1)
};
