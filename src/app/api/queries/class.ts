import { gql, WatchQueryOptions } from "apollo-angular"

interface Class_Detailed {
  index: string
  name: string
  hit_die: number
  spells: {
    index: string
    name: string
  }[]
  starting_equipment: {
    quantity: number
    equipment: {
      index: string
      name: string
    }
  }[]
  starting_equipment_options: {
    desc: string
  }[]
  subclasses: {
    index: string
    name: string
  }[]
  spellcasting: undefined | {
    level: number
    spellcasting_ability: {
      index: string
      name: string
    }
  }
  saving_throws: {
    index: string
    full_name: string
  }[]
  proficiencies: {
    name: string
    index: string
  }[]
  proficiency_choices: {
    desc: string
    choose: number
  }[]
}

interface Class_Short {
  index: string
  name: string
  subclasses: {
    index: string
    name: string
  }[]
}

export type {Class_Detailed, Class_Short}


export class ClassQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { classes: Class_Short[] }>{
    return {
      query: gql`
        query q($term: String!){
          classes(name: $term) {
            index
            name
            subclasses {
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

  static details(index: string): WatchQueryOptions<{ index: string }, { class: Class_Detailed | null }>{
    return {
      query: gql`
        query q($index: String!){
          class(index: $index) {
            index
            name
            hit_die
            spells {
              index
              name
            }
            starting_equipment {
              quantity
              equipment {
                index
                name
              }
            }
            starting_equipment_options {
              desc
            }
            subclasses {
              index
              name
            }
            spellcasting {
              level
              spellcasting_ability {
                index
                name
              }
            }
            saving_throws {
              index
              full_name
            }
            proficiencies {
              name
              index
            }
            proficiency_choices {
              desc
              choose
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