import {Publisher, Subjects, TicketCreatedEvent} from '@sgtickers-course/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
