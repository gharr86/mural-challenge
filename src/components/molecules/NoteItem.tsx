import styled from 'styled-components';
import type { Note } from '../../api/json-server/types/models';
import { resolveNoteColor } from '../../theme';

const Root = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  left: ${(props) => `${props.$x}px`};
  top: ${(props) => `${props.$y}px`};
  width: 240px;
`;

const Article = styled.article<{ $backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  min-height: 140px;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(17, 24, 39, 0.12);
  background: ${(p) => p.$backgroundColor};
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06);
`;

const Header = styled.header`
  display: flex;
`;

const CreatedAt = styled.time`
  align-self: flex-start;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Body = styled.section`
  flex: 1;
  padding: 0.75rem 0;
`;

const Text = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
`;

const Author = styled.address`
  align-self: flex-end;
  margin: 0;
  font-style: normal;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

function NoteItem({ id, text, x, y, author, color, createdAt }: Note) {
  const backgroundColor = resolveNoteColor(color);

  return (
    <Root $x={x} $y={y} data-note-id={id} data-x={x} data-y={y}>
      <Article $backgroundColor={backgroundColor}>
        <Header>
          <CreatedAt dateTime={createdAt}>{createdAt}</CreatedAt>
        </Header>
        <Body>
          <Text>{text}</Text>
        </Body>
        <Footer>
          <Author>{author}</Author>
        </Footer>
      </Article>
    </Root>
  );
}

export default NoteItem;
