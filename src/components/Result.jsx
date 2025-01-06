
import { useSelector } from "react-redux";

const Result = () => {

    const surveyData = useSelector((state) => state.survey);
    console.log(surveyData);

    
    return (
        <div>          
            <h1 className=" text-center text-3xl font-bold mt-10">Result</h1>

            <li className=" max-w-screen-md mx-auto">
                {surveyData.map((item,index) => (
                    <div className=" mt-4 bg-slate-100 p-2" key={index}>
                        <p>{"Q.- " + item.question}</p>
                        <p>{"A.- " + item.answer}</p>
                    </div>
                ))}
            </li>
        </div>
    );
};

export default Result;

