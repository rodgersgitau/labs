import { Dispatch, FC, ReactNode, SetStateAction, useMemo } from "react";

export interface ModalProps {
  title?: string;
  isOpen?: boolean;
  children?: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Modal: FC<ModalProps> = ({
  children,
  setIsOpen,
  isOpen = false,
  title = "modal-title",
}) => {
  const styles = useMemo(() => {
    return {
      dialog: `relative z-50 ${isOpen ? "block" : "hidden"}`,
      overlay:
        "fixed inset-0 z-50 transition-opacity bg-primary/90 dark:bg-secondary/90",
      content: "fixed w-full z-50 left-0 bottom-[50%] translate-y-[50%]",
      container:
        "max-h-[45vmax] h-max overflow-y-auto m-auto max-w-xs sm:max-w-lg xl:max-w-xl",
      wrapper:
        "relative p-8 rounded shadow shadow-current border-[0.95px] border-neutral-800 shadow bg-primary/75 dark:bg-secondary/75 text-white",
      btnClose:
        "absolute top-4 right-4 btn btn-sm btn-circle btn-secondary text-current animate-pulse",
    };
  }, [isOpen]);

  return (
    <div
      role="dialog"
      title={title}
      aria-modal="true"
      aria-labelledby={title}
      className={styles.dialog}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={`${styles.container} ${styles.wrapper}`}>
          <button className={styles.btnClose} onClick={() => setIsOpen(false)}>
            X
          </button>
          <div className="flex flex-col gap-10 text-sm font-serif border-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
