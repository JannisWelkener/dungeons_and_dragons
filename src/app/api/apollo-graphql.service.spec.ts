import { TestBed } from '@angular/core/testing';

import { ApolloGraphqlService } from './apollo-graphql.service';

describe('ApolloGraphqlService', () => {
  let service: ApolloGraphqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApolloGraphqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
