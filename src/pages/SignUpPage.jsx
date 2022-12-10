import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from 'api/auth';
import Swal from 'sweetalert2';


const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    if (username.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }
    const { success, authToken } = await register({ username, email, password });

    if (success) {
      localStorage.setItem('authToken', authToken);
      Swal.fire({
        title: '註冊成功',
        icon: 'success',
        showCancelButton: false,
        timer: 1000,
        position: 'top'
      });
      return;
    }
    Swal.fire({
      title: '註冊失敗',
      icon: 'error',
      showCancelButton: false,
      timer: 1000,
      position: 'top'
    });
  }

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={username}
          onChange={(nameInputValue) => { setUsername(nameInputValue) }}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="信箱"
          placeholder="請輸入信箱"
          value={email}
          onChange={(emailInputValue) => { setEmail(emailInputValue) }}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="密碼"
          placeholder="請輸入密碼"
          type="password"
          value={password}
          onChange={(passwordInputValue) => { setPassword(passwordInputValue) }}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>註冊</AuthButton>

      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
