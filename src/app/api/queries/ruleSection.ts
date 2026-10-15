import { gql, WatchQueryOptions } from "apollo-angular"

interface RuleSection_Short {
  index: string
  name: string
  desc: string
}

interface RuleSection_Detailed extends RuleSection_Short {}

export type {RuleSection_Detailed, RuleSection_Short }

export class RuleSectionQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { ruleSections: RuleSection_Short[] }>{
    return {
      query: gql`
        query($term: String) {
          ruleSections(name: $term) {
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

  static details(index: string): WatchQueryOptions<{ index: string }, { ruleSection: RuleSection_Detailed | null }>{
    return {
      query: gql`
        query($index: String) {
          ruleSection(index: $index) {
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