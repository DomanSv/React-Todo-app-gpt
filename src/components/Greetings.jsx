const Greetings = ( {username}) => {
  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;

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
