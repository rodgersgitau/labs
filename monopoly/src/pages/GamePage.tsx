import { Board } from "../components";
import { DefaultLayout } from "../layout";

function GamePage() {
  return (
    <DefaultLayout layout="full">
      <div className="relative flex flex-col xl:grid w-full h-max xl:min-h-[82.5vh] xl:grid-cols-3 gap-4 p-4 ">
        <div className="flex-1 w-full h-[45vh] xl:h-full xl:col-span-1 shadow-slick bg-secondary text-accent/75"></div>
        <div className="!relative flex-1 w-full h-[45vh] xl:h-full xl:col-span-2 text-primary shadow-slick">
          <Board />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default GamePage;
