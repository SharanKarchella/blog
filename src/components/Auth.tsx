import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "sharan666";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        username: "",
        password: "",
        name: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            //setting the jwt in the local storage
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            //alert the user here 
            alert("Error while signing up")
        }
    }
    return <div className="h-screen flex justify-center flex-col ">
        
        <div className="flex justify-center">
            <div>
                <div>
                    <div className="font-bold text-3xl ">
                        Create an account
                    </div>
                    <div className="text-slate-500">
                        {type === "signin" ? "Don't have an acoount" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link >
                    </div>
                </div>

                <div>
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Sharan" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value,
                        })
                    }} /> : null}

                    <LabelledInput label="Username" placeholder="Sharan@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value,
                        })
                    }} />

                    <LabelledInput label="Password" type={"password"} placeholder="Sharan..." onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value,
                        })
                    }} />

                    <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-6">{type === "signin" ? "Sign in" : "Sign up"}</button>
                </div>

            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-3" >{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />



    </div>
}