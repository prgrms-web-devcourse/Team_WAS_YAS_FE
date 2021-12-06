import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';
import { IconProps } from './Icon';

const List = ({ color, size, ...props }: IconProps): JSX.Element => {
  return (
    <StyledSvg
      size={size}
      viewBox="0 0 38 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.88359 0.551141C8.53059 0.198246 8.05188 0 7.55273 0C7.05359 0 6.57488 0.198246 6.22188 0.551141L3.78793 2.98508L3.23639 2.43354C2.88136 2.09065 2.40586 1.90091 1.91231 1.9052C1.41875 1.90949 0.946617 2.10746 0.597605 2.45647C0.248593 2.80548 0.0506226 3.27761 0.0463337 3.77117C0.0420448 4.26473 0.23178 4.74023 0.574674 5.09526L2.45707 6.97766C2.81008 7.33055 3.28879 7.5288 3.78793 7.5288C4.28708 7.5288 4.76579 7.33055 5.11879 6.97766L8.88359 3.21285C9.23648 2.85985 9.43473 2.38114 9.43473 1.882C9.43473 1.38285 9.23648 0.904143 8.88359 0.551141ZM35.7944 26.34H15.0823L14.8621 26.3532C14.3857 26.4099 13.9489 26.6463 13.6409 27.0142C13.333 27.3822 13.1771 27.8538 13.2053 28.3327C13.2334 28.8117 13.4433 29.2619 13.7922 29.5912C14.1411 29.9206 14.6025 30.1043 15.0823 30.1048H35.7944L36.0146 30.0935C36.4945 30.0409 36.9357 29.8059 37.2473 29.4371C37.5588 29.0683 37.7167 28.594 37.6884 28.1121C37.6602 27.6302 37.4478 27.1776 37.0953 26.8478C36.7428 26.518 36.2771 26.3362 35.7944 26.34V26.34ZM35.7944 15.0588H15.0823L14.8621 15.072C14.3857 15.1286 13.9489 15.3651 13.6409 15.733C13.333 16.1009 13.1771 16.5726 13.2053 17.0515C13.2334 17.5305 13.4433 17.9806 13.7922 18.31C14.1411 18.6394 14.6025 18.8231 15.0823 18.8236H35.7944L36.0146 18.8104C36.4911 18.7538 36.9279 18.5173 37.2358 18.1494C37.5437 17.7815 37.6996 17.3098 37.6715 16.8309C37.6433 16.3519 37.4334 15.9018 37.0845 15.5724C36.7356 15.243 36.2742 15.0593 35.7944 15.0588V15.0588ZM35.7944 3.7644H15.0823L14.8621 3.77758C14.3857 3.83424 13.9489 4.07069 13.6409 4.43861C13.333 4.80653 13.1771 5.27816 13.2053 5.75712C13.2334 6.23608 13.4433 6.68623 13.7922 7.01559C14.1411 7.34495 14.6025 7.52867 15.0823 7.5292H35.7944L36.0146 7.51602C36.4911 7.45936 36.9279 7.22291 37.2358 6.85498C37.5437 6.48706 37.6996 6.01544 37.6715 5.53648C37.6433 5.05752 37.4334 4.60737 37.0845 4.27801C36.7356 3.94865 36.2742 3.76493 35.7944 3.7644V3.7644ZM8.88359 25.0223C8.53059 24.6694 8.05188 24.4712 7.55273 24.4712C7.05359 24.4712 6.57488 24.6694 6.22188 25.0223L3.78793 27.4563L3.23639 26.9047C2.88136 26.5618 2.40586 26.3721 1.91231 26.3764C1.41875 26.3807 0.946617 26.5787 0.597605 26.9277C0.248593 27.2767 0.0506226 27.7488 0.0463337 28.2424C0.0420448 28.7359 0.23178 29.2114 0.574674 29.5665L2.45707 31.4489C2.81008 31.8018 3.28879 32 3.78793 32C4.28708 32 4.76579 31.8018 5.11879 31.4489L8.88359 27.6841C9.23648 27.3311 9.43473 26.8523 9.43473 26.3532C9.43473 25.8541 9.23648 25.3753 8.88359 25.0223ZM6.22188 12.7867C6.5769 12.4438 7.0524 12.2541 7.54596 12.2584C8.03952 12.2627 8.51165 12.4607 8.86066 12.8097C9.20967 13.1587 9.40764 13.6308 9.41193 14.1244C9.41622 14.6179 9.22648 15.0934 8.88359 15.4485L5.11879 19.2133C4.76579 19.5662 4.28708 19.7644 3.78793 19.7644C3.28879 19.7644 2.81008 19.5662 2.45707 19.2133L0.574674 17.3309C0.394886 17.1572 0.251481 16.9495 0.152826 16.7198C0.0541714 16.4902 0.00224302 16.2432 7.10732e-05 15.9932C-0.00210087 15.7433 0.0455271 15.4954 0.140176 15.2641C0.234825 15.0327 0.374599 14.8226 0.551342 14.6458C0.728086 14.4691 0.938259 14.3293 1.1696 14.2346C1.40094 14.14 1.64881 14.0924 1.89876 14.0945C2.1487 14.0967 2.39571 14.1486 2.62537 14.2473C2.85503 14.3459 3.06274 14.4894 3.23639 14.6691L3.78793 15.2207L6.22188 12.7867Z"
        fill={color}
      />
    </StyledSvg>
  );
};

List.defaultProps = {
  color: Colors.textPrimary,
};

const StyledSvg = styled.svg<IconProps>`
  ${({ size }) => {
    if (size) {
      return `
        width: ${size}px;
        height: auto;
      `;
    } else {
      return `
        height: auto;
        @media ${Media.sm} {
          width: 32px;
        }
        @media ${Media.md} {
          width: 40px;
        }
        @media ${Media.lg} {
          width: 40px;
        }
      `;
    }
  }}
`;

export default List;