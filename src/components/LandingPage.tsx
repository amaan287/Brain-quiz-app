import { Button } from "@/components/ui/button";
import BoxReveal from "@/components/magicui/box-reveal";
import Link from "next/link";

export async function LandingPage() {
  return (
    <div className="h-full w-full max-w-[32rem] items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className="text-[3.5rem] font-semibold">
          Welcome To Brain Quiz...<span className="text-[#5046e6]">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem]">
          Unlock your <span className="text-[#5046e6]">Potential</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="mt-[1.5rem]">
          <p>
            -&gt; 20+ cateogories of quiz to play with
            <span className="font-semibold text-[#5046e6]"> Entertainment</span>
            ,<span className="font-semibold text-[#5046e6]"> Science</span>,
            <span className="font-semibold text-[#5046e6]"> History</span>, and
            <span className="font-semibold text-[#5046e6]"> Astronomy</span>
            . <br />
            -&gt; Unique learning experience. <br />
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <Link href={"/HomePage"}>
          <Button className="mt-[1.6rem] bg-[#5046e6] dark:hover:text-black text-white">
            Start Quiz
          </Button>
        </Link>
      </BoxReveal>
    </div>
  );
}
