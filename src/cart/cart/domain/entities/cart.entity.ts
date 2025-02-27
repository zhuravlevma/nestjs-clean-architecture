import { CartPositionEntity } from './cart-position.entity';
import { OrderCreatedEvent } from '../events/order-created.event';
import { Aggregate } from 'src/__lib__/aggregate';
import { OrderCancelledEvent } from '../events/order-cancelled.event';

interface Attributes {
  id: string;
  orderId: string | null;
  positions: CartPositionEntity[];
  isActive: boolean;
}

export class CartEntity extends Aggregate<Attributes> {
  private id: string;
  private orderId: string | null;
  private isActive: boolean;

  private positions: CartPositionEntity[];
  constructor(attributes: Attributes) {
    super();
    this.id = attributes.id;
    this.orderId = attributes.orderId;
    this.positions = attributes.positions;
    this.isActive = attributes.isActive;
  }

  cancelOrder() {
    this.isActive = false;
  }

  createOrder(sagaId: string, correlationId: string) {
    this.addMessage(
      new OrderCreatedEvent({
        aggregateId: this.id,
        payload: {
          orderId: this.orderId,
          userId: 'userId',
          positions: this.positions.map((el) => ({
            sum: el.Sum,
            code: el.Code,
          })),
        },
        saga: {
          compensation: new OrderCancelledEvent({
            aggregateId: this.id,
            payload: { cartId: this.id },
          }),
          sagaId,
          correlationId,
        },
      }),
    );
  }
}
