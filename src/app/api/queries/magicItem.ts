import { gql, WatchQueryOptions } from "apollo-angular"

interface MagicItem_Short {
  index: string
  name: string
  desc: string[]
  equipment_category: {
    index: string
    name: string
  }
  rarity: "VARIES" | "COMMON" | "UNCOMMON" | "RARE" | "VERY_RARE" | "LEGENDARY" | "ARTIFACT"
}

interface MagicItem_Detailed extends MagicItem_Short {}

export type { MagicItem_Detailed, MagicItem_Short }

export class MagicItemQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { magicItems: MagicItem_Short[] }>{
    return {
      query: gql`
        query($term: String) {
          magicItems(name: $term) {
            index
            name
            desc
            equipment_category {
              index
              name
            }
            rarity
          }
        }
      `,
      variables: {
        term: term,
      },
    }
  }

  static details(index: string): WatchQueryOptions<{ index: string }, { magicItem: MagicItem_Detailed | null }>{
    return {
      query: gql`
        query($index: String) {
          magicItem(index: $index) {
            index
            name
            desc
            equipment_category {
              index
              name
            }
            rarity
          }
        }
      `,
      variables: {
        index: index,
      },
    }
  }

  static short(index: string): WatchQueryOptions<{ index: string }, { magicItem: MagicItem_Short | null }>{
    return {
      query: gql`
        query($index: String) {
          magicItem(index: $index) {
            index
            name
            desc
            equipment_category {
              index
              name
            }
            rarity
          }
        }
      `,
      variables: {
        index: index,
      },
    }
  }
}


