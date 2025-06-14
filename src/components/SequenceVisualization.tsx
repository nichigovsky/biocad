import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AMINO_ACID_COLORS } from '../types/aminoAcids';

interface SequenceVisualizationProps {
  sequence1: string;
  sequence2: string;
}

export const SequenceVisualization: React.FC<SequenceVisualizationProps> = ({
  sequence1,
  sequence2,
}) => {
  const [open, setOpen] = React.useState(false);
  const [snackText, setSnackText] = React.useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [charWidth, setCharWidth] = useState(20); // Примерная начальная ширина символа
  const [charsPerLine, setCharsPerLine] = useState(20);

  // Функция для расчета количества символов в строке на основе ширины контейнера
  const calculateCharsPerLine = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const padding = 32; // Примерный отступ
      const availableWidth = containerWidth - padding;
      const newCharsPerLine = Math.floor(availableWidth / charWidth);
      setCharsPerLine(Math.max(1, newCharsPerLine));
    }
  };

  // Эффект для пересчета при изменении размера окна
  useEffect(() => {
    calculateCharsPerLine();
    const handleResize = () => {
      calculateCharsPerLine();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [charWidth]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text.replace(/[\r\n]/g, ''));
    setSnackText('Sequence copied');
    setOpen(true);
    setTimeout(() => setOpen(false), 1000);
  };

  // Синхронно разбиваем обе последовательности на пары чанков
  const splitSequences = (seq1: string, seq2: string, chunkSize: number) => {
    const result: { top: string; bottom: string }[] = [];
    const maxLen = Math.max(seq1.length, seq2.length);
    for (let i = 0; i < maxLen; i += chunkSize) {
      result.push({
        top: seq1.slice(i, i + chunkSize),
        bottom: seq2.slice(i, i + chunkSize),
      });
    }
    return result;
  };

  const chunkPairs = splitSequences(sequence1, sequence2, charsPerLine);

  // Рендер одной строки (верхней или нижней)
  const renderSequenceRow = (sequence: string, refSequence: string, isTop: boolean) => (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      sx={{
        fontFamily: 'monospace',
        fontSize: { xs: 16, sm: 20 },
        userSelect: 'text',
        width: '100%',
      }}
      onMouseUp={() => {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
          handleCopy(selection.toString());
        }
      }}
    >
      {sequence.split('').map((char, index) => {
        const backgroundColor = isTop
          ? AMINO_ACID_COLORS[char]
          : char !== refSequence[index]
          ? '#FF6B6B'
          : 'transparent';
        return (
          <Typography
            key={index}
            component="span"
            sx={{
              backgroundColor,
              px: 0.5,
              py: '1px',
              borderRadius: '2px',
              minWidth: 0,
              textAlign: 'center',
              wordBreak: 'break-all',
              display: 'inline-block',
            }}
          >
            {char}
          </Typography>
        );
      })}
    </Box>
  );

  return (
    <Box mt={4} p={2} border={1} borderRadius={2} ref={containerRef}>
      {chunkPairs.map((pair, i) => (
        <Box key={i} display="flex" flexDirection="column" mb={1}>
          {renderSequenceRow(pair.top, pair.bottom, true)}
          {renderSequenceRow(pair.bottom, pair.top, false)}
        </Box>
      ))}
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {snackText}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 