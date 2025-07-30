import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import GraphGallery from './graphsGallery';

const GraphModal = () => {
  const [show, setShow] = useState(false);

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
          <GraphGallery />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GraphModal;