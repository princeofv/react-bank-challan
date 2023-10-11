import {
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useState } from 'react';
import numberToWords from 'number-to-words';


export default function BankChallan() {
  const [amount, setAmount] = useState<number>(1000);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(event.target.value);
    setAmount(isNaN(newAmount) ? 0 : newAmount);
  };

  // const formatToIndianRupees = (value: number) => {
  //   return value.toLocaleString('en-IN', {
  //     style: 'currency',
  //     currency: 'INR',
  //     maximumFractionDigits: 2,
  //   });
  // };

  // const convertToWords = (value: number) => {
  //   return numberToWords.toWords(value);
  // };

  const convertToWordsWithLakhsAndCrores = (value: number) => {
    const crore = Math.floor(value / 10000000); // 1 crore = 10,000,000
    const lakh = Math.floor((value % 10000000) / 100000); // 1 lakh = 100,000
    const remaining = value % 100000;

    const croreWords = crore > 0 ? `${numberToWords.toWords(crore)} crore` : '';
    const lakhWords = lakh > 0 ? `${numberToWords.toWords(lakh)} lakh` : '';
    const remainingWords = remaining > 0 ? numberToWords.toWords(remaining) : '';

    let result = '';
    if (croreWords) result += croreWords;
    if (lakhWords) {
      if (result) result += ' ';
      result += lakhWords;
    }
    if (remainingWords) {
      if (result) result += ' ';
      result += remainingWords;
    }

    return result || 'Zero';
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      flexDirection={'column'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Bank Challan Form
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Amount (in INR)
        </Text>
        <FormControl id="email">
          <Input
            placeholder="1000"
            _placeholder={{ color: 'gray.500' }}
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
        </FormControl>
        <div>
          <label>Amount in Words </label>
          <Text fontSize='30px' color='tomato'>{convertToWordsWithLakhsAndCrores(amount)} rupees  only /- </Text>
        </div>
       
        {/* <div>
          <label>Formatted Amount:</label>
          <p>{formatToIndianRupees(amount)}</p>
        </div> */}
        {/* <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Request Reset
          </Button>
        </Stack> */}
      
      </Stack>
     
    </Flex>
    
  )
}