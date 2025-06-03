import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../../store/useAuthStore";
interface ILoginForm {
    email: string;
    password: string;
}
const LoginForm = () => {
    const {handleSubmit, formState: { errors }, control, setError } = useForm({
        defaultValues: {
            email: 'test123456@gmail.com',
            password: '12345678'
        }
    });
    const {login} = useAuthStore();
    const onSubmit = async (data: ILoginForm) => {
        const response = await login(data.email, data.password);
    }
   
    return <>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <div className="mb-3">
                <Controller name="email"
                    control={control}
                    rules={{ required: true,
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address"
                        }
                    }}
                    render={({ field }) => (
                        <div 
                        className="
                        relative
                        "
                        >
                            <input
                                {...field}
                                id="email"
                                type="email"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Email"
                                ref={field.ref}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm absolute top-[-20px] text-xs left-0 mt-1">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                    )} />
            </div>
            <div className="mb-3">
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: true}}
                    render={({ field }) => (
                        <div className="relative">
                            <input
                                {...field}
                                id="password"
                                type="password"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Password"
                                ref={field.ref}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm absolute top-[-20px] text-xs left-0 mt-1">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                    )} />
            </div>

            <div className="mb-3">
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Login
                </button>
            </div>
        </form>
    </>
}

export default LoginForm