import { gql, WatchQueryOptions } from "apollo-angular"

interface Background_Detailed {
  index: string
  name: string
  bonds: {
    choose: number
    from: {
      options: {
        string: string
      }[]
    }
  }
  feature: {
    name: string
    desc: string[]
  }
  flaws: {
    choose: number
    from: {
      options: {
        string: string
      }[]
    }
  }
  ideals: {
    choose: number
    from: {
      options: {
        desc: string
        alignments: {
          index: string
          name: string
        }[]
      }[]
    }
  }
  language_options: {
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
  personality_traits: {
    choose: number
    from: {
      options: {
        string: string
      }[]
    }
  }
  starting_equipment: {
    quantity: number
    equipment :{
      name: string
      index: string
    }
  }[]
  starting_equipment_options: {
    choose: number
    from: {
      equipment_category: {
        index: string
        name: string
      }
    }
  }[]
  starting_proficiencies: {
    index: string
    name: string
  }[]
}

interface Background_Short {
  index: string
  name: string
  feature: {
    name: string
    desc: string[]
  }
}

export type {Background_Detailed, Background_Short}

export class BackgroundQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { backgrounds: Background_Short[] }>{
    return {
      query: gql`
        query q($term: String!){
          backgrounds(name: $term) {
            index
            name
            feature {
              name
              desc
            }
          }
        }
      `,
      variables: {
        term: term,
      },
    }
  }

  static details(index: string): WatchQueryOptions<{ index: string }, { background: Background_Detailed | null }>{
    return {
      query: gql`
        query q($index: String!){
          background(index: $index) {
            index
            name
            bonds {
              choose
              from {
                options {
                  string
                }
              }
            }
            feature {
              name
              desc
            }
            flaws {
              choose
              from {
                options {
                  string
                }
              }
            }
            ideals {
              choose
              from {
                options {
                  desc
                  alignments {
                    index
                    name
                  }
                }
              }
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
            personality_traits {
              choose
              from {
                options {
                  string
                }
              }
            }
            starting_equipment {
              quantity
              equipment {
                name
                index
              }
            }
            starting_equipment_options {
              choose
              from {
                equipment_category {
                  index
                  name
                }
              }
            }
            starting_proficiencies {
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


