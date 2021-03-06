import Modal from 'react-modal'
import { Container, TransactionTypeContainer,RadioBox } from './styles'
import CloseImg from '../../assets/close.svg'
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { FormEvent, useContext, useState } from 'react';
import { useTransactions } from '../../hooks/useTransaction';
interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: ()=> void;

}
export function NewTransactionModal({isOpen, onRequestClose } : NewTransactionModalProps){
    const {createTransaction} = useTransactions()
    const [type,setType] = useState('deposit')
    const [title,setTitle] = useState('')
    const [amount,setAmount] = useState(0)
    const [category, setCategory] = useState('')
    async function handleCreateNewTransaction(event : FormEvent){
        event.preventDefault();
      await createTransaction(
           {
               type,amount,category,title
           }
       )
       setType('deposit')
       setTitle('')
       setAmount(0)
       setCategory('')

       onRequestClose()

    }
    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
          <button type='button'onClick={onRequestClose} className='react-modal-close'>
              <img src={CloseImg} alt="Fechar modal" />
          </button>
          <Container onSubmit={handleCreateNewTransaction}>
             <h2>Cadastrar transação</h2>  
             <input 
              placeholder='Título'
              value={title}
              onChange={event => setTitle(event.target.value)}
             />
              <input 
              type='number'
              placeholder='Valor'
              value={amount}
              onChange={event => setAmount(Number(event.target.value))}
           
             />
             <TransactionTypeContainer>
                 <RadioBox
                 type='button'
                 onClick={()=>{setType('deposit')}}
                 isActive={type === 'deposit'}
                 colorActive = "green"
                 >
                  <img src={incomeImg} alt="entrada" />
                  <span>Entrada</span>

                 </RadioBox>
                 <RadioBox
                 type='button'
                 onClick={()=>{setType('withdraw')}}
                 isActive={type === 'withdraw'}
                 colorActive = "red"
                 >
                  <img src={outcomeImg} alt="saida" />
                  <span>Saida</span>

                 </RadioBox>

             </TransactionTypeContainer>
              <input 
              placeholder='Categoria'
              value={category}
              onChange={event => setCategory(event.target.value)}
             />
             <button type='submit'>Cadastrar</button>
          </Container>
        
      </Modal>
    )
}