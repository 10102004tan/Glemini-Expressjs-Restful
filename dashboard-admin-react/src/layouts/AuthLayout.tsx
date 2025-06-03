const AuthLayout = ({ children }) => {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            {children}
        </div>
    )
}
export default AuthLayout