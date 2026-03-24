import { useId, type KeyboardEvent } from 'react';
import styled from 'styled-components';
import SelectInput from '../molecules/SelectInput';

export const FILTERS_BAR_HEIGHT_PX = 60;

export type FiltersProps = {
  authors: string[];
  colors: string[];
  authorValue: string;
  colorValue: string;
  onAuthorChange: (value: string) => void;
  onColorChange: (value: string) => void;
  controlledRegionId: string;
  resultsCount: number;
};

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  align-items: flex-end;
  min-height: ${FILTERS_BAR_HEIGHT_PX}px;
  padding: 0.75rem 1rem;
  margin: 0;
  background: #ffffff;
  border-bottom: 1px solid rgba(17, 24, 39, 0.08);
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

function Filters({
  authors,
  colors,
  authorValue,
  colorValue,
  onAuthorChange,
  onColorChange,
  controlledRegionId,
  resultsCount,
}: FiltersProps) {
  const authorFieldId = useId();
  const colorFieldId = useId();
  const hintId = useId();
  const resultId = useId();

  const handleEscapeReset =
    (onChange: (value: string) => void) => (event: KeyboardEvent<HTMLSelectElement>) => {
      if (event.key !== 'Escape') return;
      onChange('');
    };

  return (
    <Bar role="region" aria-label="Filter notes">
      <VisuallyHidden id={hintId}>
        Choose author and color to filter notes. Press Escape on a filter to clear it.
      </VisuallyHidden>
      <VisuallyHidden id={resultId} aria-live="polite">
        Showing {resultsCount} notes.
      </VisuallyHidden>

      <SelectInput
        id={authorFieldId}
        label="Author"
        value={authorValue}
        options={authors.map((author) => ({ value: author, label: author }))}
        allLabel="All authors"
        onChange={onAuthorChange}
        onKeyDown={handleEscapeReset(onAuthorChange)}
        ariaDescribedBy={`${hintId} ${resultId}`}
        ariaControls={controlledRegionId}
      />

      <SelectInput
        id={colorFieldId}
        label="Color"
        value={colorValue}
        options={colors.map((color) => ({ value: color, label: color }))}
        allLabel="All colors"
        onChange={onColorChange}
        onKeyDown={handleEscapeReset(onColorChange)}
        ariaDescribedBy={`${hintId} ${resultId}`}
        ariaControls={controlledRegionId}
      />
    </Bar>
  );
}

export default Filters;
