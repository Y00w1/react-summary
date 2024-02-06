import styled from 'styled-components';
import { Cabin } from '../../interfaces/Cabin';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import Row from '../../ui/Row';
import { useCreateEditCabin } from './useCreateEditCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { HiDuplicate } from 'react-icons/hi';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const CabinItem = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: Cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { mutate, isLoading } = useCreateEditCabin(false);

  function duplicateCabinHandler() {
    mutate({
      name: `Copy of ${cabin.name}`,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      image: cabin.image,
      discount: cabin.discount,
      description: cabin.description,
    });
  }
  return (
    <Table.Row>
      <Img src={cabin.image} />
      <CabinItem>{cabin.name}</CabinItem>
      <div>Fits up to {cabin.maxCapacity} guests</div>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      <Discount>{formatCurrency(cabin.discount)}</Discount>
      <Row type="horizontal">
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabin.id?.toString()} />
            <Menus.List id={cabin.id?.toString()}>

              <Menus.Button icon={<HiDuplicate />} onClick={duplicateCabinHandler}><p>Duplicate</p></Menus.Button>

              <Modal.Open opens='edit'>
                <Menus.Button icon={<HiPencil/ >}> <p>Edit</p> </Menus.Button>
              </Modal.Open>
              
              
              <Modal.Open opens='delete'>
                <Menus.Button icon={<HiTrash/ >}> <p>Delete</p> </Menus.Button>
              </Modal.Open>

              </Menus.List>

              <Modal.Window name='edit'>
                <CreateCabinForm editCabinData={cabin}/>
              </Modal.Window>

              <Modal.Window name='delete'>
                <ConfirmDelete
                resourceName='cabins'
                disabled={isDeleting || isLoading}
                onConfirm={()=>deleteCabin(cabin.id)}
                />
              </Modal.Window>
            
          </Menus.Menu>
        </Modal>
      </Row>

    </Table.Row>
  );
}

export default CabinRow;