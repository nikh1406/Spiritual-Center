import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { payment } from "../../../models/backend";

// export interface PaymentState{
//     payments:payment[]
// }

// export const initialState:PaymentState = {
//     payments: []
// }

export interface PaymentState extends EntityState<payment> {}

export function selectUserId(a: payment): string {
    //In this case this would be optional since primary key is id
    let randomNumber = Math.floor(Math.random() * 100) + 1
    return (a.devoteeId+a.amount+a.month+a.paymentMethod+a.year+randomNumber);
}

export const paymentAdapter: EntityAdapter<payment> = createEntityAdapter<payment>({
    selectId: selectUserId,
});

export const initialState:PaymentState = paymentAdapter.getInitialState();


