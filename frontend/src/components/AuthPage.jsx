import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function AuthPage() {
    return (
        <div>
            <div>
                <h2>Login</h2>
                <LoginForm />
            </div>
            <div>
                <h2>Register</h2>
                <RegisterForm />
            </div>
        </div>
    );
}

export default AuthPage;