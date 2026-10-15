import { gql, WatchQueryOptions } from "apollo-angular"

interface MagicSchool_Detailed {
  index: string
  name: string
  desc: string
  spells: {
    index: string
    name: string
  }[]
}

interface MagicSchool_Short {
  index: string
  name: string
  desc: string
}

export type {MagicSchool_Detailed, MagicSchool_Short}

export class MagicSchoolQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { magicSchools: MagicSchool_Short[] }>{
    return {
      query: gql`
        query($term: String) {
          magicSchools(name: $term) {
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

  static details(index: string): WatchQueryOptions<{ index: string }, { magicSchool: MagicSchool_Detailed | null }>{
    return {
      query: gql`
        query($index: String) {
          magicSchool(index: $index) {
            index
            name
            desc
            spells {
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

