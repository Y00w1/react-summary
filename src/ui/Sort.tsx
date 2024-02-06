import { useSearchParams } from 'react-router-dom';
import Select from './Select';
import React from 'react';

function Sort({
  options,
}: {
  options: Array<{ value: string; label: string }>;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || '';

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }
  return <Select value={sortBy} options={options} onChange={handleChange} />;
}

export default Sort;