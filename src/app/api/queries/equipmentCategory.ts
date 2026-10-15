import { gql, WatchQueryOptions } from "apollo-angular"

interface EquipmentCategory_Detailed {
  index: string
  name: string
  equipment: {
    index: string
    name: string
    rarity: undefined | "VARIES" | "COMMON" | "UNCOMMON" | "RARE" | "VERY_RARE" | "LEGENDARY" | "ARTIFACT"
  }[]
}

interface EquipmentCategory_Short {
  index: string
  name: string
}

export type {EquipmentCategory_Detailed, EquipmentCategory_Short}


export class EquipmentCategoryQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { equipmentCategories: EquipmentCategory_Short[] }>{
    return {
      query: gql`
        query q($term: String){
          equipmentCategories(name: $term) {
            index
            name
          }
        }
      `,
      variables: {
        term: term,
      },
    }
  }

  static details(index: string): WatchQueryOptions<{ index: string }, { equipmentCategory: EquipmentCategory_Detailed | null }>{
    return {
      query: gql`
        query q($index: String){
          equipmentCategory(index: $index) {
            index
            name
            equipment {
              index
              name
              ... on MagicItem {
                rarity
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

