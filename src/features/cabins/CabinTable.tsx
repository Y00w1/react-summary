import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import { Cabin } from '../../interfaces/Cabin';
import Menus from '../../ui/Menus';

function CabinTable() {
  const { cabins, isLoading } = useCabins();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Table columns={'0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'}>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>DisCount</div>
        <div></div>
      </Table.Header>
      <Menus>      
      <Table.Body
        data={cabins as Array<Cabin>}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
      </Menus>
    </Table>
  );
}

export default CabinTable;
