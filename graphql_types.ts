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

export type FileNode = {
  __typename?: 'FileNode';
  /** Absolute path */
  absolutePath: Scalars['String'];
  /** The file name including extension (if any) such as 'index.html' */
  base: Scalars['String'];
  /**
   * Blocksize for filesystem I/O.
   * Linux/Mac OS only.
   */
  blksize?: Maybe<Scalars['Int']>;
  /**
   * Number of blocks allocated to the file, in 512-byte units.
   * Linux/Mac OS only.
   */
  blocks?: Maybe<Scalars['Int']>;
  /**
   * ID of the device containing the file.
   * Linux/Mac OS only.
   */
  dev?: Maybe<Scalars['Int']>;
  /** The full directory path such as '/home/user/dir' or 'c:\path\dir' */
  dir: Scalars['String'];
  /** The file extension (if any) such as '.html' */
  ext: Scalars['String'];
  fileType: FileType;
  /**
   * Group ID of the owner of this file.
   * Linux/Mac OS only.
   */
  gid?: Maybe<Scalars['Int']>;
  /**
   * Inode number.
   * Linux/Mac OS only.
   */
  ino?: Maybe<Scalars['Int']>;
  /** The file name without extension (if any) such as 'index' */
  name: Scalars['String'];
  /**
   * Number of hard links pointing to this file.
   * Linux/Mac OS only.
   */
  nlink?: Maybe<Scalars['Int']>;
  /**
   * Device ID of this file.
   * Linux/Mac OS only.
   */
  rdev?: Maybe<Scalars['Int']>;
  /** The root of the path such as '/' or 'c:\' */
  root: Scalars['String'];
  /** The size of the file, in bytes. */
  size: Scalars['Int'];
  type: Scalars['String'];
  /**
   * User ID of the owner of this file.
   * Linux/Mac OS only.
   */
  uid?: Maybe<Scalars['Int']>;
  value: Scalars['String'];
};

export type FileType =
  | 'BINARY'
  | 'TEXT';

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

export type Request = {
  __typename?: 'Request';
  integrity?: Maybe<Scalars['String']>;
  isHistoryNavigation?: Maybe<Scalars['Boolean']>;
  isReloadNavigation?: Maybe<Scalars['Boolean']>;
  keepalive?: Maybe<Scalars['Boolean']>;
  method: Scalars['String'];
  mode?: Maybe<Scalars['String']>;
  redirect: Scalars['String'];
  referrer?: Maybe<Scalars['String']>;
  referrerPolicy?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type RequestMode =
  | 'CORS'
  | 'NAVIGATE'
  | 'NO_CORS'
  | 'SAME_ORIGIN';

export type RequestRedirect =
  | 'ERROR'
  | 'FOLLOW'
  | 'MANUAL';

export type ResourceNode = {
  __typename?: 'ResourceNode';
  request: Request;
  resourceType: ResourceType;
  response: Response;
  type: Scalars['String'];
  url: Url;
  value: Scalars['String'];
};

export type ResourceType =
  | 'BINARY'
  | 'TEXT';

export type Response = {
  __typename?: 'Response';
  ok: Scalars['Boolean'];
  redirected: Scalars['Boolean'];
  status: Scalars['Int'];
  statusText: Scalars['String'];
  type: ResponseType;
  url: Scalars['String'];
};

export type ResponseType =
  | 'basic'
  | 'cors'
  | 'default'
  | 'error'
  | 'opaque'
  | 'opaqueredirect';

export type Url = {
  __typename?: 'Url';
  hash: Scalars['String'];
  host: Scalars['String'];
  hostname: Scalars['String'];
  origin: Scalars['String'];
  password: Scalars['String'];
  pathname: Scalars['String'];
  port: Scalars['String'];
  protocol: Scalars['String'];
  search: Scalars['String'];
  username: Scalars['String'];
};

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
  FileNode: ResolverTypeWrapper<FileNode>;
  FileType: FileType;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mdx: ResolverTypeWrapper<Mdx>;
  Meta: ResolverTypeWrapper<Meta>;
  Node: never;
  OutputFormat: OutputFormat;
  Query: ResolverTypeWrapper<{}>;
  Request: ResolverTypeWrapper<Request>;
  RequestMode: RequestMode;
  RequestRedirect: RequestRedirect;
  ResourceNode: ResolverTypeWrapper<ResourceNode>;
  ResourceType: ResourceType;
  Response: ResolverTypeWrapper<Response>;
  ResponseType: ResponseType;
  String: ResolverTypeWrapper<Scalars['String']>;
  Url: ResolverTypeWrapper<Url>;
  VFile: ResolverTypeWrapper<VFile>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CompileOptions: CompileOptions;
  CompileOptionsInput: CompileOptionsInput;
  FileNode: FileNode;
  Int: Scalars['Int'];
  Mdx: Mdx;
  Meta: Meta;
  Node: never;
  Query: {};
  Request: Request;
  ResourceNode: ResourceNode;
  Response: Response;
  String: Scalars['String'];
  Url: Url;
  VFile: VFile;
};

export type CompileOptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompileOptions'] = ResolversParentTypes['CompileOptions']> = {
  jsx?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  jsxImportSource?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  outputFormat?: Resolver<Maybe<ResolversTypes['OutputFormat']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileNode'] = ResolversParentTypes['FileNode']> = {
  absolutePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  base?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blksize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  blocks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dev?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dir?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ext?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fileType?: Resolver<ResolversTypes['FileType'], ParentType, ContextType>;
  gid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ino?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nlink?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rdev?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  root?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allFile?: Resolver<Array<Maybe<ResolversTypes['FileNode']>>, ParentType, ContextType>;
  allMdx?: Resolver<Array<Maybe<ResolversTypes['Mdx']>>, ParentType, ContextType>;
  allResource?: Resolver<Array<Maybe<ResolversTypes['ResourceNode']>>, ParentType, ContextType>;
  mdx?: Resolver<Maybe<ResolversTypes['Mdx']>, ParentType, ContextType, Partial<QueryMdxArgs>>;
  meta?: Resolver<Maybe<ResolversTypes['Meta']>, ParentType, ContextType>;
};

export type RequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['Request'] = ResolversParentTypes['Request']> = {
  integrity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isHistoryNavigation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isReloadNavigation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  keepalive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  method?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  redirect?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  referrer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  referrerPolicy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResourceNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResourceNode'] = ResolversParentTypes['ResourceNode']> = {
  request?: Resolver<ResolversTypes['Request'], ParentType, ContextType>;
  resourceType?: Resolver<ResolversTypes['ResourceType'], ParentType, ContextType>;
  response?: Resolver<ResolversTypes['Response'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['Url'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  redirected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  statusText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ResponseType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlResolvers<ContextType = any, ParentType extends ResolversParentTypes['Url'] = ResolversParentTypes['Url']> = {
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  host?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hostname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pathname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  port?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  protocol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  search?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  FileNode?: FileNodeResolvers<ContextType>;
  Mdx?: MdxResolvers<ContextType>;
  Meta?: MetaResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Request?: RequestResolvers<ContextType>;
  ResourceNode?: ResourceNodeResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  Url?: UrlResolvers<ContextType>;
  VFile?: VFileResolvers<ContextType>;
};


export type MdxQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type MdxQuery = { __typename?: 'Query', mdx?: { __typename?: 'Mdx', jsx: string } | null };

export type AllMdxQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMdxQuery = { __typename?: 'Query', allMdx: Array<{ __typename?: 'Mdx', slug?: string | null, fileNode: { __typename?: 'FileNode', name: string } } | null> };
