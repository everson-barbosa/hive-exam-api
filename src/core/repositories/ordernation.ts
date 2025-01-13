import { Order } from '../types/order';

export interface Ordernation<T> {
  readonly orderBy: T;
  readonly order: Order;
}
