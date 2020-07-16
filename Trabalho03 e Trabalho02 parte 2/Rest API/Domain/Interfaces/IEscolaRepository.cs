using System.Collections.Generic;
using RestApiEscola.Domain.Models;
namespace RestApiEscola.Domain.Interfaces
{
    public interface IEscolaRepository
    {
         
        List<Professor> ListAll();
        Professor GetById(int id);
        void Add(Professor professor);
        void Update(Professor professor);
        void DeleteById(int id);
    }
}