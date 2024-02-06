import { Cabin } from '../interfaces/Cabin';
import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
}

export async function createCabin(cabin: Cabin) {
  console.log(cabin);
  if (cabin.image instanceof File) {
    const { path: imagePath, error: imageStorageError } = await uploadImage(
      cabin.image
    );
    cabin = { ...cabin, image: imagePath };
    if (imageStorageError) {
      throw new Error(
        'Cabin could not be created, because the image was not uploaded'
      );
    }
  }

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...cabin }])
    .select()
    .single();
  if (error) {
    throw new Error('Cabin could not be created' + error.message);
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    throw new Error('Cabin could not be deleted');
  }
  return data;
}

export async function updateCabin(cabin: Cabin) {
  console.log('update', cabin);
  if (cabin.image instanceof File) {
    const { path, error } = await uploadImage(cabin.image);
    if (error) {
      throw new Error(
        'Could not update the dabin, becasue the image was not uploaded.'
      );
    }
    cabin = { ...cabin, image: path };
  }
  const { data, error } = await supabase
    .from('cabins')
    .update([{ ...cabin }])
    .eq('id', cabin.id);

  if (error) {
    throw new Error('Cabin could not be updated.');
  }

  return data;
}

async function uploadImage(image: File) {
  const imageName = `${Date.now()}-${image.name}`.replace('/', '');
  const { data, error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, image);

  return {
    path: `${supabaseUrl}/storage/v1/object/public/cabin-images/${data?.path}`,
    error: storageError,
  };
}
