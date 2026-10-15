import { gql, WatchQueryOptions } from "apollo-angular"

interface Equipment_Detailed {
  index: string
  name:string
  desc: undefined | string[]
  weight:string
  quantity: undefined | number
  weapon_range: undefined | "MELEE" | "RANGED"
  special: undefined | string[]
  stealth_disadvantage: undefined | boolean
  str_minimum: undefined | number
  capacity: undefined | string
  cost: {
    quantity: number
    unit: "CP" | "SP" | "GP"
  }
  equipment_category: {
    index:string
    name:string
  }
  tool_category: undefined | {
    index: string
    name: string
  }
  gear_category: undefined | {
    index: string
    name: string
  }
  contents: undefined | {
    quantity: number
    item: {
      index: string
      name: string
    }
  }[]
  category_range: undefined | {
    index: string
    name: string
  }
  weapon_category: undefined | {
    index: string
    name: string
  }
  range: undefined | {
    normal: number
    long: number | undefined
  }
  throw_range: undefined | {
    normal: number
    long: number | undefined
  }
  properties: undefined | {
    index: string
    name: string
  }[]
  damage: undefined | {
    damage_dice: string
    damage_type: {
      index: string
      name: string
    }
  }
  two_handed_damage: undefined | {
    damage_dice: string
    damage_type: {
      index: string
      name: string
    }
  }
  armor_class: undefined | {
    dex_bonus: boolean
    base: number
    max_bonus: undefined | number
  }
  vehicle_category: undefined | {
    index: string
    name: string
  }
  speed: undefined | {
    quantity: number
    unit: string
  }
}

interface Equipment_Short {
  index: string
  name: string
  desc: undefined | string[]
  equipment_category: {
    index: string
    name: string
  }
}

export type {Equipment_Detailed, Equipment_Short}

export class EquipmentQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { equipments: Equipment_Short[] }>{
    return {
      query: gql`
        query q($term: String){
          equipments(name: $term) {
            index
            name
            desc
            equipment_category {
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

  static details(index: string): WatchQueryOptions<{ index: string }, { equipment: Equipment_Detailed | null }>{
    return {
      query: gql`
        query q($index: String){
          equipment(index: $index) {
            index
            name
            desc
            weight
            cost {
              quantity
              unit
            }
            equipment_category {
              index
              name
            }
            ... on Tool {
              tool_category {
                index
                name
              }
            }
            ... on Gear {
              gear_category {
                index
                name
              }
            }
            ... on Pack {
              contents {
                item {
                  index
                  name
                }
                quantity
              }
              gear_category {
                index
                name
              }
            }
            ... on Ammunition {
              gear_category {
                index
                name
              }
              quantity
            }
            ... on Weapon {
              category_range {
                index
                name
              }
              damage {
                damage_dice
                damage_type {
                  index
                  name
                }
              }
              properties {
                index
                name
              }
              range {
                normal
                long
              }
              special
              throw_range {
                normal
                long
              }
              two_handed_damage {
                damage_dice
                damage_type {
                  index
                  name
                }
              }
              weapon_category {
                index
                name
              }
              weapon_range
            }
            ... on Armor {
              armor_class {
                dex_bonus
                base
                max_bonus
              }
              stealth_disadvantage
              str_minimum
            }
            ... on Vehicle {
              capacity
              speed {
                quantity
                unit
              }
              vehicle_category {
                index
                name
              }
            }
            ... on IGear {
              gear_category {
                index
                name
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

  static short(index: string): WatchQueryOptions<{index: string }, { equipment: Equipment_Short | null }>{
    return {
      query: gql`
        query q($index: String){
          equipment(index: $index) {
            index
            name
            desc
            equipment_category {
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
