const Priority = ({ priority }) => {

  if (priority === "low") {
    return (
        <span className={'absolute -top-3 left-4 rounded-full bg-blue-600 px-2 py-0.5 text-sm capitalize text-white'} title={priority}>
          Priority: {priority}😎🤙
        </span>
      );
  }

  if (priority === "high") {
    return (
        <span className={'absolute -top-3 left-4 rounded-full bg-red-600 px-2 py-0.5 text-sm capitalize text-white animate-bounce'} title={priority}>
          Priority: {priority}😵‍💫⚠️
        </span>
      );
  }

    return (
        <span className={'absolute -top-3 left-4 rounded-full bg-orange-600 px-2 py-0.5 text-sm capitalize text-white'} title={priority}>
          Priority: {priority}😑👍
        </span>
      );
};

export default Priority;
