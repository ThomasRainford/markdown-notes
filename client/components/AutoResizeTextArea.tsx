import { Textarea } from "@chakra-ui/react";
//import ResizeTextarea from "react-textarea-autosize";
import TextareaAutosize from 'react-autosize-textarea';
import React, { ReactNode } from "react";

interface Props {
   children: ReactNode
   value: string
}

const AutoResizeTextarea: any = React.forwardRef<HTMLTextAreaElement>((props: Props, ref) => {
   return (
      <Textarea
         name="body"
         variant="flushed"
         w="100%"
         resize="none"
         rows={15}
         ref={ref}
         as={TextareaAutosize}
         {...props}
      />
   )
})

export default AutoResizeTextarea