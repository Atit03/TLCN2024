import { useDispatch, useSelector } from "react-redux";
import { addToCart, quantityCount } from "../../redux/reducers/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <>
      <h2 className="company uppercase text-orange font-bold text-sm sm:text-md tracking-wider pb-3 sm:pb-5">
        {product.company}
      </h2>
      <h3
        //  ref={productTitleRef}
        className="product capitalize text-very-dark-blue font-bold text-3xl sm:text-4xl sm:leading-none pb-3"
      >
        {product.title}
        {/* fall limited edition <span className="block lg:mt-1">sneakers</span> */}
      </h3>
      <p className="text-dark-grayish-blue pb-6 lg:py-7 lg:leading-6">
        {product.desc}
        {/* These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they'll withstand everything the
        weather can offer. */}
      </p>
      <div className="amount font-bold flex items-center justify-between lg:flex-col lg:items-start mb-6">
        <div className="discount-price items-center flex  lg:w-1/3 justify-between">
          <div
            // ref={productPriceRef}
            className="price text-3xl"
          >
            ${product.discountPrice}
          </div>
          <div className="discount text-orange bg-pale-orange w-max px-2 rounded mx-5 h-6 lg:mr-0">
            {Math.floor(
              (product.price / product.price -
                product.discountPrice / product.price) *
                100
            )}
            %{/* 50% */}
          </div>
        </div>
        <div className="original-price text-grayish-blue line-through lg:mt-2">
          ${product.price}
        </div>
      </div>
      <div className="sm:flex lg:mt-8 w-full">
        <div className="quantity-container w-full bg-light-grayish-blue rounded-lg h-14 mb-4 flex items-center justify-between px-6 lg:px-3 font-bold sm:mr-3 lg:mr-5 lg:w-1/3">
          <button
            onClick={() => dispatch(quantityCount("decrease"))}
            className="text-orange text-2xl leading-none font-bold mb-1 lg:mb-2 lg:text-3xl hover:opacity-60"
          >
            -
          </button>
          <input
            // ref={productQuantityRef}
            min={0}
            max={100}
            onChange={(e) => dispatch(quantityCount(e.target.value))}
            className="quantity focus:outline-none text-dark-blue bg-light-grayish-blue font-bold flex text-center w-full"
            type="number"
            name="quantity"
            value={quantity}
            aria-label="quantity of products"
          />
          <button
            onClick={() => dispatch(quantityCount("increase"))}
            className="text-orange text-2xl leading-none font-bold mb-1 lg:mb-2 lg:text-3xl hover:opacity-60"
          >
            +
          </button>
        </div>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="cart w-full h-14 bg-orange rounded-lg lg:rounded-xl mb-2 shadow-orange-shadow shadow-2xl text-white flex items-center justify-center lg:w-3/5 hover:opacity-60"
        >
          <i className="cursor-pointer text-white text-xl leading-0 pr-3">
            <ion-icon name="cart-outline"></ion-icon>
          </i>
          Add to cart
        </button>
      </div>
    </>
  );
};

export default ProductDetails;
