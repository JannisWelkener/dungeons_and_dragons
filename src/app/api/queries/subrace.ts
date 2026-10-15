import { gql, WatchQueryOptions } from "apollo-angular"

interface Subrace_Detailed {
  index: string
  name: string
  desc: string
  race: {
    index: string
    name: string
  }
  racial_traits: {
    index: string
    name: string
  }[]
  starting_proficiencies: {
    index: string
    name: string
  }[]
  ability_bonuses: {
    bonus: number
    ability_score: {
      index: string
      full_name: string
    }
  }[]
  language_options: undefined | {
    choose: number
    from: {
      options: {
        item: {
          index: string
          name:string
        }
      }[]
    }
  }
}

interface Subrace_Short {
  index: string
  name: string
  desc: string
  race: {
    index: string
    name: string
  }
}

export type {Subrace_Detailed, Subrace_Short}

export class SubraceQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { subraces: Subrace_Short[] }>{
    return {
      query: gql`
        query($term: String) {
          subraces(name: $term) {
            index
            name
            desc
            race {
              index
              name
            }
          }
        }
      `,
      variables: {
        term: term,
      },
    }
  }

  static details(index: string): WatchQueryOptions<{ index: string }, { subrace: Subrace_Detailed | null }>{
    return {
      query: gql`
        query($index: String) {
          subrace(index: $index) {
            index
            name
            desc
            race {
              index
              name
            }
            racial_traits {
              index
              name
            }
            starting_proficiencies {
              index
              name
            }
            ability_bonuses {
              bonus
              ability_score {
                index
                full_name
              }
            }
          }
        }
      `, //TODO: language_options has server error!
      variables: {
        index: index,
      },
    }
  }
}