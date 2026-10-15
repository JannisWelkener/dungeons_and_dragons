import { gql, WatchQueryOptions } from "apollo-angular";

interface Alignment_Short {
  index: string;
  name: string;
  desc: string;
  abbreviation: string;
}

interface Alignment_Detailed {
  index: string;
  name: string;
  desc: string;
  abbreviation: string;
}

export type { Alignment_Short, Alignment_Detailed };

export class AlignmentQuery {
  private constructor(){}

  static search(term: string): WatchQueryOptions<{ term: string }, { alignments: Alignment_Short[] }>{
    return {
      query: gql`
        query q($term: String){
          alignments(name: $term) {
            index
            desc
            abbreviation
            name
          }
        }
      `,
      variables: {
        term: term,
      },
    }
  }

  static details(index: string): WatchQueryOptions<{ index: string }, { alignment: Alignment_Detailed | null }>{
    return {
      query: gql`
        query q($index: String){
          alignment(index: $index) {
            index
            desc
            abbreviation
            name
          }
        }
      `,
      variables: {
        index: index,
      },
    }
  }
}