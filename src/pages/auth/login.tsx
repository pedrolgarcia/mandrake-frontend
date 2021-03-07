import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Alert, Slide, Snackbar } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

import Copyright from '@components/Copyright';

import useStyles from '@styles/pages/auth/login';

import { useAuth } from '@utils/hooks/useAuth';

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

export default function Login() {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<boolean | string>(false);

  const classes = useStyles();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await signIn(email, password);
      console.log(response);
    } catch(e) {
      console.log(e);
      setError(e);
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={9} className={classes.image} />
      <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square justifyContent="space-between">
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Bem-vindo
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              width: '100%',
              mt: 1,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar de mim"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Não tem uma conta? Cadastre-se aqui"}
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Snackbar
            open={!!error}
            onClose={() => setError(false)}
            autoHideDuration={4000}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert onClose={() => setError(false)} severity="error" variant="filled">
              {String(error)}
            </Alert>
          </Snackbar>
        </Box>

        <Copyright />
      </Grid>
    </Grid>
  );
}