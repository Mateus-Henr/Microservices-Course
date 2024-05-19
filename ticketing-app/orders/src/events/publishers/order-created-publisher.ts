import {OrderCreatedEvent, Publisher, Subjects} from "@sgtickers-course/test";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>
{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}