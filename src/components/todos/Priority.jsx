const Priority = ({ priority }) => {
  if (priority === "low") {
    return (
      <span className={"absolute -top-3 left-4 rounded-full bg-blue-600 px-2 py-0.5 text-sm capitalize text-white"} title={priority}>
        Приоритет: Нисък😎🤙
      </span>
    );
  }

  if (priority === "high") {
    return (
      <span
        className={"absolute -top-3 left-4 animate-bounce rounded-full bg-red-600 px-2 py-0.5 text-sm capitalize text-white"}
        title={priority}
      >
        Приоритет: Висок😵‍💫⚠️
      </span>
    );
  }

  return (
    <span className={"absolute -top-3 left-4 rounded-full bg-orange-600 px-2 py-0.5 text-sm capitalize text-white"} title={priority}>
      Приоритет: Среден😑👍
    </span>
  );
};

export default Priority;
