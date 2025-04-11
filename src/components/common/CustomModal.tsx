import { Modal } from "antd";
import { ReactNode } from "react";

interface CustomModalProps {
  children?: ReactNode;
  title?: string;
  open: boolean;
  handleClose: () => void;
  className?: string;
}

export default function CustomModal({
  children,
  title,
  open,
  handleClose,
  className,
}: CustomModalProps) {
  return (
    <Modal
      className={className}
      title={title || ""}
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      {children}
    </Modal>
  );
}
