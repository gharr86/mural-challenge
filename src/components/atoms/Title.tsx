import styled from 'styled-components';

const Title = styled.h1`
  margin: 0 0 1rem;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export default Title;
