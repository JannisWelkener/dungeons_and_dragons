import { gql, WatchQueryOptions } from "apollo-angular"

interface WeaponProperty_Short {
  index: string
  name: string
  desc: string[]
}

interface WeaponProperty_Detailed extends WeaponProperty_Short {}

export type {WeaponProperty_Detailed, WeaponProperty_Short}

export class WeaponPropertyQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { weaponProperties: WeaponProperty_Short[] }>{
    return {
      query: gql`
        query($term: String) {
          weaponProperties(name: $term) {
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

  static details(index: string): WatchQueryOptions<{ index: string }, { weaponProperty: WeaponProperty_Detailed | null }>{
    return {
      query: gql`
        query($index: String) {
          weaponProperty(index: $index) {
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
