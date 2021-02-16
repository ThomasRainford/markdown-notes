import React from 'react'
import { Note } from '../generated/graphql'

interface NoteContextData {
   selectNote: (note: Note) => void,
   getSelectedNote: () => Note
}

export const NoteContext = React.createContext<NoteContextData>(null)

const NoteProvider: React.FC = ({ children }) => {

   const [selectedNote, setSelectedNote] = React.useState<Note>()

   const selectNote = (note: Note) => {
      console.log('note: ', note)
      setSelectedNote(note)
   }

   const getSelectedNote = (): Note => selectedNote

   return (
      <NoteContext.Provider
         value={{
            selectNote,
            getSelectedNote
         }}
      >
         {children}
      </NoteContext.Provider>
   )
}

export default NoteProvider

