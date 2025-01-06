
import "./survey.css"
import { useState } from "react";
import { data } from "../asset/data.js";
import { AddQuestion } from "../store/surveySlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Survey = () => {
    const dispatch = useDispatch();

    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const[answerforinput, setAnswerforinput] = useState("");

    const [chooseanswer, setChooseanswer] = useState("");
    const [questionselect, setQuestionselect] = useState("");
    const [flag, setFlag] = useState(false);
    const[flagfortime, setFlagfortime] = useState(false);
    const [flagforchoise, setFlagforchoise] = useState(false);
    const[inputboxdata, setInputboxdata] = useState("");

    const handleAdd = () => {

        setFlag(false);
        setFlagfortime(false);
        setFlagforchoise(false);

        if (lock == true) {
            setIndex(index + 1);
            setQuestion(data[index + 1]);
            // console.log(chooseanswer)
            setLock(false);

            dispatch(AddQuestion({
                question: questionselect,
                answer: chooseanswer,
                inputbox: inputboxdata,
            }));

        }

        // console.log(e)
    }

    const addOption = (item) => {
        setAnswerforinput(item);
        if (item === "HALF MARATHON" || item === "FULL MARATHON") {
            setFlag(true);

        }
        else if (item === "21K" || item === "42K") {
            setFlagfortime(true);
            
        }
        else if(item === "Other"){
            setFlagforchoise(true);
            
        }
        setInputboxdata("");
        console.log(inputboxdata)
        
    }


    let userData = useSelector((state) => state.user);

    if (index == data.length) {
        return (
            <div className="w-full h-screen flex flex-col items-center ">
                <h1 className=" text-center text-3xl font-bold mt-10">Here, your result is Generated</h1>
                <Link to="/result" className=" inline-block mx-auto items-center text-white px-8 bg-black py-2 rounded-lg mt-6 text-2xl" > View Result </Link>
            </div>
        )
    }
    return (
        <div className="max-w-screen-md mx-auto mt-5 mb-10  p-5 ">
            <h1 className=" mt-6 mb-4 text-3xl font-bold">Hello {userData.name} , Welcome to your Running Journey</h1>



            <h1 className="my-10 text-center text-2xl font-semibold">{index + 1}. {question.Question} </h1>
            <div className="flex flex-wrap justify-center ">
                {question.option.map((item, index) => (
                    <li onClick={(e) => {
                        if (lock == false) {
                            addOption(item);
                            setQuestionselect(question.Question);
                            setChooseanswer(item);
                            e.target.classList.add("selected");
                            setLock(true);
                        }
                    }} key={index} >{item}</li>
                    
                ))}

            </div>
            {flag && <div className="mt-10 flex flex-col items-center"><h3>How many {answerforinput} completed?</h3><input required className=" border-none outline-none w-1/2 rounded-md mt-4 p-2" onChange={(e) => { setInputboxdata(e.target.value) }} type="number" placeholder="how mani times" /></div>}
            {flagfortime && <div className="mt-10 flex flex-col items-center"><h3>Select time (HH.MM) for {answerforinput}</h3><input required className=" border-none outline-none w-1/2 rounded-md mt-4 p-2" onChange={(e) => { setInputboxdata(e.target.value) }} type="time" placeholder="" /></div>}
            {flagforchoise && <div className="mt-10 flex flex-col items-center"><h3>Enter the Name of it</h3><input required className=" border-none outline-none w-1/2 rounded-md mt-4 p-2" onChange={(e) => { setInputboxdata(e.target.value) }} type="text" placeholder="" /></div>}

            <div className=" max-w-screen-md mx-auto mt-10">
                <div className="m-auto flex items-center   justify-between">
                    <button className="  text-white px-8 bg-black py-2 rounded-lg  text-xl">Back</button>
                    {
                        <p className="text-center">{index + 1} out of {data.length}</p>
                    }
                    <button onClick={() => {
                        question.option.map((item, index) => {
                            document.querySelectorAll("li")[index].classList.remove("selected")
                        })
                        handleAdd();



                    }} className=" text-white px-8 bg-black py-2 rounded-lg  text-xl">Next ➟
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Survey;