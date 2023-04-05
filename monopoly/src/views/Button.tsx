export interface ButtonProps {
  icon: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({}) => {
  const styles = React.useMemo(() => {
    return {
      wrapper: "btn btn-xl rounded",
    };
  }, []);

  return (
    <button className="w-24 h-24 rounded">
      <img src={icon} className="object-cover w-full h-auto" />
    </button>
  );
};
