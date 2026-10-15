import { gql, WatchQueryOptions } from "apollo-angular"

interface Language_Detailed {
  index: string
  name: string
  desc: undefined | string
  script: "COMMON" | "ELVISH" | "DWARVISH" | "INFERNAL" | "DRACONIC" | "CELESTIAL"
  type: "STANDARD" | "EXOTIC"
  typical_speakers: string[]
}

interface Language_Short {
  index: string
  name: string
  desc: undefined | string
  type: "STANDARD" | "EXOTIC"
}

export type {Language_Detailed, Language_Short}

export class LanguageQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { languages: Language_Short[] }>{
    return {
      query: gql`
        query q($term: String){
          languages(name: $term) {
            index
            name
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

  static details(index: string): WatchQueryOptions<{ index: string }, { language: Language_Detailed | null }>{
    return {
      query: gql`
        query q($index: String){
          language(index: $index) {
            index
            name
            desc
            script
            type
            typical_speakers
          }
        }
      `,
      variables: {
        index: index,
      },
    }
  }
}

