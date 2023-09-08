import { Theme } from '../../ui/theme';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { User } from '../../../types/types';
import { handleResponse } from '../../../utils';
import { toast } from 'react-toastify';
import { REGISTER_URL } from '../../../config/urls';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../store/reducers/userReducer';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, nickname: e.target.value }));
  };

  const handleRegister = async () => {
    if (user.nickname === '') return;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    await fetch(REGISTER_URL, requestOptions)
      .then(handleResponse)
      .then((response) => {
        toast.success(`Created the '${user.nickname}' user successfully!`);
        dispatch(setCurrentUser(response.user));
        return;
      });

    navigate('/login');
  };

  return (
    <Theme>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nick Name"
              name="username"
              value={user.nickname ?? ''}
              onChange={handleChange}
              autoFocus
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {'Login'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Theme>
  );
};
