import { useForm } from 'react-hook-form';
import { useRegisterMutation } from './accountApi';
import { registerSchema, type RegisterSchema } from '../../lib/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockOutlined } from '@mui/icons-material';
import { Container, Paper, Box, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router';
import { handleApiError } from '../../lib/util';

export default function RegisterForm() {
  const [registerUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isLoading },
  } = useForm<RegisterSchema>({
    mode: 'onTouched',
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await registerUser(data).unwrap();
    } catch (error) {
      console.log(error);
      handleApiError<RegisterSchema>(error, setError, ['email', 'password']);
    }
  };

  return (
    <Container component={Paper} maxWidth='sm' sx={{ borderRadius: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <LockOutlined sx={{ mt: 3, color: 'secondary.main', fontSize: 40 }} />
        <Typography variant='h5'>Register</Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3, my: 3 }}>
          <TextField
            fullWidth
            label='Email'
            autoFocus
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label='Password'
            type='password'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button disabled={isLoading || !isValid} variant='contained' type='submit'>
            Register
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?
            <Typography sx={{ ml: 1 }} component={Link} to='/login' color='primary'>
              Sign in
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
