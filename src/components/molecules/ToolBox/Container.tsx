import styled from '@emotion/styled';
import { Shadow } from '@/styles';

const Container = styled.div`
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: ${Shadow.menu};
  border-radius: 0.5rem;
  z-index: 1;
`;

export default Container;
