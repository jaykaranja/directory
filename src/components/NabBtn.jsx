function NavBtn({ title, onClick }) {
  return (
    <button
      className="text-gray-700 cursor-pointer text-bold hover:text-blue-800 transition duration-150"
      onClick={onClick ? onClick : undefined}
    >
      {title}
    </button>
  );
}

export default NavBtn;
