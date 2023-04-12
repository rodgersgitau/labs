import { FormEvent, useCallback, useRef, useState } from "react";

import { getRandomUser } from "../helpers";
import { DefaultLayout } from "../layout";

export default function IndexPage() {
  const formRef = useRef(null);
  const [formInput, setFormInput] = useState<string>("");

  const generateUser = useCallback(() => {
    if (formRef.current) {
      try {
        getRandomUser().then((val) => setFormInput(val));
      } catch (error) {
        console.error(error as string);
      }
    }
  }, [formRef.current]);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formInput) {
      console.log(formInput);
    }
    return false;
  };

  return (
    <DefaultLayout>
      <div className="flex items-center w-full h-max">
        <form
          ref={formRef}
          onSubmit={submitHandler}
          className="flex flex-col items-center justify-center w-full gap-10"
        >
          <div className="flex flex-col items-center justify-between w-full gap-8 lg:flex-row">
            <input
              required
              name="name"
              type="text"
              maxLength={25}
              value={formInput}
              placeholder="Enter Name"
              onChange={(e) => {
                setFormInput(e.currentTarget.value);
              }}
              className="w-full bg-transparent rounded lg:flex-1 form-input input-lg input-bordered"
            />
            <button
              type="button"
              title="random name"
              onClick={generateUser}
              className="w-full space-x-4 !bg-orange-500/60 !hover:bg-orange-500/100 lg:w-max btn btn-lg border-0 btn-group-horizontal"
            >
              <img className="w-8 h-8" src="/images/dices.png" alt="dices" />
              <span className="font-light capitalize font-cursive">Random</span>
            </button>
          </div>
          <button
            id="btn-submit"
            type="submit"
            className="w-full !h-20 space-x-4 btn btn-lg btn-secondary btn-group-horizontal font-cursive"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>

            <span>Play Game</span>
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
}
