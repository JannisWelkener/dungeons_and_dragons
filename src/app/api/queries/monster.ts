import { gql, WatchQueryOptions } from "apollo-angular";

interface Monster_Detailed {
  index: string
  name: string
  desc: undefined | string
  image: undefined | string
  type: "BEAST" | "MONSTROSITY" | "DRAGON" | "HUMANOID" | "UNDEAD" | "FIEND" | "CELESTIAL" | "CONSTRUCT" | "GIANT" | "ELEMENTAL" | "FEY" | "ABERRATION" | "OOZE" | "SWARM" | "PLANT"
  subtype: undefined | "ANY_RACE" | "HUMAN" | "DWARF" | "ELF" | "GOBLINOID" | "MERFOLK" | "SHAPECHANGER" | "DEMON" | "DEVIL" | "ORC" | "SAHUAGIN" | "TITAN" | "KOBOLD" | "GNOLL" | "GRIMLOCK" | "LIZARDFOLK" | "GNOME"
  xp: number
  armor_class: {
    type: "dex" | "natural" | "armor" | "spell" | "condition"
    value: number
    desc: undefined | string
    armor: undefined | {
      index: string
      name: string
    }[]
    condition: undefined | {
      index: string
      name: string
      desc: string[]
    }
    spell: undefined | {
      index: string
      name: string
    }
  }[]
  challenge_rating: number
  charisma: number
  constitution: number
  dexterity: number
  intelligence: number
  strength: number
  wisdom: number
  speed: {
    burrow: undefined | string
    climb: undefined | string
    fly: undefined | string
    swim: undefined | string
    walk: undefined | string
    hover: undefined | boolean
  }
  size: "TINY" | "SMALL" | "MEDIUM" | "LARGE" | "HUGE" | "GARGANTUAN"
  senses: {
    blindsight: undefined | string
    darkvision: undefined | string
    tremorsense: undefined | string
    truesight: undefined | string
    passive_perception: undefined | number
  }
  proficiencies: {
    value: number
    proficiency: {
      index: string
      name: string
    }
  }[]
  languages: string
  hit_points: number
  hit_dice: string
  hit_points_roll: string
  forms: undefined | {
    index: string
    name: string
  }[]
  reactions: undefined | {
    name: string
    desc: string
    dc: {
      success: "NONE" | "HALF" | "OTHER"
      value: number
      type: {
        index: string
        full_name: string
      }
    }
  }[]
  actions: {
    name:string
    desc:string
  }[]
  condition_immunities: {
    index: string
    name: string
    desc: string[]
  }[]
  damage_immunities: string[]
  damage_resistances: string[]
  damage_vulnerabilities: string[]
  legendary_actions: undefined | {
    name: string
    desc: string
    damage: undefined | {
      damage_dice: string
      damage_type: {
        index: string
        name: string
      }
    }
    dc: undefined | {
      value: number
      success: "NONE" | "HALF" | "OTHER"
      type: {
        index: string
        full_name: string
      }
    }
  }[]
  special_abilities: undefined | {
    name: string
    desc: string
    damage: undefined | {
      damage_dice: string
      damage_type: {
        index: string
        name: string
      }
    }
    dc: undefined | {
      value: number
      success: "NONE" | "HALF" | "OTHER"
      type: {
        index: string
        full_name: string
      }
    }
    spellcasting: undefined | {
      ability: {
        index: string
        name: string
      }
      components_required: ("V" | "S" | "M")[]
      dc: number
      level: number
      modifier: number
      school: string
    }
  }[]
}

interface Monster_Short {
  index: string;
  name: string;
  challenge_rating: number;
  desc: string;
  type: string;
}

export type {Monster_Short, Monster_Detailed}


export class MonsterQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { monsters: Monster_Short[] }>{
    return {
      query: gql`
        query search($term: String!) {
          monsters(name: $term) {
            index
            name
            challenge_rating
            desc
            type
          }
        }
      `,
      variables: {
        term: term,
      },
    }
  }

  static details(index: string): WatchQueryOptions<{ index: string }, { monster: Monster_Detailed | null }>{
    return {
      query: gql`
        query details($index: String!){
          monster(index: $index) {
            index
            name
            desc
            image
            type
            xp
            armor_class {
              type
              value
              desc
              armor {
                index
                name
              }
              condition {
                index
                name
                desc
              }
              spell {
                index
                name
              }
            }
            challenge_rating
            charisma
            constitution
            dexterity
            intelligence
            strength
            wisdom
            speed {
              burrow
              climb
              fly
              hover
              swim
              walk
            }
            size
            senses {
              blindsight
              darkvision
              passive_perception
              tremorsense
              truesight
            }
            proficiencies {
              value
              proficiency {
                index
                name
              }
            }
            languages
            hit_points
            hit_dice
            hit_points_roll
            forms {
              index
              name
            }
            reactions {
              name
              desc
              dc {
                success
                type {
                  index
                  full_name
                }
                value
              }
            }
            actions {
              name
              desc
            }
            condition_immunities {
              index
              name
              desc
            }
            damage_immunities
            damage_resistances
            damage_vulnerabilities
            legendary_actions {
              name
              desc
              damage {
                damage_type {
                  index
                  name
                }
                damage_dice
              }
              dc {
                value
                type {
                  index
                  full_name
                }
                success
              }
            }
            special_abilities {
              name
              desc
              dc {
                value
                type {
                  index
                  full_name
                }
                success
              }
              spellcasting {
                ability {
                  index
                  name
                }
                components_required
                dc
                level
                modifier
                school
              }
              damage {
                damage_type {
                  index
                  name
                }
                damage_dice
              }
            }
            subtype
          }
        }
      `,
      variables: {
        index: index,
      },
    }
  }
}
