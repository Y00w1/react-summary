import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const [optionalBreakfast, setOptionalBreakfast] = useState<boolean>(false);

  const {booking, isLoading} = useBooking();

  const {settings, isLoading: isLoadingSettings} = useSettings();

  const moveBack = useMoveBack();

  useEffect(()=> {
    setConfirmPaid(booking?.isPaid);
  }, [booking]);

  const {checkin, isCheckinIn} = useCheckin();

  if(isLoading || isLoadingSettings)  return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if(!confirmPaid) return;
    checkin(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

    {!hasBreakfast && (
      <Box>
      <Checkbox 
        id={bookingId} 
        onChange={()=>{
          setOptionalBreakfast(prev=> !prev)
          setConfirmPaid(false)}}
        disabled={confirmPaid}
        >
        Do you want to add breakfast service {guests.fullName}?
      </Checkbox>
    </Box>
    )}

      <Box>
        <Checkbox id={bookingId} checked={confirmPaid} onChange={()=>setConfirmPaid(true)} disabled={confirmPaid || isCheckinIn}>
          I confirm that {guests.fullName} has already paid the total amount
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckinIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
