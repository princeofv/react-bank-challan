import React from 'react'
// import BankChallanForm from './BankChallanForm'
import { ChakraProvider } from '@chakra-ui/react'
import BankChallan from './BankChallan'

export default function App() {
  return (
    <ChakraProvider>
      <BankChallan />
    </ChakraProvider>
  )
}
