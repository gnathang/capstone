
const App = () => {

  const categories = [
    {
      id: 1,
      title: 'hats',
    }
  ];

  return (
    <div className='categories-container'>
      {categories.map(({title}) => (
        <div className='category-container'>
        <div className='background-image' />
        <div class='category-body-container'>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div> 
      </div>
      ))}
    </div> 
  );
}

export default App;