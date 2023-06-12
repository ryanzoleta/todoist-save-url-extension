type Props = {
  text: string;
  isDisabled?: boolean;
  isPrimary?: boolean;
  eventHandler?: () => void | undefined;
};

function Button({ text, eventHandler, isDisabled, isPrimary }: Props) {
  if (isDisabled) {
    return (
      <button
        className="∆hover:bg-red-700 w-full rounded-full bg-red-300 p-3 text-sm font-bold text-red-50"
        disabled
      >
        {text}
      </button>
    );
  }

  if (isPrimary) {
    return (
      <button
        className="w-full rounded-full bg-red-500 p-3 text-sm font-bold text-red-50 hover:bg-red-700"
        onClick={eventHandler}
      >
        {text}
      </button>
    );
  }
  return (
    <button
      className="w-full rounded-full bg-gray-200 p-3 text-sm font-bold text-gray-800 hover:bg-gray-300"
      onClick={eventHandler}
    >
      {text}
    </button>
  );
}

export default Button;
