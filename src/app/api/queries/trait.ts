import { gql, WatchQueryOptions } from "apollo-angular"

interface Trait_Detailed {
  index: string
  name: string
  desc: string[]
  parent: undefined | {
    index: string
    name: string
  }
  proficiencies: {
    index: string
    name: string
  }[]
  races: {
    index: string
    name: string
  }[]
  subraces: {
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
  proficiency_choices: undefined | {
    choose: number
    from: {
      options: {
        item: undefined | {
          index: string
          name: string
        }
        choice: undefined | {
          choose: number
          from: {
            options: {
              item: undefined | {
                index: string
                name: string
              }
            }
          }
        }
      }
    }
  }
  trait_specific: undefined | {
    damage_type: undefined | {
      index: string
      name: string
    }
    spell_options: undefined | {
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
    subtrait_options: undefined | {
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
    breath_weapon: undefined | {
      name: string
      desc: string
    }
  }
}

interface Trait_Short {
  index: string
  name: string
  desc: string[]
  parent: undefined | {
    index: string
    name: string
  }
}

export type {Trait_Detailed, Trait_Short}

export class TraitQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { traits: Trait_Short[] }>{
    return {
      query: gql`
        query($term: String) {
          traits(name: $term) {
            index
            name
            desc
            parent {
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

  static details(index: string): WatchQueryOptions<{ index: string }, { trait: Trait_Detailed | null }>{
    return {
      query: gql`
        query($index: String) {
          trait(index: $index) {
            index
            name
            desc
            parent {
              index
              name
            }
            proficiencies {
              index
              name
            }
            races {
              index
              name
            }
            subraces {
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
            proficiency_choices {
              choose
              from {
                options {
                  ... on ProficiencyReferenceOption {
                    item {
                      index
                      name
                    }
                  }
                  ... on ProficiencyChoiceOption {
                    choice {
                      choose
                      from {
                        options {
                          ... on ProficiencyReferenceOption {
                            item {
                              index
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            trait_specific {
              damage_type {
                index
                name
              }
              spell_options {
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
              subtrait_options {
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
              breath_weapon {
                name
                desc
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