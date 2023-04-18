import { Loading } from "../icons";

const Greetings = ({ username, isLoading }) => {
  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;

  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <Loading className='h-8 w-8 animate-spin font-bold text-white' />
      </div>
    );
  }

  if (hours < 12) greet = "Morning";
  else if (hours >= 12 && hours <= 17) greet = "Afternoon";
  else if (hours >= 17 && hours <= 24) greet = "Evening";

  return (
    <p className='text-center font-serif text-3xl font-thin text-gray-200'>
      Good {greet}, {username}!
    </p>
  );
};

export default Greetings;
