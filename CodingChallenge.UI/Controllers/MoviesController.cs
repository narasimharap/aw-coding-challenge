using CodingChallenge.DataAccess;
using CodingChallenge.DataAccess.Interfaces;
using System.Linq;
using System.Web.Http;

namespace CodingChallenge.UI.Controllers
{
    [RoutePrefix("api/moviesdb")]
    public class MoviesController : ApiController
    {
        public ILibraryService LibraryService { get; private set; }

        public MoviesController() { }

        public MoviesController(ILibraryService libraryService)
        {
            LibraryService = libraryService;
        }
        [HttpGet]
        [Route("getMovies")]
        public IHttpActionResult getMovies()
        {
            LibraryService = new LibraryService();
            return Ok(LibraryService.SearchMovies("").ToList());
        }

        [HttpGet]
        [Route("searchByTitle/{title}")]
        public IHttpActionResult searchByTitle(string title = "")
        {
            LibraryService = new LibraryService();
            return Ok(LibraryService.SearchMovies(title).ToList());
        }
    }
}