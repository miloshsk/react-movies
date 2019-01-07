export default class Api {
  url = "https://www.omdbapi.com/?apikey=e99e23f5&s=";
  getMovieList = async movies => {
    const res = await fetch(`${this.url}${movies}`);
    const list = await res.json();
    return await list.Search;
  };
}
