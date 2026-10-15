import { gql, WatchQueryOptions } from "apollo-angular"

interface Subclass_Detailed {
  index: string
  name: string
  desc: string[]
  class: {
    index: string
    name: string
  }
  subclass_flavor: string
  spells: undefined | {
    prerequisites: {
      index: string
      name: undefined | string //Feature-Requirement
      level: undefined | number //Level-Requirement
    }[]
    spell: {
      index: string
      name: string
    }
  }[]
  subclass_levels: {
    index: string
    level: string
  }[]
}

interface Subclass_Short {
  index: string
  name: string
  class: {
    index: string
    name: string
  }
  subclass_flavor: string
  desc: string[]
}

export type {Subclass_Detailed, Subclass_Short}

export class SubclassQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { subclasses: Subclass_Short[] }>{
    return {
      query: gql`
        query($term: String) {
          subclasses(name: $term) {
            index
            name
            desc
            class {
              index
              name
            }
            subclass_flavor
          }
        }
      `,
      variables: {
        term: term,
      },
    }
  }

  static details(index: string): WatchQueryOptions<{ index: string }, { subclass: Subclass_Detailed | null }>{
    return {
      query: gql`
        query($index: String) {
          subclass(index: $index) {
            index
            name
            desc
            class {
              index
              name
            }
            subclass_flavor
            spells {
              prerequisites {
                ... on Feature {
                  index
                  name
                }
                ... on Level {
                  index
                  level
                }
              }
              spell {
                index
                name
              }
            }
            subclass_levels {
              index
              level
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