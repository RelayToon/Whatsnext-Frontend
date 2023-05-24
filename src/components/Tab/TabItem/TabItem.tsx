import { cls } from "@/utils/tailwindCss";

interface TabItemProps {
  id: string | number;
  title: string;
  isActive?: boolean;
  hasUnderline?: boolean;
  onChange: (id: string | number) => void;
}

const TabItem = ({
  id,
  title,
  isActive,
  hasUnderline,
  onChange,
}: TabItemProps) => {
  return (
    <button
      key={id}
      type="button"
      className={cls(
        "font-bold ml-5 text-lg",
        hasUnderline ? "pb-2 border-gray" : "",
        isActive ? "text-white" : "text-gray",
        hasUnderline && isActive ? " border-b-4" : "border-0"
      )}
      onClick={() => {
        onChange(id);
      }}
    >
      {title}
    </button>
  );
};

export default TabItem;
