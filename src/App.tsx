import { DashBoard } from "./components/Dashboard";
import Modal from 'react-modal'

import { Header } from "./components/Header";
import { GlobalStyle } from "./style/global";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionProvider } from "./hooks/useTransaction";

Modal.setAppElement('#root')
function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen ] = useState(false)
    function handleOpenNewTransactionModal(){
        setIsNewTransactionModalOpen(true)
    }
    function handleCloseNewTransactionModal(){
        setIsNewTransactionModalOpen(false)

    }
  return (
    <TransactionProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}></Header>
      <DashBoard/>
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>
      <GlobalStyle />
    </TransactionProvider>
  );
}

export default App;
