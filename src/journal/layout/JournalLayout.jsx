import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { NavBar,SideBar } from "../components";

const drawerWidth = 300;

export const JournalLayout = ({ childen }) => {
  return (
    <Box sx={{ display:'flex' }} className='animate__animated animate__fadeIn animate__faster'>
      {/* Navbar */}
      <NavBar drawerWidth={drawerWidth}/>

      {/* Sidebar */}
      <SideBar drawerWidth={drawerWidth}/>

      <Box component='main' sx={{ flexGrow:1, p:3 }}>
        {/* Toolbar */}
        <Toolbar/>
        { childen }
      </Box>
    </Box>
  )
}
