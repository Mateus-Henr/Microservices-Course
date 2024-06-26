import express, {Request, Response} from "express";
import {Order} from "../models/orders";
import {NotAuthorizedError, NotFoundError, OrderStatus} from "@sgtickers-course/test";
import {natsWrapper} from "../nats-wrapper";
import {OrderCancelledPublisher} from "../events/publishers/order-cancelled-publisher";

const router = express.Router();

router.delete("/api/orders/:orderId", async (req: Request, res: Response) =>
{
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order)
    {
        throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id)
    {
        throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    await new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        ticket: {
            id: order.ticket.id
        }
    });

    res.status(204).send(order);
});

export {router as deleteOrderRouter};