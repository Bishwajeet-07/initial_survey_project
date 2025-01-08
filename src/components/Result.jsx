import { useSelector } from "react-redux";

const Result = () => {
    // Safely access survey data from Redux store
    const surveyData = useSelector((state) => state.survey.answers);
    console.log(surveyData)

    // Check if surveyData exists and has keys
    const hasResults = surveyData && Object.keys(surveyData).length > 0;

    return (
        <div>
            <h1 className="text-center text-3xl font-bold mt-10">Result</h1>
            
            {!hasResults ? (
                <p className="text-center text-xl text-red-600 mt-6">
                    No results to display. Please complete the survey first.
                </p>
            ) : (
                <ul className="max-w-screen-md mx-auto">
                    {Object.values(surveyData).map((item, index) => (
                        <li
                            className="mt-4 bg-slate-100 p-2"
                            key={index}
                        >
                            <p>{"Q.- " + item.question}</p>
                            <p>{"A.- " + item.answer}</p>
                            {item.inputbox && <p>{"I.- " + item.inputbox}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Result;
