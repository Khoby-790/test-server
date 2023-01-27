export type IResolver = (
  parent: any,
  args: any,
  context: any,
  info: any
) => any;

export type IResolvers = {
  [key: string]: {
    [key: string]: IResolver;
  };
};

type IPagination = {
  limit: number;
  offset: number;
};

export type AuthUser = {
  user_id: number;
};

export type QueryArgs = {
  filter: Record<string, any>;
  pagination?: IPagination;
};
