import { useCallback, useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  return { isOpen: open, setIsOpen: () => setOpen(true) };
};
