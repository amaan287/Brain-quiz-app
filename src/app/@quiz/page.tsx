"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuizConfig } from "@/store/store";
import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
type questionT = {
  answers: string[];
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: string;
  type: string;
};

export default function QuizPage() {
  const [questions, setQuestions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const config = useQuizConfig((state: any) => state.config);
  const [answer, setAnswer] = useState("");
  const setScore = useQuizConfig((state: any) => state.setScore);
  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  useEffect(() => {
    let isMounted = true;
    let retryTimeout: NodeJS.Timeout;

    async function getToken() {
      try {
        const response = await fetch(
          "https://opentdb.com/api_token.php?command=request"
        );
        const data = await response.json();
        if (data.response_code === 0 && isMounted) {
          setToken(data.token);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }

    async function getQuestions() {
      if (!token) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}&token=${token}`
        );

        if (response.status === 429) {
          // Rate limited, retry after 5 seconds
          retryTimeout = setTimeout(getQuestions, 5000);
          return;
        }

        const data = await response.json();
        console.log("Full API response:", data);

        if (
          data.response_code === 0 &&
          Array.isArray(data.results) &&
          data.results.length > 0 &&
          isMounted
        ) {
          let shuffledResults = data.results.map((e: questionT) => {
            let value = shuffleArray([
              ...e.incorrect_answers,
              e.correct_answer,
            ]);
            e.answers = value;
            return e;
          });
          setQuestions(shuffledResults);
        } else if (data.response_code === 4) {
          // Token empty, reset token and fetch new questions
          setToken(null);
        } else {
          console.error("Invalid data structure received from API", data);
          setQuestions([]);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (!token) {
      getToken();
    } else {
      getQuestions();
    }

    return () => {
      isMounted = false;
      clearTimeout(retryTimeout);
    };
  }, [
    token,
    config.category,
    config.level,
    config.numberOfQuestion,
    config.type,
  ]);

  const answerCheck = (ans: string) => {
    if (ans === questions[0].correct_answer) {
      setScore();
    }
    setAnswer(questions[0].correct_answer);
  };
  const handleNext = () => {
    let remainingQuestions = [...questions];
    remainingQuestions.shift();
    setQuestions([...remainingQuestions]);
    setAnswer("");
  };
  return (
    <section className="flex flex-col justify-center items-center pt-20 px-20 ">
      <h1 className="mb-4 text-4xl font-bold leading-none tracking-tighter lg:text-6xl ">
        Quiz
      </h1>
      <p className="text-2xl">Score: {config.score}</p>
      {!questions?.length && !loading && (
        <div className="flex flex-col justify-center items-center">
          <Player
            src="https://assets6.lottiefiles.com/packages/lf20_touohxv0.json"
            className="player"
            loop
            autoplay
            style={{ height: "400px", width: "400px" }}
          />
          <h1 className="mt-10 text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            YOUR SCORE :{" "}
            <span className="font-extrabold text-transparent text-10xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {config.score}
            </span>
          </h1>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="bg-white hover:bg-gray-100 my-10 text-gray-800 font-semibold py-2 px-10 border border-gray-400 rounded shadow"
          >
            Start Over
          </button>
        </div>
      )}

      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length > 0 ? (
        <section className="shadow-xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center">
          <h4 className="mb-4 text-3xl font-bold leading-none tracking-tighter lg:text-4xl text-[#5046e6] ">
            Question{" "}
            <span className="text-[#5046e6]">
              #{config.numberOfQuestion - questions.length + 1}
            </span>
            : {questions[0].question}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 w-[90%] mb-10 px-10">
            {questions[0].answers.map((e: string, index: number) => (
              <Button
                key={e}
                onClick={() => answerCheck(e)}
                className={cn(
                  "my-4 col-span-1 text-lg h-10 hover:bg-blue-600 hover:text-gray-100 font-semibold py-4 px-4 shadow-blue-200 rounded-lg shadow-2xl",
                  {
                    "bg-blue-600": !!answer && answer === e,
                    "bg-red-600": !!answer && answer !== e,
                    "hover:bg-blue-600": !!answer && answer === e,
                    "hover:bg-red-600": !!answer && answer !== e,
                    "text-gray-200": !!answer,
                  }
                )}
              >
                {e}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleNext}
            className="w-1/3 bg-blue-900 text-lg font-bold dark:hover:text-gray-800 text-white"
          >
            Next
          </Button>
        </section>
      ) : (
        <p>Return to Home page</p>
      )}
    </section>
  );
}
