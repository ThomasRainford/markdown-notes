import { Popover, PopoverTrigger, Button, PopoverContent, Text, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useClipboard } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { snippets, TableDimensions } from '../../utils/snippets'

interface Props {
   label: string
   icon: JSX.Element
}

const SnippetButtonPopover: React.FC<Props> = ({ label, icon }) => {

   const [dimensions, setDimensions] = useState<TableDimensions>({ rows: 1, columns: 1 })

   const [snippetValue, setSnippetValue] = useState<string>()
   const { hasCopied, onCopy } = useClipboard(snippetValue)

   useEffect(() => {
      onCopy()
   }, [snippetValue])

   return (
      <Popover>
         <PopoverTrigger>
            <IconButton
               aria-label={label}
               color="brand.300"
               icon={icon}
               variant="outline"
               fontSize="2xl"
               mb="0.15em"
               onClick={() => {
               }}
            />
         </PopoverTrigger>
         <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Table Size</PopoverHeader>
            <PopoverBody>
               <Text>Rows</Text>
               <NumberInput
                  onChange={(value) => setDimensions({ ...dimensions, rows: parseInt(value) })}
                  value={dimensions.rows}
                  min={1}
               >
                  <NumberInputField />
                  <NumberInputStepper>
                     <NumberIncrementStepper />
                     <NumberDecrementStepper />
                  </NumberInputStepper>
               </NumberInput>
               <Text>Columns</Text>
               <NumberInput
                  onChange={(value) => setDimensions({ ...dimensions, columns: parseInt(value) })}
                  value={dimensions.columns}
                  min={1}
               >
                  <NumberInputField />
                  <NumberInputStepper>
                     <NumberIncrementStepper />
                     <NumberDecrementStepper />
                  </NumberInputStepper>
               </NumberInput>
               <Button
                  onClick={() => {
                     const table: string = snippets.table.create({
                        rows: dimensions.rows,
                        columns: dimensions.columns
                     })
                     setSnippetValue(table)
                  }}
               >
                  Create
               </Button>
            </PopoverBody>
         </PopoverContent>
      </Popover>
   )
}

export default SnippetButtonPopover
