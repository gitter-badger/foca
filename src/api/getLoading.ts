import { LOADING_CATEGORY } from '../actions/loading';
import { PromiseAssignEffect, PromiseEffect } from '../model/enhanceEffect';
import { loadingStore, FindLoading } from '../store/loadingStore';

const helper = loadingStore.helper;

/**
 * 检测给定的effect方法中是否有正在执行的。支持多个方法同时传入。
 *
 * ```typescript
 * loading = getLoading(effect);
 * loading = getLoading(effect1, effect2, ...);
 * ```
 *
 */
export function getLoading(
  effect: PromiseEffect,
  ...more: PromiseEffect[]
): boolean;

/**
 * 检测给定的effect方法是否正在执行。
 *
 * ```typescript
 * loadings = getLoading(effect.assign);
 * loading = loadings.find(CATEGORY)
 * ```
 */
export function getLoading(effect: PromiseAssignEffect): FindLoading;

/**
 * 检测给定的effect方法是否正在执行。
 *
 * ```typescript
 * loading = getLoading(effect.assign, CATEGORY);
 * ```
 */
export function getLoading(
  effect: PromiseAssignEffect,
  category: string | number,
): boolean;

export function getLoading(
  effect: PromiseEffect | PromiseAssignEffect,
  category?: string | number | PromiseEffect,
): boolean | FindLoading {
  const args = arguments;

  if (effect._.assign && typeof category !== 'function') {
    const loadings = helper.get(effect).loadings;
    return category === void 0 ? loadings : loadings.find(category);
  }

  for (let i = args.length; i-- > 0; ) {
    if (helper.get(args[i]).loadings.find(LOADING_CATEGORY)) {
      return true;
    }
  }
  return false;
}
