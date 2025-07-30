import React, { useState } from 'react';
import Image from 'next/image';
import Modal from 'react-bootstrap/Modal';
import TableGallery from './tableGallery';
import CloseIcon from '../../public/dist/img/closeDashletPopup.svg'
const TableModal = () => {
  const [show, setShow] = useState(false);

  const closeBtnHandle = () => {
    setShow(false)
  }

  return (
    <>

      <a href="#" className="font-22 weight-500"
        data-toggle="modal"
        data-target="#exampleModalCenter"
        variant="primary" onClick={() => setShow(true)}>Choose Dashlet
      </a>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="rounded"
        aria-labelledby="example-custom-modal-styling-title"
        size='lg'
      >
        <Modal.Body>
          <div className='text-right px-4'>
          <Image
                src={CloseIcon}
                alt="Close-icon"
                width={30}
                height={30}
                onClick={closeBtnHandle}
                style={{cursor:'pointer'}}
              />
          </div>
          <TableGallery />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TableModal;