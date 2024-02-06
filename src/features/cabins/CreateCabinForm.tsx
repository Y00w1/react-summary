import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { Cabin } from '../../interfaces/Cabin';
import FormRow from '../../ui/FormRow';
import { useCreateEditCabin } from './useCreateEditCabin';

function CreateCabinForm({
  editCabinData,
  onCloseModal,
}: {
  editCabinData?: Cabin;
  onCloseModal?: () => void;
}) {
  const isEditing = Boolean(editCabinData?.id);

  //getValues: values of the form
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<Cabin>({
      defaultValues: isEditing ? editCabinData : {},
    });

  const { errors, touchedFields } = formState;

  console.log(touchedFields); // If you want to add touched validation
  console.log(getValues());

  //Custom hook
  const { mutate, isLoading } = useCreateEditCabin(isEditing);

  function onSubmit(data: Cabin) {
    console.log(data); //Be careful with the numbers
    mutate(
      {
        ...data,
        image: data.image instanceof FileList ? data.image[0] : data.image,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register('maxCapacity', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label={'Regular price'} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label={'Discount'} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isLoading}
          {...register('discount', {
            required: 'This field is required',
            //Custom validation:
            validate: (value) => {
              return (
                Number(value) <= Number(getValues().regularPrice) ||
                'Discount should be less than the regular price.'
              );
            },
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label={'Description for website'}
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isLoading}
          id="description"
          {...register('description', {
            required: 'This field is required',
          })}
          defaultValue=""
        />
      </FormRow>

      <FormRow label={'Cabin photo'} error={errors?.image?.message}>
        <FileInput
          {...register('image', {
            required: isEditing ? false : 'This field is required',
          })}
          id="image"
          accept="image/*"
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditing ? 'Edit Cabin' : 'Create new Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
