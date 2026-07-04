export function SearchBox({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form className="search-box" action="/tim-kiem" role="search">
      <label className="sr-only" htmlFor="q">Tìm truyện</label>
      <input
        id="q"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Tìm truyện, tác giả..."
        autoComplete="off"
      />
      <button type="submit">🔍 Tìm kiếm</button>
    </form>
  );
}
