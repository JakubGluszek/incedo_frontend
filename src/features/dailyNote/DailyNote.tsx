import React, { useEffect, useState } from 'react';
import { useGetDailyNoteQuery } from '../../app/services/dailyNote';
import Note from '../../components/Note';

const DailyNote: React.FC = () => {
  const { data: dailyNote } = useGetDailyNoteQuery({})
  const [body, setBody] = useState("")

  useEffect(() => {
    if (dailyNote) {
      setBody(dailyNote.body)
    } else {
      setBody("# Hello")
    }
  }, [dailyNote])

  useEffect(() => {
    console.log(body)
  }, [body])

  return (
    <div className='card'>
      <Note body={body} setBody={setBody} />
    </div>
  )
}

export default DailyNote;
