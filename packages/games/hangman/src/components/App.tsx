import { ReactNode, useMemo, useState } from "react";

import { Modal } from "./Modal";

type CurrentDialogType = null | ReactNode;

export const App = () => {
  const dialogs = useMemo(() => {
    return [
      { name: "Quick Play", component: SampleContent1 },
      { name: "Private Game", component: SampleContent2 },
      { name: "Single Player", component: SampleContent3 },
    ];
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const [currentDialog, setCurrentDialog] = useState<CurrentDialogType>(null);

  const container =
    "w-full lg:max-w-lg xl:max-w-xl mx-auto h-full shadow-lg shadow-current rounded-md px-8";
  const bgStyles =
    "bg-[url('/images/backdrop.png')] bg-no-repeat bg-cover bg-center";

  return (
    <section className="relative w-full h-screen p-4 bg-neutral-200 text-primary">
      <div className={`${bgStyles} ${container} flex items-center`}>
        <div className="flex flex-col items-center justify-center w-full h-full gap-24">
          <h1 className="font-serif text-6xl uppercase lg:text-8xl text-secondary">
            Hangman
          </h1>
          <div className="flex flex-col w-full max-w-md gap-8">
            {dialogs.map(({ name, component }, idx) => {
              return (
                <button
                  onClick={() => {
                    void setCurrentDialog(component);
                    void setOpenModal(true);
                  }}
                  key={`btn-dialog-${Math.random() * idx}`}
                  className="w-full btn btn-lg btn-outline btn-secondary text-2xl uppercase font-serif font-[400]"
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {typeof currentDialog !== null && (
        <Modal
          isOpen={openModal}
          children={currentDialog}
          setIsOpen={setOpenModal}
        />
      )}
    </section>
  );
};

const SampleContent1 = () => {
  return (
    <div className="flex flex-col w-full gap-10 h-max">
      <strong className="font-sans text-xl font-bold capitalize">
        Heading 1
      </strong>
      <p className="font-serif text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, nulla.
        Repellendus totam ipsam quia inventore aliquam sunt quam culpa
        voluptatem cum! Facere sunt quod omnis officiis nobis odio distinctio
        voluptatum? Ad, dicta neque unde autem aspernatur nemo totam quidem quo
        facere! Quo facilis inventore sit consectetur, aspernatur architecto
        animi ratione quam distinctio incidunt placeat quis quasi, ab
        consequatur tempore harum! Voluptates repudiandae ducimus, eos nesciunt
        incidunt illum nisi? Harum molestias quae, tempora nulla voluptatibus
        libero officia similique expedita.
      </p>
    </div>
  );
};

const SampleContent2 = () => {
  return (
    <div className="flex flex-col w-full gap-10 h-max">
      <strong className="font-sans text-xl font-bold capitalize">
        Heading 2
      </strong>
      <p className="font-serif text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, nulla.
        Repellendus totam ipsam quia inventore aliquam sunt quam culpa
        voluptatem cum! Facere sunt quod omnis officiis nobis odio distinctio
        voluptatum? Ad, dicta neque unde autem aspernatur nemo totam quidem quo
        facere! Quo facilis inventore sit consectetur, aspernatur architecto
        animi ratione quam distinctio incidunt placeat quis quasi, ab
        consequatur tempore harum! Voluptates repudiandae ducimus, eos nesciunt
        incidunt illum nisi? Harum molestias quae, tempora nulla voluptatibus
        libero officia similique expedita.
      </p>
    </div>
  );
};

const SampleContent3 = () => {
  return (
    <div className="flex flex-col w-full gap-10 h-max">
      <strong className="font-sans text-xl font-bold capitalize">
        Heading 3
      </strong>
      <p className="font-serif text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, nulla.
        Repellendus totam ipsam quia inventore aliquam sunt quam culpa
        voluptatem cum! Facere sunt quod omnis officiis nobis odio distinctio
        voluptatum? Ad, dicta neque unde autem aspernatur nemo totam quidem quo
        facere! Quo facilis inventore sit consectetur, aspernatur architecto
        animi ratione quam distinctio incidunt placeat quis quasi, ab
        consequatur tempore harum! Voluptates repudiandae ducimus, eos nesciunt
        incidunt illum nisi? Harum molestias quae, tempora nulla voluptatibus
        libero officia similique expedita.
      </p>
    </div>
  );
};
