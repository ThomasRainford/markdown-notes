import React from 'react'
import { ExactNoteLocation } from '../types/types'

interface NoteContextData {
   selectNoteLocation: (noteLocation: ExactNoteLocation) => void,
   getSelectedNoteLocation: () => ExactNoteLocation
}

export const NoteContext = React.createContext<NoteContextData>(null)

const NoteProvider: React.FC = ({ children }) => {

   const [selectedNoteLocation, setSelectedNoteLocation] = React.useState<ExactNoteLocation>()

   //console.log('context: ', selectedNoteLocation)

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

