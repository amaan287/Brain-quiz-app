"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import DropDownOptions from "@/components/DropDownOptions";
import { Button } from "@/components/ui/button";
import { useQuizConfig } from "@/store/store";

function Page() {
  const addStatus = useQuizConfig((state: any) => state.addStatus);
  const addNumberOfQuestion = useQuizConfig(
    (state: any) => state.addQuestionNumber
  );
  const quizConfig = useQuizConfig((state: any) => state.config);
  const changeStatus = useQuizConfig((state: any) => state.changeStatus);
  const handleStart = () => {
    changeStatus("start");
  };
  console.log("Quiz Config:", quizConfig);

  return (
    <div className="flex flex-col justify-center items-center my-10 h-full w-full gap-3 overflow-visible">
      <div className="w-[50%] items-center justify-center flex flex-col gap-2 border shadow-xl rounded-2xl p-10 dark:shadow-zinc-900">
        <div className="h-full w-full flex flex-col gap-2">
          <Label htmlFor="Number" className="font-bold text-xl">
            Number of Questions
          </Label>
          <Input
            type="Number"
            defaultValue={10}
            min={0}
            max={20}
            id="Number"
            placeholder="Enter a Number"
            onChange={(e) => {
              const value = parseInt(e.target.value ?? "");
              addNumberOfQuestion(value);
            }}
          />
        </div>

        <DropDownOptions />

        <Button onClick={handleStart} className="w-[25%]">
          Start Quiz
        </Button>
      </div>
    </div>
  );
}

export default Page;
