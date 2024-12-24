// Error
export class Left<L, R> {
  readonly value: L;

  isRight(): this is Right<L, R> {
    return false;
  }

  isLeft(): this is Left<L, R> {
    return true;
  }

  constructor(value: L) {
    this.value = value;
  }
}

// Success
export class Right<L, R> {
  readonly value: R;

  isRight(): this is Right<L, R> {
    return true;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }

  constructor(value: R) {
    this.value = value;
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value);
};

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value);
};
