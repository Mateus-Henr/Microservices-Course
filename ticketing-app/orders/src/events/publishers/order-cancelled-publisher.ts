import {OrderCancelledEvent, Publisher, Subjects} from "@sgtickers-course/test";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>
{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}