import React from 'react';
import { useGetDailyNoteQuery } from '../../app/services/dailyNote';

const DailyNote: React.FC = () => {
  const { data: dailyNote, isLoading } = useGetDailyNoteQuery({})
  
  return (
    <div>
      
    </div>
  )
}

export default DailyNote;
