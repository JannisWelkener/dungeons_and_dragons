import { gql, WatchQueryOptions } from "apollo-angular"

interface Race_Detailed {
  index: string
  name: string
  size: "TINY" | "SMALL" | "MEDIUM" | "LARGE" | "HUGE" | "GARGANTUAN"
  size_description: string
  age: string
  speed: number
  alignment: string
  traits: {
    index: string
    name: string
  }[]
  language_desc: string
  languages: {
    index: string
    name: string
  }[]
  language_options: undefined | {
    choose: number
    from: {
      options: {
        item: {
          index: string
          name: string
        }
      }[]
    }
  }
  ability_bonuses: {
    bonus: number
    ability_score: {
      index: string
      full_name: string
    }
  }[]
  ability_bonus_options: undefined | {
    choose: number
    from: {
      options: {
        bonus: number
        ability_score: {
          index: string
          full_name: string
        }
      }[]
    }
  }
  starting_proficiencies: {
    index: string
    name: string
  }[]
  starting_proficiency_options: undefined | {
    desc: string
  }

}

interface Race_Short {
  index: string
  name: string
  alignment: string
}

export type {Race_Detailed, Race_Short}

export class RaceQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { races: Race_Short[] }>{
    return {
      query: gql`
        query($term: String) {
          races(name: $term) {
            index
            name
            alignment
          }
        }
      `,
      variables: {
        term: term,
      },
    }
  }

  static details(index: string): WatchQueryOptions<{ index: string }, { race: Race_Detailed | null }>{
    return {
      query: gql`
        query($index: String) {
          race(index: $index) {
            index
            name
            size
            size_description
            age
            speed
            alignment
            traits {
              index
              name
            }
            subraces {
              index
              name
            }
            language_desc
            languages {
              index
              name
            }
            language_options {
              choose
              from {
                options {
                  item {
                    index
                    name
                  }
                }
              }
            }
            ability_bonuses {
              bonus
              ability_score {
                index
                full_name
              }
            }
            ability_bonus_options {
              choose
              from {
                options {
                  bonus
                  ability_score {
                    index
                    full_name
                  }
                }
              }
            }
            starting_proficiencies {
              index
              name
            }
            starting_proficiency_options {
              desc
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