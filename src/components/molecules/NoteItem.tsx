import styled from 'styled-components';
import type { Note } from '../../api/json-server/types/models';

const Root = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  left: ${(props) => `${props.$x}px`};
  top: ${(props) => `${props.$y}px`};
  width: 240px;
`;

const Article = styled.article<{ $accentColor: string }>`
  display: flex;
  flex-direction: column;
  min-height: 140px;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background: #fff;
  border-left: 4px solid ${(p) => p.$accentColor};
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06);
`;

const Header = styled.header`
  display: flex;
`;

const CreatedAt = styled.time`
  align-self: flex-start;
  font-size: 0.75rem;
  color: #6b7280;
`;

const Body = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0;
  text-align: center;
`;

const Text = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #111827;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
`;

const Author = styled.address`
  align-self: flex-end;
  margin: 0;
  font-style: normal;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
`;

function NoteItem({ id, text, x, y, author, color, createdAt }: Note) {
  return (
    <Root $x={x} $y={y} data-note-id={id} data-x={x} data-y={y}>
      <Article $accentColor={color}>
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
