import { gql, WatchQueryOptions } from "apollo-angular"

interface Feature_Detailed {
  index: string
  name: string
  level: number
  desc: string[]
  parent: undefined | {
    index: string
    name: string
  }
  class: {
    index: string
    name: string
  }
  subclass: undefined | {
    index: string
    name: string
  }
  prerequisites: {
    type: "level" | "feature" | "spell"
    level: undefined | number
    feature: undefined | {
      index: string
      name: string
    }
    spell: undefined | {
      index: string
      name: string
    }
  }[]
  feature_specific: undefined | {
    invocations: undefined | {
      name: string
      index: string
    }[]
    subfeature_options: undefined | {
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
    expertise_options: undefined | {
      choose: number
      from: {
        options: {
          item: undefined | {
            index: string
            name: string
          }
          items: undefined | {
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
                }[]
              }
            }
          }[]
          choice: undefined | {
            choose: number
            from: {
              options: {
                item: undefined | {
                  index: string
                  name: string
                }
              }[]
            }
          }
        }[]
      }
    }
  }
}

interface Feature_Short {
  index: string
  name: string
  level: number
  desc: string[]
  class: {
    index: string
    name: string
  }
}

export type {Feature_Detailed, Feature_Short}


export class FeatureQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { features: Feature_Short[] }>{
    return {
      query: gql`
        query q($term: String){
          features(name: $term) {
            index
            name
            level
            desc
            class {
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

  static details(index: string): WatchQueryOptions<{ index: string }, { feature: Feature_Detailed | null }>{
    return {
      query: gql`
        query q($index: String){
          feature(index: $index) {
            index
            name
            level
            desc
            parent {
              index
              name
            }
            class {
              index
              name
            }
            subclass {
              index
              name
            }
            prerequisites {
              type
              level
              feature {
                index
                name
              }
              spell {
                index
                name
              }
            }
            feature_specific {
              invocations {
                name
                index
              }
              subfeature_options {
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
              expertise_options {
                choose
                from {
                  options {
                    ... on ExpertiseMultipleOption {
                      items {
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
                                    name
                                    index
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    ... on ProficiencyChoiceOption {
                      choice {
                        choose
                        desc
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
      `,
      variables: {
        index: index,
      },
    }
  }
}
