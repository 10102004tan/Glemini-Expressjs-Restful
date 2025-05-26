import DocumentTitle from "../components/DocumentTitle";
import LoginForm from "../components/form/LoginForm";
import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
    return (
        <>
            <DocumentTitle title="Login" />
            <AuthLayout>
                <div>
                    <h1
                    className="text-2xl font-bold text-center mb-4"
                    >Admin login page</h1>
                    <LoginForm/>
                </div>
            </AuthLayout>
        </>
    )
}

export default Login;