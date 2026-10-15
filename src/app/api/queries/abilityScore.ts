import { gql, WatchQueryOptions } from "apollo-angular"

interface AbilityScore_Short {
  index: string,
  name: string,
  desc: string[],
  full_name: string,
}

interface AbilityScore_Detailed {
  index: string,
  name: string,
  desc: string[],
  full_name: string,
  skills: {
    index: string,
    name: string,
  }[]
}

export type {AbilityScore_Short, AbilityScore_Detailed}

export class AbilityScoreQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { abilityScores: AbilityScore_Short[] }>{
    return {
      query: gql`
        query q($term: String){
          abilityScores(full_name: $term) {
            index
            name
            desc
            full_name
          }
        }
      `,
      variables: {
        term: term,
      },
    }
  }

  static details(index: string): WatchQueryOptions<{ index: string }, { abilityScore: AbilityScore_Detailed | null }>{
    return {
      query: gql`
        query q($index: String){
          abilityScore(index: $index) {
            index
            name
            full_name
            desc
            skills {
              index
              name
            }
          }
        }
      `,
      variables: {
        index: index,
      },
    }
  }
}