import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView, NoteView } from '../../views';
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

export const JournalPage = () => {
  return (
    // <JournalLayout>
    //   <NothingSelectedView/>
    //   Hola
    // </JournalLayout>
    <>
      {/* <JournalLayout childen={<NothingSelectedView/>}/> */}
      <JournalLayout childen={<NoteView/>}/>

      <IconButton
       size="large"
       sx={{
        color: 'white',
        backgroundColor: 'error.main',
        ':hover': {backgroundColor: 'error.main', opacity: 0.9},
        position: 'fixed',
        right: 50,
        bottom: 50
      }} 
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>
    </>
  )
}