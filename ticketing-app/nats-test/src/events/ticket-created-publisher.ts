import {Publisher, Subjects, TicketCreatedEvent} from "@sgtickers-course/common";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
