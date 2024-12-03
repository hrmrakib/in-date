import DateRangePicker from "@/components/DateRangePicker";

const Home = () => {
  return (
    <div className='container mx-auto min-h-screen px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Date Range Picker</h1>
      <div className='flex justify-center'>
        <DateRangePicker />
      </div>
    </div>
  );
};

export default Home;
