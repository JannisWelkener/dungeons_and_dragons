import { gql, WatchQueryOptions } from "apollo-angular"

interface Level_Detailed {
  index: string
  level: number
  class: {
    index: string
    name: string
  }
  subclass: undefined | {
    index: string
    name: string
  }
  ability_score_bonuses: undefined | number
  prof_bonus: undefined | number
  spellcasting: undefined | {
    cantrips_known: undefined | number
    spell_slots_level_1: undefined | number
    spell_slots_level_2: undefined | number
    spell_slots_level_3: undefined | number
    spell_slots_level_4: undefined | number
    spell_slots_level_5: undefined | number
    spell_slots_level_6: undefined | number
    spell_slots_level_7: undefined | number
    spell_slots_level_8: undefined | number
    spell_slots_level_9: undefined | number
    spells_known: undefined | number
  }
  features: {
    index: string
    name: string
  }[]
  class_specific: undefined | {
    //Barbarian
    brutal_critical_dice: undefined | number
    rage_count: undefined | number
    rage_damage_bonus: undefined | number

    //Bard
    bardic_inspiration_die: undefined | number
    magical_secrets_max_5: undefined | number
    magical_secrets_max_7: undefined | number
    magical_secrets_max_9: undefined | number
    song_of_rest_die: undefined | number

    //Cleric
    channel_divinity_charges: undefined | number
    destroy_undead_cr: undefined | number

    // DruidSpecific {
    wild_shape_fly: undefined | boolean
    wild_shape_max_cr: undefined | number
    wild_shape_swim: undefined | boolean

    // FighterSpecific {
    action_surges: undefined | number
    extra_attacks: undefined | number
    indomitable_uses: undefined | number

    // MonkSpecific {
    ki_points: undefined | number
    martial_arts: undefined | {
      dice_count: number
      dice_value: number
    }
    unarmored_movement: undefined | number

    // PaladinSpecific {
    aura_range: undefined | number

    // ... on RangerSpecific {
    favored_enemies: undefined | number
    favored_terrain: undefined | number

    // RogueSpecific {
    sneak_attack: undefined | {
      dice_count: number
      dice_value: number
    }

    // SorcererSpecific {
    creating_spell_slots: undefined | {
      sorcery_point_cost: number
      spell_slot_level: number
    }[]
    metamagic_known: undefined | number
    sorcery_points: undefined | number

    // WarlockSpecific {
    invocations_known: undefined | number
    mystic_arcanum_level_6: undefined | number
    mystic_arcanum_level_7: undefined | number
    mystic_arcanum_level_8: undefined | number
    mystic_arcanum_level_9: undefined | number

    // ... on WizardSpecific {
    arcane_recovery_levels: undefined | number
  }
  subclass_specific: undefined | {
    // DevotionSpecific {
    aura_range: undefined | number

    // LoreSpecific {
    additional_magical_secrets_max_lvl: undefined | number
  }
}

interface Level_Short {
  index: string
  level: number
  class: {
    index: string
    name: string
  }
  subclass: undefined | {
    index: string
    name: string
  }
  features: {
    index: string
    name: string
  }[]
}

export type {Level_Detailed, Level_Short}

type clazz = "fighter" | "barbarian" | "paladin" | "monk" | "ranger" | "druid" | "sorcerer" | "rogue" | "warlock" | "bard" | "cleric" | "wizard"


export class LevelQuery {
  private constructor(){}

  static search(clazz: clazz): WatchQueryOptions<{class: clazz,order: {by:"LEVEL"}}, { levels: Level_Short[] }>{
    return {
      query: gql`
        query($order: LevelOrder, $class: StringFilter) {
          levels(order: $order, class: $class) {
            index
            level
            class {
              index
              name
            }
            subclass {
              index
              name
            }
            features {
              index
              name
            }
          }
        }
      `,
      variables: {
        class: clazz,
        order: { by: "LEVEL" }
      },
    }
  }

  static details(index: string): WatchQueryOptions<{ index: string }, { level: Level_Detailed | null }>{
    return {
      query: gql`
        query($index: String) {
          level(index: $index) {
            index
            level
            class {
              index
              name
            }
            subclass {
              index
              name
            }
            ability_score_bonuses
            prof_bonus
            spellcasting {
              cantrips_known
              spell_slots_level_1
              spell_slots_level_2
              spell_slots_level_3
              spell_slots_level_4
              spell_slots_level_5
              spell_slots_level_6
              spell_slots_level_7
              spell_slots_level_8
              spell_slots_level_9
              spells_known
            }
            features {
              index
              name
            }
            class_specific {
              ... on BarbarianSpecific {
                brutal_critical_dice
                rage_count
                rage_damage_bonus
              }
              ... on BardSpecific {
                bardic_inspiration_die
                magical_secrets_max_5
                magical_secrets_max_7
                magical_secrets_max_9
                song_of_rest_die
              }
              ... on ClericSpecific {
                channel_divinity_charges
                destroy_undead_cr
              }
              ... on DruidSpecific {
                wild_shape_fly
                wild_shape_max_cr
                wild_shape_swim
              }
              ... on FighterSpecific {
                action_surges
                extra_attacks
                indomitable_uses
              }
              ... on MonkSpecific {
                ki_points
                martial_arts {
                  dice_count
                  dice_value
                }
                unarmored_movement
              }
              ... on PaladinSpecific {
                aura_range
              }
              ... on RangerSpecific {
                favored_enemies
                favored_terrain
              }
              ... on RogueSpecific {
                sneak_attack {
                  dice_count
                  dice_value
                }
              }
              ... on SorcererSpecific {
                creating_spell_slots {
                  sorcery_point_cost
                  spell_slot_level
                }
                metamagic_known
                sorcery_points
              }
              ... on WarlockSpecific {
                invocations_known
                mystic_arcanum_level_6
                mystic_arcanum_level_7
                mystic_arcanum_level_8
                mystic_arcanum_level_9
              }
              ... on WizardSpecific {
                arcane_recovery_levels
              }
            }
            subclass_specific {
              ... on DevotionSpecific {
                aura_range
              }
              ... on LoreSpecific {
                additional_magical_secrets_max_lvl
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