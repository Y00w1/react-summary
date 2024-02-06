import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();

  const { isLoading: isEditing, mutate: updateSetting } = useUpdateSetting();

  if (isLoading) {
    return <Spinner />;
  }

  const {
    minBookingLength,
    maxBookignLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  function updateHandler(
    e: React.FocusEvent<HTMLInputElement>,
    setting: string
  ) {
    if (!e.target.value) return;
    updateSetting({
      [setting]: e.target.value,
    });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isLoading || isEditing}
          onBlur={(e) => updateHandler(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isLoading || isEditing}
          defaultValue={maxBookignLength}
          onBlur={(e) => updateHandler(e, 'maxBookignLength')}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isLoading || isEditing}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => updateHandler(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isLoading || isEditing}
          defaultValue={breakfastPrice}
          onBlur={(e) => updateHandler(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
