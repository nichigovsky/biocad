import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { VALID_AMINO_ACIDS } from '../types/aminoAcids';
import type { SequenceFormData } from '../types/aminoAcids';
import { SequenceVisualization } from './SequenceVisualization';

export const SequenceForm: React.FC = () => {
  const [sequences, setSequences] = useState<SequenceFormData | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SequenceFormData>();

  const sequence1 = watch('sequence1');
  const sequence2 = watch('sequence2');

  const validateSequence = (value: string) => {
    if (!value) return 'Sequence is required';
    if (!value.split('').every((char) => VALID_AMINO_ACIDS.includes(char))) {
      return 'Sequence can only contain valid amino acid letters (A-Z) and -';
    }
    return true;
  };

  const validateLength = (value: string) => {
    const otherSequence = value === sequence1 ? sequence2 : sequence1;
    if (otherSequence && value.length !== otherSequence.length) {
      return 'Sequences must have the same length';
    }
    return true;
  };

  const onSubmit = (data: SequenceFormData) => {
    setSequences(data);
  };

  return (
    <Box maxWidth={800} mx="auto" p={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            label="First Sequence"
            variant="outlined"
            fullWidth
            error={!!errors.sequence1}
            helperText={errors.sequence1?.message}
            {...register('sequence1', {
              validate: {
                validSequence: validateSequence,
                validLength: validateLength,
              },
            })}
            placeholder="Enter first sequence (e.g., VLSPADKTNIKASWEKIGSHG)"
            inputProps={{ style: { fontFamily: 'monospace' } }}
          />
          <TextField
            label="Second Sequence"
            variant="outlined"
            fullWidth
            error={!!errors.sequence2}
            helperText={errors.sequence2?.message}
            {...register('sequence2', {
              validate: {
                validSequence: validateSequence,
                validLength: validateLength,
              },
            })}
            placeholder="Enter second sequence (e.g., VLSPADKTNIKASWEKIGSHG)"
            inputProps={{ style: { fontFamily: 'monospace' } }}
          />
          <Button type="submit" variant="contained" color="primary">
            Visualize Sequences
          </Button>
        </Stack>
      </form>
      {sequences && (
        <SequenceVisualization
          sequence1={sequences.sequence1}
          sequence2={sequences.sequence2}
        />
      )}
    </Box>
  );
}; 