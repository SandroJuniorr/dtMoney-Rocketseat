import { Summary } from "../Summary";
import { TransactionsTable } from "../TrasactionTable";
import { Container } from "./styles";

export function DashBoard(){

    return(
        <Container>
            <Summary></Summary>
            <TransactionsTable></TransactionsTable>
        </Container>
    )

}