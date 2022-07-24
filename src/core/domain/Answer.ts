export type Answer = {
  readonly questionId: string;
  readonly value: string | null;
};

export type Answers = ReadonlyArray<Answer>;
