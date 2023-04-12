import { Link } from "react-router-dom";

import { DefaultLayout } from "../layout";

function NotFound() {
  return (
    <DefaultLayout title="Page not found" subtitle="UH OH! You're lost...">
      <div className="flex flex-col w-full gap-8 py-4 ">
        <p className="font-sans leading-loose">
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>
        <Link
          to="/"
          className="btn btn-outline text-accent btn-lg w-max hover:btn-accent hover:!text-white"
        >
          Back to Homepage
        </Link>
      </div>
    </DefaultLayout>
  );
}

export default NotFound;
