import type { KeyboardEventHandler } from 'react';
import styled from 'styled-components';

type SelectInputOption = {
  value: string;
  label: string;
};

type SelectInputProps = {
  id: string;
  dataTestId: string;
  label: string;
  value: string;
  options: SelectInputOption[];
  allLabel: string;
  onChange: (value: string) => void;
  onKeyDown: KeyboardEventHandler<HTMLSelectElement>;
  ariaDescribedBy: string;
  ariaControls: string;
};

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 10rem;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Select = styled.select`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid rgba(17, 24, 39, 0.15);
  background: #fff;
  min-width: 12rem;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`;

function SelectInput({
  id,
  dataTestId,
  label,
  value,
  options,
  allLabel,
  onChange,
  onKeyDown,
  ariaDescribedBy,
  ariaControls,
}: SelectInputProps) {
  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>
      <Select
        id={id}
        data-testid={dataTestId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        aria-describedby={ariaDescribedBy}
        aria-controls={ariaControls}
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Field>
  );
}

export default SelectInput;
