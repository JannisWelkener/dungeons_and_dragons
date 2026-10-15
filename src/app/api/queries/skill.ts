import { gql, WatchQueryOptions } from "apollo-angular"

interface Skill_Short {
  index: string
  name: string
  desc: string[]
  ability_score: {
    index: string
    full_name: string
  }
}

interface Skill_Detailed extends Skill_Short {}

export type {Skill_Detailed, Skill_Short }


export class SkillQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { skills: Skill_Short[] }>{
    return {
      query: gql`
        query($term: String) {
          skills(name: $term) {
            index
            name
            desc
            ability_score {
              index
              full_name
            }
          }
        }
      `,
      variables: {
        term: term,
      },
    }
  }

  static details(index: string): WatchQueryOptions<{ index: string }, { skill: Skill_Detailed | null }>{
    return {
      query: gql`
        query($index: String) {
          skill(index: $index) {
            index
            name
            desc
            ability_score {
              index
              full_name
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