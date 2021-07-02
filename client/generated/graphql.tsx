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
  user?: Maybe<User>;
  following: Array<User>;
  followers: Array<User>;
  publicNotes?: Maybe<Array<Collection>>;
  activityFeed?: Maybe<Array<ActivityFeedResponse>>;
  collection: CollectionResponse;
  collections: Array<Collection>;
  userCollections: Array<Collection>;
  notesList?: Maybe<NotesList>;
  notesLists?: Maybe<Array<NotesList>>;
  note: NoteResponse;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryPublicNotesArgs = {
  username: Scalars['String'];
};


export type QueryCollectionArgs = {
  title?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};


export type QueryUserCollectionsArgs = {
  id: Scalars['String'];
};


export type QueryNotesListArgs = {
  listLocation: ListLocationInput;
};


export type QueryNotesListsArgs = {
  collectionId: Scalars['String'];
};


export type QueryNoteArgs = {
  noteLocation: NoteLocationInput;
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

export type NoteResponse = {
  __typename?: 'NoteResponse';
  note?: Maybe<Note>;
  error?: Maybe<Error>;
};

export type NoteLocationInput = {
  collectionId: Scalars['String'];
  listId: Scalars['String'];
  noteId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout?: Maybe<User>;
  updateUser: UserResponse;
  follow: Scalars['Boolean'];
  savePublicCollection: CollectionResponse;
  forgotPassword: UserResponse;
  resetPassword: UserResponse;
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


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['String'];
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

export type DeleteNoteMutationVariables = Exact<{
  noteLocationInput: NoteLocationInput;
}>;


export type DeleteNoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteNote'>
);

export type AddNoteMutationVariables = Exact<{
  listLocation: ListLocationInput;
  noteInput: NoteInput;
}>;


export type AddNoteMutation = (
  { __typename?: 'Mutation' }
  & { addNote: (
    { __typename?: 'NoteResponse' }
    & { note?: Maybe<(
      { __typename?: 'Note' }
      & Pick<Note, 'id' | 'title' | 'body'>
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'property' | 'message'>
    )> }
  ) }
);

export type CreateCollectionMutationVariables = Exact<{
  title: Scalars['String'];
  visibility: Scalars['String'];
}>;


export type CreateCollectionMutation = (
  { __typename?: 'Mutation' }
  & { createCollection: (
    { __typename?: 'CollectionResponse' }
    & { collection?: Maybe<(
      { __typename?: 'Collection' }
      & Pick<Collection, 'id' | 'title' | 'visibility'>
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'property' | 'message'>
    )> }
  ) }
);

export type CreateNotesListMutationVariables = Exact<{
  collectionId: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreateNotesListMutation = (
  { __typename?: 'Mutation' }
  & { createNotesList: (
    { __typename?: 'NotesListResponse' }
    & { notesList?: Maybe<(
      { __typename?: 'NotesList' }
      & Pick<NotesList, 'id' | 'title'>
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'property' | 'message'>
    )> }
  ) }
);

export type DeleteCollectionMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCollectionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCollection'>
);

export type DeleteNotesListMutationVariables = Exact<{
  listLocation: ListLocationInput;
}>;


export type DeleteNotesListMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteNotesList'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

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

export type ResetPasswordMutationVariables = Exact<{
  userId: Scalars['String'];
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type SavePublicCollectionMutationVariables = Exact<{
  targetUserId: Scalars['String'];
  collectionId: Scalars['String'];
}>;


export type SavePublicCollectionMutation = (
  { __typename?: 'Mutation' }
  & { savePublicCollection: (
    { __typename?: 'CollectionResponse' }
    & { collection?: Maybe<(
      { __typename?: 'Collection' }
      & Pick<Collection, 'id' | 'title' | 'visibility'>
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'property' | 'message'>
    )> }
  ) }
);

export type UpdateCollectionMutationVariables = Exact<{
  id: Scalars['String'];
  collectionInput: CollectionUpdateInput;
}>;


export type UpdateCollectionMutation = (
  { __typename?: 'Mutation' }
  & { updateCollection: (
    { __typename?: 'CollectionResponse' }
    & { collection?: Maybe<(
      { __typename?: 'Collection' }
      & Pick<Collection, 'id' | 'title' | 'visibility'>
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'property' | 'message'>
    )> }
  ) }
);

export type UpdateNoteMutationVariables = Exact<{
  noteLocation: NoteLocationInput;
  noteInput: NoteUpdateInput;
}>;


export type UpdateNoteMutation = (
  { __typename?: 'Mutation' }
  & { updateNote: (
    { __typename?: 'NoteResponse' }
    & { note?: Maybe<(
      { __typename?: 'Note' }
      & Pick<Note, 'id' | 'title' | 'body'>
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'property' | 'message'>
    )> }
  ) }
);

export type UpdateNotesListMutationVariables = Exact<{
  listLocation: ListLocationInput;
  notesListInput: NotesListUpdateInput;
}>;


export type UpdateNotesListMutation = (
  { __typename?: 'Mutation' }
  & { updateNotesList: (
    { __typename?: 'NotesListResponse' }
    & { notesList?: Maybe<(
      { __typename?: 'NotesList' }
      & Pick<NotesList, 'id' | 'title'>
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'property' | 'message'>
    )> }
  ) }
);

export type VoteMutationVariables = Exact<{
  collectionId: Scalars['String'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & { vote: (
    { __typename?: 'CollectionResponse' }
    & { collection?: Maybe<(
      { __typename?: 'Collection' }
      & Pick<Collection, 'id' | 'title' | 'upvotes'>
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'property' | 'message'>
    )> }
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

export type CollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionsQuery = (
  { __typename?: 'Query' }
  & { collections: Array<(
    { __typename?: 'Collection' }
    & Pick<Collection, 'id' | 'title' | 'visibility' | 'upvotes' | 'createdAt'>
    & { lists: Array<(
      { __typename?: 'NotesList' }
      & Pick<NotesList, 'id' | 'title'>
      & { collection: (
        { __typename?: 'Collection' }
        & Pick<Collection, 'id' | 'title' | 'visibility'>
      ), notes: Array<(
        { __typename?: 'Note' }
        & Pick<Note, 'id' | 'title' | 'body'>
      )> }
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'username' | 'following' | 'followers' | 'upvoted'>
  )> }
);

export type NoteQueryVariables = Exact<{
  noteLocation: NoteLocationInput;
}>;


export type NoteQuery = (
  { __typename?: 'Query' }
  & { note: (
    { __typename?: 'NoteResponse' }
    & { note?: Maybe<(
      { __typename?: 'Note' }
      & Pick<Note, 'id' | 'title'>
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'property' | 'message'>
    )> }
  ) }
);

export type PublicNotesQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type PublicNotesQuery = (
  { __typename?: 'Query' }
  & { publicNotes?: Maybe<Array<(
    { __typename?: 'Collection' }
    & Pick<Collection, 'id' | 'title' | 'visibility' | 'upvotes' | 'createdAt'>
    & { lists: Array<(
      { __typename?: 'NotesList' }
      & Pick<NotesList, 'id' | 'title'>
      & { collection: (
        { __typename?: 'Collection' }
        & Pick<Collection, 'id' | 'title' | 'visibility'>
      ), notes: Array<(
        { __typename?: 'Note' }
        & Pick<Note, 'id' | 'title' | 'body'>
      )> }
    )> }
  )>> }
);

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'following' | 'followers' | 'upvoted'>
  )> }
);


export const DeleteNoteDocument = gql`
    mutation DeleteNote($noteLocationInput: NoteLocationInput!) {
  deleteNote(noteLocation: $noteLocationInput)
}
    `;

export function useDeleteNoteMutation() {
  return Urql.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument);
};
export const AddNoteDocument = gql`
    mutation AddNote($listLocation: ListLocationInput!, $noteInput: NoteInput!) {
  addNote(listLocation: $listLocation, noteInput: $noteInput) {
    note {
      id
      title
      body
    }
    error {
      property
      message
    }
  }
}
    `;

export function useAddNoteMutation() {
  return Urql.useMutation<AddNoteMutation, AddNoteMutationVariables>(AddNoteDocument);
};
export const CreateCollectionDocument = gql`
    mutation CreateCollection($title: String!, $visibility: String!) {
  createCollection(title: $title, visibility: $visibility) {
    collection {
      id
      title
      visibility
    }
    error {
      property
      message
    }
  }
}
    `;

export function useCreateCollectionMutation() {
  return Urql.useMutation<CreateCollectionMutation, CreateCollectionMutationVariables>(CreateCollectionDocument);
};
export const CreateNotesListDocument = gql`
    mutation CreateNotesList($collectionId: String!, $title: String!) {
  createNotesList(collectionId: $collectionId, title: $title) {
    notesList {
      id
      title
    }
    error {
      property
      message
    }
  }
}
    `;

export function useCreateNotesListMutation() {
  return Urql.useMutation<CreateNotesListMutation, CreateNotesListMutationVariables>(CreateNotesListDocument);
};
export const DeleteCollectionDocument = gql`
    mutation DeleteCollection($id: String!) {
  deleteCollection(id: $id)
}
    `;

export function useDeleteCollectionMutation() {
  return Urql.useMutation<DeleteCollectionMutation, DeleteCollectionMutationVariables>(DeleteCollectionDocument);
};
export const DeleteNotesListDocument = gql`
    mutation DeleteNotesList($listLocation: ListLocationInput!) {
  deleteNotesList(listLocation: $listLocation)
}
    `;

export function useDeleteNotesListMutation() {
  return Urql.useMutation<DeleteNotesListMutation, DeleteNotesListMutationVariables>(DeleteNotesListDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
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
export const ResetPasswordDocument = gql`
    mutation ResetPassword($userId: String!, $token: String!, $newPassword: String!) {
  resetPassword(userId: $userId, token: $token, newPassword: $newPassword) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const SavePublicCollectionDocument = gql`
    mutation SavePublicCollection($targetUserId: String!, $collectionId: String!) {
  savePublicCollection(targetUserId: $targetUserId, collectionId: $collectionId) {
    collection {
      id
      title
      visibility
    }
    error {
      property
      message
    }
  }
}
    `;

export function useSavePublicCollectionMutation() {
  return Urql.useMutation<SavePublicCollectionMutation, SavePublicCollectionMutationVariables>(SavePublicCollectionDocument);
};
export const UpdateCollectionDocument = gql`
    mutation UpdateCollection($id: String!, $collectionInput: CollectionUpdateInput!) {
  updateCollection(id: $id, collectionInput: $collectionInput) {
    collection {
      id
      title
      visibility
    }
    error {
      property
      message
    }
  }
}
    `;

export function useUpdateCollectionMutation() {
  return Urql.useMutation<UpdateCollectionMutation, UpdateCollectionMutationVariables>(UpdateCollectionDocument);
};
export const UpdateNoteDocument = gql`
    mutation UpdateNote($noteLocation: NoteLocationInput!, $noteInput: NoteUpdateInput!) {
  updateNote(noteLocaton: $noteLocation, noteInput: $noteInput) {
    note {
      id
      title
      body
    }
    error {
      property
      message
    }
  }
}
    `;

export function useUpdateNoteMutation() {
  return Urql.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument);
};
export const UpdateNotesListDocument = gql`
    mutation UpdateNotesList($listLocation: ListLocationInput!, $notesListInput: NotesListUpdateInput!) {
  updateNotesList(listLocation: $listLocation, notesListInput: $notesListInput) {
    notesList {
      id
      title
    }
    error {
      property
      message
    }
  }
}
    `;

export function useUpdateNotesListMutation() {
  return Urql.useMutation<UpdateNotesListMutation, UpdateNotesListMutationVariables>(UpdateNotesListDocument);
};
export const VoteDocument = gql`
    mutation Vote($collectionId: String!) {
  vote(collectionId: $collectionId) {
    collection {
      id
      title
      upvotes
    }
    error {
      property
      message
    }
  }
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
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
export const CollectionsDocument = gql`
    query Collections {
  collections {
    id
    title
    visibility
    upvotes
    lists {
      id
      title
      collection {
        id
        title
        visibility
      }
      notes {
        id
        title
        body
      }
    }
    createdAt
  }
}
    `;

export function useCollectionsQuery(options: Omit<Urql.UseQueryArgs<CollectionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CollectionsQuery>({ query: CollectionsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    _id
    email
    username
    following
    followers
    upvoted
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const NoteDocument = gql`
    query Note($noteLocation: NoteLocationInput!) {
  note(noteLocation: $noteLocation) {
    note {
      id
      title
    }
    error {
      property
      message
    }
  }
}
    `;

export function useNoteQuery(options: Omit<Urql.UseQueryArgs<NoteQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NoteQuery>({ query: NoteDocument, ...options });
};
export const PublicNotesDocument = gql`
    query PublicNotes($username: String!) {
  publicNotes(username: $username) {
    id
    title
    visibility
    upvotes
    lists {
      id
      title
      collection {
        id
        title
        visibility
      }
      notes {
        id
        title
        body
      }
    }
    createdAt
  }
}
    `;

export function usePublicNotesQuery(options: Omit<Urql.UseQueryArgs<PublicNotesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PublicNotesQuery>({ query: PublicNotesDocument, ...options });
};
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    id
    username
    email
    following
    followers
    upvoted
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};