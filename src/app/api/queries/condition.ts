import { gql, WatchQueryOptions } from "apollo-angular"

interface Condition_Short {
  index: string
  name: string
  desc: string[]
}

interface Condition_Detailed extends Condition_Short {}

export type {Condition_Detailed, Condition_Short}


export class ConditionQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { conditions: Condition_Short[] }>{
    return {
      query: gql`
        query q($term: String){
          conditions(name: $term) {
            index
            name
            desc
          }
        }
      `,
      variables: {
        term: term,
      },
    }
  }

  static details(index: string): WatchQueryOptions<{ index: string }, { condition: Condition_Detailed | null }>{
    return {
      query: gql`
        query q($index: String){
          condition(index: $index) {
            index
            name
            desc
          }
        }
      `,
      variables: {
        index: index,
      },
    }
  }
}