function Button({ title, icon, onClick, active }) {
  return (
    <div
      className="transition duration-150 cursor-pointer px-4 py-2 flex justify-center gap-2 hover:bg-gray-100 active:bg-gray-200 items-center"
      onClick={onClick ? onClick : undefined}
    >
      {icon}
      {title}
    </div>
  );
}

export default Button;
