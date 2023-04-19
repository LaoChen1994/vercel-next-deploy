import cx from "classnames";

const Detail = () => (
  <div className={cx('block p-3')}>
    <h1 className={cx(
      'text-base block',
    )}
    >
      Detail
    </h1>
    <button
      type="button"
      className="rounded w-[80px] text-2xl text-black border-2 border-black"
    >
      点击
    </button>
  </div>
)

export default Detail
