
import "./input-details.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userDetails";

const Input_details = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [emailError, setEmailError] = useState("");
    const validateEmail = (e) => {
        const email = e.target.value;
        if (validator.isEmail(email)) {
            setEmailError("");
        } else {
            setEmailError("Enter valid Email!");
        }
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [weight, setWeight] = useState("");
    const [height_inch, setHeight_inch] = useState("");
    const [height_feet, setHeight_feet] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    // const [height, setHeight] = useState("");
    // const [flag, setFlag] = useState(false);
    
    const userDetailsData = (e) => {
        e.preventDefault();
        const userData = {
            name, email, city, weight, height: {
                height_feet, height_inch,
            }, gender, dob
        };
        dispatch(setUser(userData));
        // localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/survey");
    }


    return (
        <div>
            <h1 className=" mb-10 text-center text-3xl font-bold mt-10">Fill Your Details </h1>

            <div className="mb-10" >
                <div className="mx-auto max-w-screen-md mt-2">
                    <form className="px-4" onSubmit={(e) => {
                        userDetailsData(e)
                    }} >
                        <h2 className=" text-lg mt-4 font-semibold">What is your name?</h2>
                        <input value={name} onChange={(e) => setName(e.target.value)} className=" inline-block w-full text-lg py-4 px-2 border-none outline-none rounded-lg border-gray-300 mt-2" type="text" placeholder="Enter Your Name" required />

                        <h2 className=" text-lg mt-4 font-semibold">What is your email?</h2>
                        <input value={email} className=" inline-block w-full text-lg py-4 px-2 border-none outline-none rounded-lg border-gray-300 mt-2" type="text"
                            id="userEmail"
                            onChange={(e) => {
                                validateEmail(e)
                                setEmail(e.target.value)
                            }} placeholder="Enter Your Email" required />
                        <span className="text-red-500">{emailError}</span>

                        <h2 className=" text-lg mt-4 font-semibold">In which city do you currently reside?</h2>
                        <input value={city} onChange={(e) => setCity(e.target.value)} className=" inline-block w-full text-lg py-4 px-2 border-none outline-none rounded-lg border-gray-300 mt-2" type="text" placeholder="city" required />

                        <h2 className=" text-lg mt-4 font-semibold">What is your weight (in kgs)?</h2>
                        <input value={weight} onChange={(e) => setWeight(e.target.value)} className=" inline-block w-full text-lg py-4 px-2 border-none outline-none rounded-lg border-gray-300 mt-2" type="number" step="0.1"
                            min="30"
                            max="150" placeholder="weight (in kgs)" required />

                        <h2 className=" text-lg mt-4 font-semibold">What is your height (in ft)?</h2>

                        <div className=" flex">
                            <input pattern="^-?[0-9]\d*\.?\d*$*" value={height_feet} onChange={(e) => setHeight_feet(e.target.value)} className=" mr-2 inline-block w-full text-lg py-4 px-2 border-none outline-none rounded-lg border-gray-300 mt-2" type="number"
                                step="0"
                                min="4"
                                max="7" placeholder="height (in ft)" required />
                            <input pattern="^-?[0-9]\d*\.?\d*$*" value={height_inch} onChange={(e) => setHeight_inch(e.target.value)} className=" inline-block w-full text-lg py-4 px-2 border-none outline-none rounded-lg border-gray-300 mt-2" type="number"
                                step="0"
                                min="0"
                                max="12" placeholder="height (in inch)" required />
                        </div>

                        <h2 className=" text-lg mt-4 font-semibold">Gender</h2>

                        <div className=" flex flex-col items-start">
                            <div className=" flex">
                                <input onChange={(e) => setGender(e.target.value)} className="mr-2" type="radio" value="Male" name="gender" id="male" required />
                                <h2>Male</h2>
                            </div>
                            <div className=" flex">
                                <input onChange={(e) => setGender(e.target.value)} className="mr-2" type="radio" value="Female" name="gender" id="female" required />
                                <h2>Female</h2>
                            </div>
                        </div>

                        <h2 className=" text-lg mt-4 font-semibold">What is your date of birth?</h2>
                        <input value={dob} onChange={(e) => setDob(e.target.value)} className=" inline-block w-full text-lg py-4 px-2 border-none outline-none rounded-lg border-gray-300 mt-2" type="date" placeholder="height (in ft)" required />
                        <button type="submit" className=" inline-block  text-white px-8 bg-black py-2 rounded-lg mt-6 text-2xl">Submit</button>
                        {/* {flag && <Link to="/survey">next</Link>} */}
                    </form>
                </div>
            </div>
        </div>
    );
};


export default Input_details;