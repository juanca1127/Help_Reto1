import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Registro from "components/logins/registro";
const ModalRegistro = ({ show, handleClose, tabla }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Registro Isadmin={true} close={handleClose} tabla={tabla} />
     
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="dark">jfgg</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistro;
