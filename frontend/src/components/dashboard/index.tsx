'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import style from './../../styles/dashboard.module.scss';
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';

import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Theme } from '../ui';
import { Room } from '../../types/types';
import { ROOM_URL } from '../../config/urls';
import { handleResponse } from '../../utils';
import { toast } from 'react-toastify';
import { setRoom } from '../../store/reducers/roomReducer';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.persists.user.currentUser);
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [room, setSelectedRoom] = React.useState<Room | undefined>(undefined);
  const [newRoomName, setNewRoomName] = React.useState<string>('NewRoom');
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [personName, setPersonName] = React.useState<string[]>([]);

  // connect server
  React.useEffect(() => {
    const newSocket = io('http://localhost:3001'); // Replace with your server URL
    setSocket(newSocket);
  }, []);

  React.useEffect(() => {
    fetchRooms();
  }, []);

  // fetch rooms
  const fetchRooms = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    await fetch(ROOM_URL, requestOptions)
      .then(handleResponse)
      .then((response) => {
        setRooms(response.rooms);
      });
  };

  /// Events
  const handleChangeMultiple = (event: SelectChangeEvent<string[]>) => {
    const value: string | string[] = event.target.value;
    const currentRoom = rooms.find((room) => {
      if (typeof value === 'string') {
        if (room.id?.toString() === value) return true;
      }
    });
    if (currentRoom) {
      setPersonName([currentRoom.id.toString()]);
      setSelectedRoom(currentRoom);
    }
  };

  const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRoomName(e.target.value.trim());
  };

  // join
  const handleJoinRoom = () => {
    if (socket && room) {
      dispatch(setRoom(room));
      socket.emit('joinRoom', room.id, currentUser.nickname);
      navigate('/chats');
    }
  };

  // create Room
  const handleCreateRoom = async () => {
    const canCreate = currentUser.nickname && newRoomName;
    if (canCreate) {
      const roomData = {
        room: newRoomName,
        owner: currentUser.id
      };

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData)
      };
      await fetch(ROOM_URL, requestOptions)
        .then(handleResponse)
        .then((response) => {
          toast.success(`Created the '${roomData.room}' room by ${roomData.owner} successfully!`);
          return response.rooms;
        });

      fetchRooms();
    }
  };

  return (
    <Theme>
      <Container className={style.join_room}>
        <Box className={style.join_room_body}>
          <Box className={style.join_room_title}>
            <Typography component="h1" variant="h4" p="2">
              Join Room
            </Typography>
          </Box>
          <Box color={'#bbb'}>
            <Typography component="h4" p="2">
              Nickname: <b>{currentUser.nickname}</b>
            </Typography>
            <Typography component="h4" p="2">
              Room: <b>{room?.room}</b>
            </Typography>
            <Typography component="h4" p="2">
              Server: {socket?.connected ? 'On' : 'Off'}
            </Typography>
          </Box>
          <Box className={style.join_room_content}>
            <Grid>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel shrink htmlFor="select-multiple-native">
                  Rooms
                </InputLabel>
                <Select
                  multiple
                  native
                  value={personName}
                  onChange={(e) => handleChangeMultiple(e)}
                  label="Rooms"
                  inputProps={{
                    id: 'select-multiple-native'
                  }}
                >
                  {rooms &&
                    rooms.map((room, index) => (
                      <option key={index} value={room.id}>
                        {room.room}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid className={style.action}>
              <TextField value={newRoomName} onChange={handleRoomNameChange} size="small" />
              <Button onClick={handleCreateRoom} variant="outlined" size="large">
                Create Room
              </Button>

              <Button onClick={handleJoinRoom} variant="outlined" size="large">
                Join Room
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Theme>
  );
};
