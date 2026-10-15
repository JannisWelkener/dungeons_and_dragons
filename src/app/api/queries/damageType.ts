import { gql, WatchQueryOptions } from "apollo-angular"

interface DamageType_Short {
  index: string
  name: string
  desc: string[]
}

interface DamageType_Detailed extends DamageType_Short {}

export type {DamageType_Detailed, DamageType_Short}

export class DamageTypeQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { damageTypes: DamageType_Short[] }>{
    return {
      query: gql`
        query q($term: String){
          damageTypes(name: $term) {
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

  static details(index: string): WatchQueryOptions<{ index: string }, { damageType: DamageType_Detailed | null }>{
    return {
      query: gql`
        query q($index: String){
          damageType(index: $index) {
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