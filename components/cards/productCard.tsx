interface ProductCardProps {
  imageUrl: string;
  label?: string;
  title: string;
  ratingCount: number;
  price: number;
}
export default function ProductCard({
  imageUrl,
  price,
  ratingCount,
  title,
  label,
}: ProductCardProps) {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
      <div className="product__item">
        <div
          className="product__item__pic set-bg"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          {label && <span className="label">{label}</span>}
          <ul className="product__hover">
            <li>
              <a href="#">
                <img src="/img/icon/heart.png" alt="" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="img/icon/compare.png" alt="" /> <span>Compare</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="img/icon/search.png" alt="" />
              </a>
            </li>
          </ul>
        </div>
        <div className="product__item__text">
          <h6>{title}</h6>
          <a href="#" className="add-cart">
            + Add To Cart
          </a>
          <div className="rating">
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star-o" />
          </div>
          <h5>${price}</h5>
          <div className="product__color__select">
            <label htmlFor="pc-1">
              <input type="radio" id="pc-1" />
            </label>
            <label className="active black" htmlFor="pc-2">
              <input type="radio" id="pc-2" />
            </label>
            <label className="grey" htmlFor="pc-3">
              <input type="radio" id="pc-3" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
