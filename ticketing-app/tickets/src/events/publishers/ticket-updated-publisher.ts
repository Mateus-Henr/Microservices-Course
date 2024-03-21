import {Publisher, Subjects, TicketUpdatedEvent} from "@sgtickers-course/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>
{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
