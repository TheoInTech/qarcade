import { Vortex } from "@/components/ui/vortex";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={180}
          className="flex text-white items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full gap-8"
        >
          <h1 className="text-8xl font-bold font-orbitron">qARCade</h1>
          <h2 className="text-xl font-roboto">
            Fun has never been <span className="italic">this</span> Rew
            <span className="font-bold">AR</span>ding!
          </h2>
        </Vortex>
      </main>
    </div>
  );
}
