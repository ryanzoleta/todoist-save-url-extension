type Props = {
  text: string;
  isDisabled?: boolean;
  eventHandler?: () => void | undefined;
};

function Button({ text, eventHandler, isDisabled }: Props) {
  if (isDisabled) {
    return (
      <button className="rounded-full bg-red-300 w-full p-3 ∆hover:bg-red-700 text-red-50" disabled>
        {text}
      </button>
    );
  }
  return (
    <button
      className="rounded-full bg-red-500 w-full p-3 hover:bg-red-700 text-red-50"
      onClick={eventHandler}
    >
      {text}
    </button>
  );
}

export default Button;
