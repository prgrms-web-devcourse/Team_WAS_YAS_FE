import styled from '@emotion/styled';
import { Colors, Media, FontSize } from '@/styles';
import React, { useEffect, useRef, useState } from 'react';
import { SpreadToggle } from '../SpreadToggle';

export interface RoutinePostContentProps extends React.ComponentProps<'div'> {
  content?: string;
}

const RoutinePostContent = ({
  content = '',
  ...props
}: RoutinePostContentProps): JSX.Element => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [spreadable, setSpreadable] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const scrollHeight = ref.current?.scrollHeight;

  useEffect(() => {
    if (!scrollHeight) return;
    setSpreadable(scrollHeight > 29);
  }, [setSpreadable, ref, scrollHeight]);

  const handleClickSpreadToggle = () => {
    setOpened((opened) => !opened);
  };

  return (
    <Container {...props}>
      <TextArea
        opened={opened}
        height={scrollHeight}
        ref={ref}
        readOnly
        value={content}
      >
        {content}
      </TextArea>
      {spreadable && (
        <SpreadToggleWrapper>
          <SpreadToggle onClick={handleClickSpreadToggle} />
        </SpreadToggleWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem 0.5rem 1.5rem;
  border-radius: 0.5rem;
  background-color: ${Colors.backgroundButton}; ;
`;

const TextArea = styled.textarea<
  React.ComponentProps<'textarea'> & {
    opened: boolean;
    height: number | undefined;
  }
>`
  width: 100%;
  height: ${({ opened, height }) => (opened ? `${height}px` : '1.8rem')};
  overflow-y: hidden;
  text-overflow: ellipsis;
  background-color: transparent;
  resize: none;
  border: none;
  outline: none;
  color: ${Colors.textPrimary};

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    font-size: ${FontSize.base};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.base};
  }
`;

const SpreadToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default RoutinePostContent;
