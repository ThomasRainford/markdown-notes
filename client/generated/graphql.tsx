import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  following: Array<User>;
  followers: Array<User>;
  publicNotes?: Maybe<Array<Collection>>;
  activityFeed?: Maybe<Array<ActivityFeedResponse>>;
  collection: CollectionResponse;
  collections: Array<Collection>;
  notesList?: Maybe<NotesList>;
  notesLists?: Maybe<Array<NotesList>>;
};


export type QueryPublicNotesArgs = {
  targetUserId: Scalars['String'];
};


export type QueryCollectionArgs = {
  title?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};


export type QueryNotesListArgs = {
  listLocation: ListLocationInput;
};


export type QueryNotesListsArgs = {
  collectionId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  id: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  following: Array<Scalars['String']>;
  followers: Array<Scalars['String']>;
  collections: Array<Collection>;
  upvoted: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Collection = {
  __typename?: 'Collection';
  _id: Scalars['ID'];
  id: Scalars['String'];
  owner: User;
  title: Scalars['String'];
  lists: Array<NotesList>;
  upvotes: Scalars['Float'];
  visibility: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type NotesList = {
  __typename?: 'NotesList';
  _id: Scalars['ID'];
  id: Scalars['String'];
  title: Scalars['String'];
  notes: Array<Note>;
  collection: Collection;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type ActivityFeedResponse = {
  __typename?: 'ActivityFeedResponse';
  activity: Scalars['String'];
  collection: Collection;
};

export type CollectionResponse = {
  __typename?: 'CollectionResponse';
  collection?: Maybe<Collection>;
  error?: Maybe<Error>;
};

export type Error = {
  __typename?: 'Error';
  property: Scalars['String'];
  message: Scalars['String'];
};

export type ListLocationInput = {
  collectionId: Scalars['String'];
  listId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout?: Maybe<User>;
  updateUser: UserResponse;
  follow: Scalars['Boolean'];
  savePublicCollection: CollectionResponse;
  createCollection: CollectionResponse;
  updateCollection: CollectionResponse;
  vote: CollectionResponse;
  deleteCollection: Scalars['Boolean'];
  createNotesList: NotesListResponse;
  addNote: NoteResponse;
  updateNotesList: NotesListResponse;
  updateNote: NoteResponse;
  deleteNotesList: Scalars['Boolean'];
  deleteNote: Scalars['Boolean'];
  moveList: NotesListResponse;
};


export type MutationRegisterArgs = {
  registerInput: UserRegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


export type MutationFollowArgs = {
  targetUserId: Scalars['String'];
};


export type MutationSavePublicCollectionArgs = {
  collectionId: Scalars['String'];
  targetUserId: Scalars['String'];
};


export type MutationCreateCollectionArgs = {
  visibility: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdateCollectionArgs = {
  collectionInput: CollectionUpdateInput;
  id: Scalars['String'];
};


export type MutationVoteArgs = {
  collectionId: Scalars['String'];
};


export type MutationDeleteCollectionArgs = {
  id: Scalars['String'];
};


export type MutationCreateNotesListArgs = {
  title: Scalars['String'];
  collectionId: Scalars['String'];
};


export type MutationAddNoteArgs = {
  noteInput: NoteInput;
  listLocation: ListLocationInput;
};


export type MutationUpdateNotesListArgs = {
  notesListInput: NotesListUpdateInput;
  listLocation: ListLocationInput;
};


export type MutationUpdateNoteArgs = {
  noteInput: NoteUpdateInput;
  noteLocaton: NoteLocationInput;
};


export type MutationDeleteNotesListArgs = {
  listLocation: ListLocationInput;
};


export type MutationDeleteNoteArgs = {
  noteLocation: NoteLocationInput;
};


export type MutationMoveListArgs = {
  newCollectionId: Scalars['String'];
  listLocation: ListLocationInput;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserRegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type CollectionUpdateInput = {
  title?: Maybe<Scalars['String']>;
  visibility?: Maybe<Scalars['String']>;
};

export type NotesListResponse = {
  __typename?: 'NotesListResponse';
  notesList?: Maybe<NotesList>;
  error?: Maybe<Error>;
};

export type NoteResponse = {
  __typename?: 'NoteResponse';
  note?: Maybe<Note>;
  error?: Maybe<Error>;
};

export type NoteInput = {
  title: Scalars['String'];
  body: Scalars['String'];
};

export type NotesListUpdateInput = {
  title?: Maybe<Scalars['String']>;
};

export type NoteUpdateInput = {
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};

export type NoteLocationInput = {
  collectionId: Scalars['String'];
  listId: Scalars['String'];
  noteId: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'username' | 'email'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  registerInput: UserRegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ActivityFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type ActivityFeedQuery = (
  { __typename?: 'Query' }
  & { activityFeed?: Maybe<Array<(
    { __typename?: 'ActivityFeedResponse' }
    & Pick<ActivityFeedResponse, 'activity'>
    & { collection: (
      { __typename?: 'Collection' }
      & Pick<Collection, 'id' | 'title' | 'upvotes' | 'createdAt' | 'updatedAt'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    ) }
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'username' | 'following' | 'followers'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    user {
      _id
      username
      email
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    username
  }
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($registerInput: UserRegisterInput!) {
  register(registerInput: $registerInput) {
    user {
      id
      username
      email
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ActivityFeedDocument = gql`
    query ActivityFeed {
  activityFeed {
    activity
    collection {
      id
      title
      upvotes
      createdAt
      updatedAt
      owner {
        id
        username
      }
    }
  }
}
    `;

export function useActivityFeedQuery(options: Omit<Urql.UseQueryArgs<ActivityFeedQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ActivityFeedQuery>({ query: ActivityFeedDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    _id
    email
    username
    following
    followers
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};