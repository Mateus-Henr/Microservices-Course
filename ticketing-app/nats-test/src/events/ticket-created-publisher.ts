import {Publisher} from "./base-publisher";
import {Subjects} from "./subjets";
import {TicketCreatedEvent} from "./ticket-created-event";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
