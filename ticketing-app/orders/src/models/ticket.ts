import mongoose from "mongoose";
import {Order} from "./orders";
import {OrderStatus} from "@sgtickers-course/test";

interface TicketAttrs
{
    title: string;
    price: number;
}

interface TicketModel extends mongoose.Model<TicketDoc>
{
    build(attrs: TicketAttrs): TicketDoc;
}

export interface TicketDoc extends mongoose.Document
{
    title: string;
    price: number;

    isReserved(): Promise<boolean>;
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    toJSON: {
        transform(doc, ret)
        {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

ticketSchema.statics.build = (attrs: TicketAttrs) =>
{
    return new Ticket(attrs);
};

ticketSchema.methods.isReserved = async function ()
{
    return !!await Order.findOne({
        ticket: this, // Ticket doc
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }
    });
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export {Ticket};
