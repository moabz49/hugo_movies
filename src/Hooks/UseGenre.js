// selectedGenres is an []Array.
const useGenre = (selectedGenres) => { 
    if (selectedGenres.length < 1) return null;
    // only if there Is selectedGenres then map through the ids [12], [23], [34] on User Click etc..
   // add the Ids that have been clicked to new Array 
    const GenreIds = selectedGenres.map((g) => g.id);
    return GenreIds.reduce((acc, curr) => acc + "," + curr);
  }; // GenreIds.reduce will return [12], [34], [23] etc... 
  
  export default useGenre;