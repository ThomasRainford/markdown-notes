import React from 'react'
import { Note } from '../generated/graphql'
import { ExactNoteLocation, NoteLocation } from '../types/types'

interface NoteContextData {
   selectNoteLocation: (noteLocation: ExactNoteLocation) => void,
   getSelectedNoteLocation: () => ExactNoteLocation
}

export const NoteContext = React.createContext<NoteContextData>(null)

const NoteProvider: React.FC = ({ children }) => {

   const [selectedNoteLocation, setSelectedNoteLocation] = React.useState<ExactNoteLocation>()

   const selectNoteLocation = (noteLocation: ExactNoteLocation) => {
      setSelectedNoteLocation(noteLocation)
   }

   const getSelectedNoteLocation = (): ExactNoteLocation => selectedNoteLocation

   return (
      <NoteContext.Provider
         value={{
            selectNoteLocation,
            getSelectedNoteLocation
         }}
      >
         {children}
      </NoteContext.Provider>
   )
}

export default NoteProvider

