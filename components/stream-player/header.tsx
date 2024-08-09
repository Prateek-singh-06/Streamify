interface HeaderProps {
  hostName: string;
  hostIdentity: string;
}
export const Header = ({ hostIdentity, hostName }: HeaderProps) => {
  return <div>header</div>;
};
