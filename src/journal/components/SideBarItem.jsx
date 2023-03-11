import { useMemo } from "react"
import { useDispatch } from "react-redux";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"

import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({title,body,id,date, imageUrls=[],imageIds=[]}) => {
    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.length > 17
        ? title.substring(0,17)+'...'
        : title
    }, [title])

    const activeNote = () =>{
        dispatch( setActiveNote({title,body,id,date,imageUrls,imageIds}) );
    }

    return (
        <ListItem key={id} disablePadding>
            <ListItemButton onClick={ activeNote }>
                <ListItemIcon>
                    <TurnedInNot/>
                </ListItemIcon>
                <Grid container sx={{ 
                    display: {xs:'block'}
                    }}>
                    <ListItemText primary={newTitle}/>
                    <ListItemText secondary={body}/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
