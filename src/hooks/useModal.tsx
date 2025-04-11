import { useState } from "react";

export function useModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [data, setData] = useState<unknown>(null);

  const handleOpen = (type: string, data?: any) => {
    setOpen(true);
    setModalType(type);
    setData(data || null);
  };

  const handleClose = () => {
    setOpen(false);
    setModalType("");
    setData(null);
  };

  return { open, modalType, data, handleOpen, handleClose };
}
