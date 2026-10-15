import { gql, WatchQueryOptions } from "apollo-angular"

interface Proficiency_Detailed {
  index: string
  name: string
  type: "WEAPONS" | "ARTISANS_TOOLS" | "SKILLS" | "ARMOR" | "MUSICAL_INSTRUMENTS" | "SAVING_THROWS" | "OTHER" | "GAMING_SETS" | "VEHICLES"
  classes: {
    index: string
    name: string
  }[]
  races: {
    index: string
    name: string
    race: undefined | {index: string} //only, if its a subrace!
  }[]
}

interface Proficiency_Short {
  index: string
  name: string
  type: "WEAPONS" | "ARTISANS_TOOLS" | "SKILLS" | "ARMOR" | "MUSICAL_INSTRUMENTS" | "SAVING_THROWS" | "OTHER" | "GAMING_SETS" | "VEHICLES"
}

export type {Proficiency_Detailed, Proficiency_Short}

export class ProficiencyQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { proficiencies: Proficiency_Short[] }>{
    return {
      query: gql`
        query($term: String) {
          proficiencies(name: $term) {
            index
            name
            type
          }
        }
      `,
      variables: {
        term: term,
      },
    }
  }

  static details(index: string): WatchQueryOptions<{ index: string }, { proficiency: Proficiency_Detailed | null }>{
    return {
      query: gql`
        query($index: String) {
          proficiency(index: $index) {
            index
            name
            type
            classes {
              index
              name
            }
            races {
              index
              name
              ... on Subrace {
                race {
                  index
                }
              }
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
