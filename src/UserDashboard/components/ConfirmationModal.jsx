import React from 'react'
import { Modal, Button } from '@mantine/core';

function ConfirmationModal({ opened, onClose, onConfirm, title, message }) {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <p>{message}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px'}}>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button color="red" onClick={onConfirm}>Confirm</Button>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
