import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CompileOptions = {
  __typename?: 'CompileOptions';
  /** Whether to keep JSX. */
  jsx?: Maybe<Scalars['Boolean']>;
  /** Place to import automatic JSX runtimes from (used in automatic runtime). */
  jsxImportSource?: Maybe<Scalars['String']>;
  /** Whether to compile to a whole program or a function body. */
  outputFormat?: Maybe<OutputFormat>;
};

export type CompileOptionsInput = {
  /** Whether to keep JSX. */
  jsx?: InputMaybe<Scalars['Boolean']>;
  /** Place to import automatic JSX runtimes from (used in automatic runtime). */
  jsxImportSource?: InputMaybe<Scalars['String']>;
  /** Whether to compile to a whole program or a function body. */
  outputFormat?: InputMaybe<OutputFormat>;
};

export type File = {
  __typename?: 'File';
  absolutePath: Scalars['String'];
  node: Text;
  resource: Scalars['String'];
  type: Type;
  value: Scalars['String'];
};

export type FileNode = Node & {
  __typename?: 'FileNode';
  absolutePath: Scalars['String'];
  type: Scalars['String'];
};

export type Mdx = {
  __typename?: 'Mdx';
  compilerOptions?: Maybe<CompileOptions>;
  fileNode: FileNode;
  jsx: Scalars['String'];
  raw: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  /** Virtual file. */
  vfile: VFile;
};

export type Meta = {
  __typename?: 'Meta';
  baseUrl: Scalars['String'];
};

export type Node = {
  type: Scalars['String'];
};

export type OutputFormat =
  | 'FUNCTION_BODY'
  | 'PROGRAM';

export type Query = {
  __typename?: 'Query';
  allFile: Array<Maybe<FileNode>>;
  allMdx: Array<Maybe<Mdx>>;
  allResource: Array<Maybe<ResourceNode>>;
  mdx?: Maybe<Mdx>;
  meta?: Maybe<Meta>;
};


export type QueryMdxArgs = {
  compilerOptions?: InputMaybe<CompileOptionsInput>;
  slug?: InputMaybe<Scalars['String']>;
};

export type ResourceNode = {
  __typename?: 'ResourceNode';
  resourceType: ResourceType;
  type: Scalars['String'];
  uri: Scalars['String'];
  value: Scalars['String'];
};

export type ResourceType =
  | 'BINARY'
  | 'TEXT';

export type Text = {
  __typename?: 'Text';
  type: Type;
  value: Scalars['String'];
};

export type Type =
  | 'FILE'
  | 'TEXT';

export type VFile = {
  __typename?: 'VFile';
  /** Base of `path` (default: `process.cwd()` or `'/'` in browsers). */
  cwd: Scalars['String'];
  /**
   * List of filepaths the file moved between.
   * The first is the original path and the last is the current path.
   */
  history: Array<Maybe<Scalars['String']>>;
  /**
   * ``Whether a file was saved to disk.
   * ``This is used by vfile reporters.
   */
  stored: Scalars['Boolean'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CompileOptions: ResolverTypeWrapper<CompileOptions>;
  CompileOptionsInput: CompileOptionsInput;
  File: ResolverTypeWrapper<File>;
  FileNode: ResolverTypeWrapper<FileNode>;
  Mdx: ResolverTypeWrapper<Mdx>;
  Meta: ResolverTypeWrapper<Meta>;
  Node: ResolversTypes['FileNode'];
  OutputFormat: OutputFormat;
  Query: ResolverTypeWrapper<{}>;
  ResourceNode: ResolverTypeWrapper<ResourceNode>;
  ResourceType: ResourceType;
  String: ResolverTypeWrapper<Scalars['String']>;
  Text: ResolverTypeWrapper<Text>;
  Type: Type;
  VFile: ResolverTypeWrapper<VFile>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CompileOptions: CompileOptions;
  CompileOptionsInput: CompileOptionsInput;
  File: File;
  FileNode: FileNode;
  Mdx: Mdx;
  Meta: Meta;
  Node: ResolversParentTypes['FileNode'];
  Query: {};
  ResourceNode: ResourceNode;
  String: Scalars['String'];
  Text: Text;
  VFile: VFile;
};

export type CompileOptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompileOptions'] = ResolversParentTypes['CompileOptions']> = {
  jsx?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  jsxImportSource?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  outputFormat?: Resolver<Maybe<ResolversTypes['OutputFormat']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  absolutePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Text'], ParentType, ContextType>;
  resource?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['Type'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileNode'] = ResolversParentTypes['FileNode']> = {
  absolutePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MdxResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mdx'] = ResolversParentTypes['Mdx']> = {
  compilerOptions?: Resolver<Maybe<ResolversTypes['CompileOptions']>, ParentType, ContextType>;
  fileNode?: Resolver<ResolversTypes['FileNode'], ParentType, ContextType>;
  jsx?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  raw?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vfile?: Resolver<ResolversTypes['VFile'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Meta'] = ResolversParentTypes['Meta']> = {
  baseUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'FileNode', ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allFile?: Resolver<Array<Maybe<ResolversTypes['FileNode']>>, ParentType, ContextType>;
  allMdx?: Resolver<Array<Maybe<ResolversTypes['Mdx']>>, ParentType, ContextType>;
  allResource?: Resolver<Array<Maybe<ResolversTypes['ResourceNode']>>, ParentType, ContextType>;
  mdx?: Resolver<Maybe<ResolversTypes['Mdx']>, ParentType, ContextType, Partial<QueryMdxArgs>>;
  meta?: Resolver<Maybe<ResolversTypes['Meta']>, ParentType, ContextType>;
};

export type ResourceNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResourceNode'] = ResolversParentTypes['ResourceNode']> = {
  resourceType?: Resolver<ResolversTypes['ResourceType'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TextResolvers<ContextType = any, ParentType extends ResolversParentTypes['Text'] = ResolversParentTypes['Text']> = {
  type?: Resolver<ResolversTypes['Type'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VFileResolvers<ContextType = any, ParentType extends ResolversParentTypes['VFile'] = ResolversParentTypes['VFile']> = {
  cwd?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  history?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  stored?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CompileOptions?: CompileOptionsResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  FileNode?: FileNodeResolvers<ContextType>;
  Mdx?: MdxResolvers<ContextType>;
  Meta?: MetaResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResourceNode?: ResourceNodeResolvers<ContextType>;
  Text?: TextResolvers<ContextType>;
  VFile?: VFileResolvers<ContextType>;
};


export type MdxQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type MdxQuery = { __typename?: 'Query', mdx?: { __typename?: 'Mdx', jsx: string } | null };

export type AllMdxQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMdxQuery = { __typename?: 'Query', allMdx: Array<{ __typename?: 'Mdx', slug?: string | null } | null> };
