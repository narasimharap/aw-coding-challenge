using System;
using System.Collections.Generic;

namespace CodingChallenge.DataAccess.Models
{
    public class TitleComparer : IEqualityComparer<Movie>
    {
        public bool Equals(Movie movie1, Movie movie2)
        {
            if (ReferenceEquals(movie1, movie2)) return true;

            if (ReferenceEquals(movie1, null) || ReferenceEquals(movie2, null))
                return false;

            return movie1.Title == movie2.Title;
        }
        public int GetHashCode(Movie product)
        {
            if (Object.ReferenceEquals(product, null)) return 0;
            var titleName = product.Title == null ? 0 : product.Title.GetHashCode();
            var titleCode = product.Title.GetHashCode();
            return titleName ^ titleCode;
        }
    }
}
