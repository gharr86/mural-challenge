import styled, { css, keyframes } from 'styled-components';
import type { Note } from '../../api/json-server/types/models';
import { resolveNoteColor } from '../../theme';
import formatNoteDate from '../../utils/dateUtils';
import useDomId from '../../utils/hooks/useDomId';

type NoteItemProps = Note & { isGridMode: boolean; isHighlighted: boolean };

const Root = styled.div<{ $x: number; $y: number; $isGridMode: boolean }>`
  position: ${(props) => (props.$isGridMode ? 'static' : 'absolute')};
  left: ${(props) => (props.$isGridMode ? 'auto' : `${props.$x}px`)};
  top: ${(props) => (props.$isGridMode ? 'auto' : `${props.$y}px`)};
  width: 240px;
`;

const pulseBorderWidth = keyframes`
  0% { border-width: 1px; }
  50% { border-width: 4px; }
  100% { border-width: 1px; }
`;

const Article = styled.article<{ $backgroundColor: string; $isHighlighted: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 140px;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(17, 24, 39, 0.12);
  background: ${(p) => p.$backgroundColor};
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06);
  ${(p) =>
    p.$isHighlighted &&
    css`
      animation: ${pulseBorderWidth} 1.2s ease-in-out infinite;
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`;

const Header = styled.header`
  display: flex;
`;

const CreatedAt = styled.time`
  align-self: flex-start;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Body = styled.div`
  flex: 1;
  padding: 0.75rem 0;
`;

const NoteHeading = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 400;
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

function NoteItem({
  id,
  text,
  x,
  y,
  author,
  color,
  createdAt,
  isGridMode,
  isHighlighted,
}: NoteItemProps) {
  const backgroundColor = resolveNoteColor(color);
  const formattedCreatedAt = formatNoteDate(createdAt);
  const articleId = useDomId('note');
  const headingId = useDomId('note-heading');
  const timeId = useDomId('note-time');
  const authorId = useDomId('note-author');

  return (
    <Root $x={x} $y={y} $isGridMode={isGridMode} data-note-id={id} data-x={x} data-y={y}>
      <Article
        id={articleId}
        tabIndex={0}
        $backgroundColor={backgroundColor}
        $isHighlighted={isHighlighted}
        aria-labelledby={headingId}
        aria-describedby={`${timeId} ${authorId}`}
      >
        <Header>
          <CreatedAt id={timeId} dateTime={createdAt}>
            {formattedCreatedAt}
          </CreatedAt>
        </Header>
        <Body>
          <NoteHeading id={headingId}>{text}</NoteHeading>
        </Body>
        <Footer>
          <Author id={authorId}>{author}</Author>
        </Footer>
      </Article>
    </Root>
  );
}

export default NoteItem;
