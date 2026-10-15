import { gql, WatchQueryOptions } from "apollo-angular"

interface Feat_Detailed {
  index: string
  name: string
  desc: string[]
  prerequisites: {
    ability_score: {
      index: string
      full_name: string
    }
    minimum_score: number
  }[]
}

interface Feat_Short {
  index: string
  name: string
  desc: string[]
}

export type {Feat_Detailed, Feat_Short}


export class FeatQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { feats: Feat_Short[] }>{
    return {
      query: gql`
        query q($term: String){
          feats(name: $term) {
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

  static details(index: string): WatchQueryOptions<{ index: string }, { feat: Feat_Detailed | null }>{
    return {
      query: gql`
        query q($index: String){
          feat(index: $index) {
            index
            name
            desc
            prerequisites {
              ability_score {
                index
                full_name
              }
              minimum_score
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
