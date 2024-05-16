import {Publisher, Subjects, TicketUpdatedEvent} from "@sgtickers-course/test";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>
{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
