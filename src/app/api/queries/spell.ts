import { gql, WatchQueryOptions } from "apollo-angular";

interface Spell_Short {
  index: string;
  name: string;
  desc: string[];
  level: number;
  school: {
    name: string;
  };
}

interface Spell_Detailed {
  index: string;
  name: string;
  desc: string[];
  higher_level: undefined | string[];
  range: string;
  components: ('V' | 'S' | 'M')[];
  material: string;
  area_of_effect: null | {
    size: number;
    type: 'sphere' | 'cone' | 'cylinder' | 'line' | 'cube';
  };
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  attack_type: string;
  school: { index: string; name: string };
  classes: { index: string; name: string }[];
  subclasses: { index: string; name: string }[];
}

export type {Spell_Short, Spell_Detailed}

export class SpellQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { spells: Spell_Short[] }>{
    return {
      query: gql`
        query search($term: String!) {
          spells(name: $term) {
            index
            name
            desc
            level
            school {
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

  static details(index: string): WatchQueryOptions<{ index: string }, { spell: Spell_Detailed | null }>{
    return {
      query: gql`
        query details($index: String!) {
          spell(index: $index) {
            index
            name
            desc
            higher_level
            range
            components
            material
            area_of_effect {
              size
              type
            }
            ritual
            duration
            concentration
            casting_time
            level
            attack_type
            school {
              index
              name
            }
            classes {
              index
              name
            }
            subclasses {
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

 /*
index: string             - Resource index for shorthand searching.
name: string              - Name of the referenced resource.
url: string               - URL of the referenced resource.
desc: [string]            - Description of the resource.
higher_level: [string]    - List of descriptions for casting the spell at higher levels.
range: string             - Range of the spell, usually expressed in feet.
components: [enum]        - List of shorthand for required components of the spell. V: verbal S: somatic M: material
     -> Allowed: V┃S┃M
material: string          - Material component for the spell to be cast.
area_of_effect: {
  size: number
  type: enum
       -> Allowed: sphere┃cone┃cylinder┃line┃cube
}
ritual: boolean           - Determines if a spell can be cast in a 10-min(in-game) ritual.
duration: string          - How long the spell effect lasts.
concentration: boolean    - Determines if a spell needs concentration to persist.
casting_time: string      - How long it takes for the spell to activate.
level: number             - Level of the spell.
attack_type: string       - Attack type of the spell.
school: {
  index: string             - Resource index for shorthand searching.
  name: string              - Name of the referenced resource.
  url: string               - URL of the referenced resource.
}
classes: [{               - List of classes that are able to learn the spell.
  index: string             - Resource index for shorthand searching.
  name: string              - Name of the referenced resource.
  url: string               - URL of the referenced resource.
}]
subclasses: [{            - List of subclasses that have access to the spell.
  index: string             - Resource index for shorthand searching.
  name: string              - Name of the referenced resource.
  url: string               - URL of the referenced resource.
}]
*/