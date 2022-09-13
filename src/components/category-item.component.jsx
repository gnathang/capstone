import './category-item.styles.scss'

const CategoryItem = ({ category }) => {
  // deconstruct from {catgory}. We need the imageUrl and the title.
  const { imageUrl, title } = category;
  return (
    <div className='category-container'>
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className='category-body-container'>
      <h2>{title}</h2>
      <p>Shop Now</p> 
    </div>  
  </div>
  ); 

}

export default CategoryItem