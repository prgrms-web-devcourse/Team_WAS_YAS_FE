import styled from '@emotion/styled';
import { Shadow } from '@/styles';

const Container = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: white;
  opacity: 0.6;
  box-shadow: ${Shadow.menu};
  border-radius: 0.5rem;
`;

export default Container;
