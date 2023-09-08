import { Theme } from '../../ui/theme';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { User } from '../../../types/types';
import { LOGIN_URL } from '../../../config/urls';
import { handleResponse } from '../../../utils';
import { toast } from 'react-toastify';
import { setCurrentUser } from '../../../store/reducers/userReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, nickname: e.target.value }));
  };

  const handleLogin = async () => {
    if (user.nickname === '') return;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    await fetch(LOGIN_URL, requestOptions)
      .then(handleResponse)
      .then((response) => {
        toast.success(`Created the '${user.nickname}' user successfully!`);
        dispatch(setCurrentUser(response.user));
        return;
      });

    navigate('/');
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
            Login
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {'Register'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Theme>
  );
};
