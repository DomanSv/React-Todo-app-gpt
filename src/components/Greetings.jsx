import { Loading } from "../icons";

const Greetings = ({ username, isLoading }) => {
  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;

  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <Loading className='h-8 w-8 animate-spin font-bold text-indigo-600 dark:text-white' />
      </div>
    );
  }

  if (hours < 12) greet = "Добро утро";
  else if (hours >= 12 && hours <= 17) greet = "Добър ден";
  else if (hours >= 17 && hours <= 24) greet = "Добър вечер";

  return (
    <p className='mt-6 text-center text-3xl font-normal text-gray-800 transition-all dark:font-thin dark:text-gray-300'>
      {greet}, {username}!
    </p>
  );
};

export default Greetings;
