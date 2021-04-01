import { init, RematchRootState, RematchDispatch } from '@rematch/core';
import { models, RootModel } from './models';

const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export const { getState } = store;
export const dispatch = store.dispatch as Dispatch;

export default store;
