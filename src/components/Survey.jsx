import "./survey.css";
import { useState } from "react";
import { data } from "../asset/data.js";
import { addOrUpdateAnswer } from "../store/surveySlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Survey = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const storedAnswers = useSelector((state) => state.survey.answers); // Get stored answers

    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [chooseanswer, setChooseanswer] = useState(storedAnswers[question.Question]?.answer || "");
    const [inputboxdata, setInputboxdata] = useState(storedAnswers[question.Question]?.inputbox || "");
    const [flag, setFlag] = useState(false);
    const [flagfortime, setFlagfortime] = useState(false);
    const [flagforchoise, setFlagforchoise] = useState(false);
    const [optionerror, setOptionerror] = useState(false);

    const handleNext = () => {
        setFlag(false);
        setFlagfortime(false);
        setFlagforchoise(false);

        setOptionerror(true);
        if (lock) {
            // Save current answer to Redux store
            dispatch(
                addOrUpdateAnswer({
                    question: question.Question,
                    answer: chooseanswer,
                    inputbox: inputboxdata,
                })
            );

            setOptionerror(false)
            // Move to next question
            if (index + 1 < data.length) {
                setIndex(index + 1);
                setQuestion(data[index + 1]);
                const nextQuestion = data[index + 1].Question;
                setChooseanswer(storedAnswers[nextQuestion]?.answer || "");
                setInputboxdata(storedAnswers[nextQuestion]?.inputbox || "");
                setLock(!!storedAnswers[nextQuestion]?.answer);
            }
        }
    };

    const handleBack = () => {
        if (index > 0) {
            // Save current answer to Redux store
            dispatch(
                addOrUpdateAnswer({
                    question: question.Question,
                    answer: chooseanswer,
                    inputbox: inputboxdata,
                })
            );

            setOptionerror(false);
            // Move to previous question
            setIndex(index - 1);
            setQuestion(data[index - 1]);
            const prevQuestion = data[index - 1].Question;
            setChooseanswer(storedAnswers[prevQuestion]?.answer || "");
            setInputboxdata(storedAnswers[prevQuestion]?.inputbox || "");
            setLock(!!storedAnswers[prevQuestion]?.answer);
        }
    };

    const addOption = (item) => {
        setOptionerror(false);
        setChooseanswer(item);

        if (item === "HALF MARATHON" || item === "FULL MARATHON") {
            setFlag(true);
        } else if (item === "21K" || item === "42K") {
            setFlagfortime(true);
        } else if (item === "Other") {
            setFlagforchoise(true);
        } else {
            setFlag(false);
            setFlagfortime(false);
            setFlagforchoise(false);
        }

        setInputboxdata(storedAnswers[question.Question]?.inputbox || "");
    };

    if (index+1 === data.length) {
        return (
            <div className="w-full h-screen flex flex-col items-center ">
                <h1 className=" text-center text-3xl font-bold mt-10">
                    Here, your result is Generated
                </h1>
                <Link
                    to="/result"
                    className=" inline-block mx-auto items-center text-white px-8 bg-black py-2 rounded-lg mt-6 text-2xl"
                >
                    View Result
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-screen-md mx-auto mt-5 mb-10  p-5 ">
            <h1 className=" mt-6 mb-4 text-3xl font-bold">
                Hello , Welcome to your Running Journey
            </h1>

            <h1 className="my-10 text-center text-2xl font-semibold">
                {index + 1}. {question.Question}
            </h1>
            <div className="flex flex-wrap justify-center ">
                {question.option.map((item, i) => (
                    <li
                        key={i}
                        onClick={(e) => {
                            const alloption = e.target.parentNode.children;
                            Array.from(alloption).forEach((child) =>
                                child.classList.remove("selected")
                            );
                            e.target.classList.add("selected");
                            addOption(item);
                            setLock(true);
                        }}
                        className={chooseanswer === item ? "selected" : ""}
                    >
                        {item}
                    </li>
                ))}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleNext();
                }}
            >
                {flag && (
                    <div className="mt-10 flex flex-col items-center">
                        <h3>How many {chooseanswer} completed?</h3>
                        <input
                            required
                            className=" border-none outline-none w-1/2 rounded-md mt-4 p-2"
                            onChange={(e) => setInputboxdata(e.target.value)}
                            value={inputboxdata}
                            type="number"
                            step="0"
                            placeholder="Enter count"
                        />
                    </div>
                )}

                {flagfortime && (
                    <div className="mt-10 flex flex-col items-center">
                        <h3>Select time (HH.MM) for {chooseanswer}</h3>
                        <input
                            required
                            className=" border-none outline-none w-1/2 rounded-md mt-4 p-2"
                            onChange={(e) => setInputboxdata(e.target.value)}
                            value={inputboxdata}
                            type="number"
                            step="0.01"
                            min="00.00"
                            max="12.59"
                            placeholder="in (HH.MM)"
                        />
                    </div>
                )}

                {flagforchoise && (
                    <div className="mt-10 flex flex-col items-center">
                        <h3>Enter the Name of it</h3>
                        <input
                            required
                            className=" border-none outline-none w-1/2 rounded-md mt-4 p-2"
                            onChange={(e) => setInputboxdata(e.target.value)}
                            value={inputboxdata}
                            type="text"
                            placeholder="Enter name"
                        />
                    </div>
                )}

                {optionerror && (
                    <p className=" text-center mt-2 text-red-600">
                        Please select an option
                    </p>
                )}

                <div className=" max-w-screen-md mx-auto mt-10">
                    <div className="m-auto flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="text-white px-8 bg-black py-2 rounded-lg text-xl"
                            disabled={index === 0} // Disable back button on the first question
                        >
                            Back
                        </button>

                        <p className="text-center">
                            {index + 1} out of {data.length}
                        </p>

                        <button
                            type="submit"
                            className="text-white px-8 bg-black py-2 rounded-lg text-xl"
                        >
                            Next ➟
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Survey;
