import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function LoginRegisterTabs() {
  return (
    <Tabs
      defaultActiveKey="login"
      id="login-register-tabs"
      className="mb-3"
      justify
    >
      <Tab eventKey="login" title="Log in">
        <LoginForm />
      </Tab>
      <Tab eventKey="register" title="Sign up">
        <RegisterForm />
      </Tab>
    </Tabs>
  );
}

export default LoginRegisterTabs;