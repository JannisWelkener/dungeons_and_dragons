import { gql, WatchQueryOptions } from "apollo-angular"

interface Rule_Detailed {
  index: string
  name: string
  desc: string
  subsections: {
    index: string
    name: string
  }[]
}

interface Rule_Short {
  index: string
  name: string
  desc: string
}

export type {Rule_Detailed, Rule_Short}

export class RuleQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { rules: Rule_Short[] }>{
    return {
      query: gql`
        query($term: String) {
          rules(name: $term) {
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

  static details(index: string): WatchQueryOptions<{ index: string }, { rule: Rule_Detailed | null }>{
    return {
      query: gql`
        query($index: String) {
          rule(index: $index) {
            index
            name
            desc
            subsections {
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