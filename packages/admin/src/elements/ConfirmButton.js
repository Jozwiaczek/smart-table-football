import React, { useState } from 'react';
import { Confirm, Button } from 'react-admin';

const ConfirmButton = ({
  disabled,
  className,
  variant = 'contained',
  children,
  title,
  content,
  onClose,
  onConfirm,
  color = 'primary',
  confirmText = 'confirm',
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    setOpen(false);
    onConfirm && onConfirm();
  };

  return (
    <>
      <Button
        className={className}
        disabled={disabled}
        label={children}
        variant={variant}
        color={color}
        onClick={handleButtonClick}
      />
      <Confirm
        isOpen={open}
        title={title}
        content={content}
        confirm={confirmText}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ConfirmButton;
