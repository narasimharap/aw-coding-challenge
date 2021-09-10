using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using CodingChallenge.DataAccess.Interfaces;
using CodingChallenge.DataAccess.Models;
using CodingChallenge.Utilities;

namespace CodingChallenge.DataAccess
{
    public class LibraryService : ILibraryService
    {
        public LibraryService() { }

        private IEnumerable<Movie> GetMovies()
        {
            return _movies ?? (_movies = ConfigurationManager.AppSettings["LibraryPath"].FromFileInExecutingDirectory().DeserializeFromXml<Library>().Movies);
        }
        private IEnumerable<Movie> _movies { get; set; }

        public int SearchMoviesCount(string title)
        {
            return SearchMovies(title).Count();
        }

        public IEnumerable<Movie> SearchMovies(string title, int? skip = null, int? take = null, string sortColumn = null, SortDirection sortDirection = SortDirection.Ascending)
        {
            var movies = GetMovies().Where(s => s.Title.Contains(title));
            if (sortColumn == "ID")
            {
                if (sortDirection == SortDirection.Descending)
                    movies = movies.OrderByDescending(m => m.ID);
                else
                    movies = movies.OrderBy(m => m.ID);
            }

            if (sortColumn == "Year")
            {
                if (sortDirection == SortDirection.Descending)
                    movies = movies.OrderByDescending(m => m.Year);
                else
                    movies = movies.OrderBy(m => m.Year);
            }


            if (sortColumn == "Rating")
            {
                if (sortDirection == SortDirection.Descending)
                    movies = movies.OrderByDescending(m => m.Rating);
                else
                    movies = movies.OrderBy(m => m.Rating);
            }

            if (sortColumn == "Title")
            {
                if (sortDirection == SortDirection.Descending)
                    movies = movies.OrderByDescending(m => ReplaceArticle(m.Title));
                else
                    movies = movies.OrderBy(m => ReplaceArticle(m.Title));
            }


            if (skip.HasValue && take.HasValue)
            {
                movies = movies.Skip(skip.Value).Take(take.Value);
            }
            return movies.Distinct(new TitleComparer()).ToList();
        }
        private string ReplaceArticle(string input)
        {
            string[] noise = new string[] { "the", "an", "a" };

            foreach (string n in noise)
            {
                if (input.ToLower().StartsWith(n))
                {
                    return input.Substring(n.Length).Trim();
                }
            }

            return input;
        }
    }
}
