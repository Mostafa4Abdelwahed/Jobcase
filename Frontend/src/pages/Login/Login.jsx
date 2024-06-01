import { useState } from "react";
import { useDispatch } from "react-redux"
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import { loginUser, registerUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
    const [selected, setSelected] = useState("login");
    const [signinLoading, setSigninLoading] = useState(false);
    const [signupLoading, setsignupLoading] = useState(false);
    const [signinForm, setSigninForm] = useState({email: "", password: ""});
    const [signupForm, setSignupForm] = useState({ name: "", email: "", password: ""});
    const dispatch = useDispatch();


    const signUpHandler = () => {
        setsignupLoading(true);
        dispatch(registerUser(signupForm))
        setsignupLoading(false);
    }

    const signInHandler = async () => {
        setSigninLoading(true);
        dispatch(loginUser(signinForm))
        setSigninLoading(false);
    }


    return (
        <div className="flex items-center justify-center bg-gray-50 dark:bg-zinc-800 min-h-screen w-full">
            <div className="flex flex-col">
                <Card className="md:w-[450px] md:h-[400px]">
                    <CardBody className="overflow-hidden">
                        <Tabs
                            fullWidth
                            size="lg"
                            aria-label="Tabs form"
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                        >
                            <Tab key="login" title="Login">
                                <form className="flex flex-col gap-4">
                                    <Input
                                        isRequired
                                        label="Email"
                                        placeholder="Enter your email"
                                        type="email"
                                        value={signinForm.email}
                                        onChange={(e) => { setSigninForm({ ...signinForm, email: e.target.value }) }}
                                    />
                                    <Input
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                        value={signinForm.password}
                                        onChange={(e) => { setSigninForm({ ...signinForm, password: e.target.value }) }}
                                    />
                                    <p className="text-center text-small">
                                        Need to create an account?{" "}
                                        <Link className="cursor-pointer" size="sm" onPress={() => setSelected("sign-up")}>
                                            Sign up
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button onClick={signInHandler} fullWidth isLoading={signinLoading} color="primary" >
                                            Login
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                            <Tab key="sign-up" title="Sign up">
                                <form className="flex flex-col gap-4 h-[300px]">
                                    <Input
                                        isRequired
                                        label="Name"
                                        placeholder="Enter your name"
                                        type="text"
                                        value={signupForm.name}
                                        onChange={(e) => { setSignupForm({ ...signupForm, name: e.target.value }) }}
                                    />
                                    <Input
                                        isRequired
                                        label="Email"
                                        placeholder="Enter your email"
                                        type="email"
                                        value={signupForm.email}
                                        onChange={(e) => { setSignupForm({ ...signupForm, email: e.target.value }) }}
                                    />
                                    <Input
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                        value={signupForm.password}
                                        onChange={(e) => { setSignupForm({ ...signupForm, password: e.target.value }) }}
                                    />
                                    <p className="text-center text-small">
                                        Already have an account?{" "}
                                        <Link className="cursor-pointer" size="sm" onPress={() => setSelected("login")}>
                                            Login
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button onClick={signUpHandler} isLoading={signupLoading} fullWidth color="primary">
                                            Sign up
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Login