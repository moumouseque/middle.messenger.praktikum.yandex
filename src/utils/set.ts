/* eslint-disable no-param-reassign */
import { Indexed } from '../types';

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  Object.keys(rhs).forEach((key: string) => {
    try {
      if (rhs[key].constructor === Object) {
        rhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        lhs[key] = rhs[key];
      }
    } catch (e) {
      lhs[key] = rhs[key];
    }
  });

  return lhs;
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);
  return merge(object as Indexed, result);
}

export default set;
