import { Typography, Box, Divider, TextField, MenuItem } from '@mui/material'
import React, { useState } from 'react'

const AddAnnouncement = () => {
    const [title, setTitle] = useState('');
    const [accessGroup, setAccessGroup] = useState([]);
    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
  return (
    <>
        <Box padding='40px'>
            <Typography variant='h3'>Add Announcement</Typography>
            <Typography variant='h4'>Announcement Details</Typography>
            <Divider/>
            <TextField
            fullWidth
            required
            type='input'
            value={title}
            onChange={handleTitle}
            label='Announcement Title'
            variant='filled'
            />
            <TextField
            select
            variant='filled'
            label='Access group'
            >
            {/* {accessGroup.map((option) => (
              <MenuItem key={option.value}>
                option
              </MenuItem>
            ))} */}
            </TextField>
        </Box>


    </>
  )
}

export default AddAnnouncement