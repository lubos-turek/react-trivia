import Question from "./Question"

type Store = {
  latestQuizResults?: Question[]
}

export type Action<Payload> = {
  type: string;
  payload: Payload;
}

export default Store